# InVisitor — Revised Backend Architecture (Laravel Base Service & Node.js Core Service)

## Architecture Overview

```
                          ┌──────────────────────────────┐
   React Frontend  ──▶    │       API Gateway             │  (Node.js / Fastify)
                          │  JWT Validation               │
                          │  Tenant Resolution            │
                          │  Rate Limiting (Redis)        │
                          │  Reverse Proxy                │
                          └──────────────┬───────────────┘
                                         │
         ┌───────────────────────────────┼──────────────────────────┐
         ▼                               ▼                          
┌─────────────────────────┐   ┌──────────────────────┐  
│   BASE SERVICE           │   │  CORE SERVICE        │  
│   (Laravel / PHP 8.3)   │   │  (Node.js)           │  
│                         │   │                      │  
│  • Auth (login/reg/OTP) │   │  • Visitor CRUD      │  
│  • Tenants              │   │  • Check-in/out      │  
│  • Schema Provisioning  │   │  • QR Codes          │  
│  • Plans                │   │  • Visit Logs        │  
│  • Subscriptions        │   │  • Residents         │  
│  • Transactions         │   │  • Security Officers │  
│  • Access Levels        │   │  • Front Desk        │  
└─────────────────────────┘   │  • Gate Access Logs  │  
         │                    │  • NDA Forms         │  
         │                    └──────────────────────┘  
         │                               │              
         └───────────────────────────────┴───────────────┐
                                         │               │
                              ┌──────────▼──────────┐    │
                              │    RabbitMQ Broker   │◀──┘
                              │  (topic exchange)    │
                              └──────────┬──────────┘
                                         │
                       ┌─────────────────┴──────────────────┐
                       ▼                                    ▼
             ┌──────────────────┐                ┌──────────────────┐
             │ NOTIFICATION SVC │                │  AUDIT SERVICE   │
             │  (Node.js Worker)│                │  (Node.js Worker)│
             │  Email / SMS     │                │  Immutable Logs  │
             └──────────────────┘                └──────────────────┘
```

---

## Service Breakdown (Revised)

### 1. Base Service (Laravel PHP 8.3) — Port 8000
The monolithic "platform core" service. Owns all infrastructure-level concerns.

**Modules:**
- **Auth** — Registration, Login, JWT + Refresh Tokens, Forgot Password (OTP via Redis), Password Reset
- **Tenants** — Tenant CRUD, schema provisioning (`CREATE SCHEMA tenant_{uuid}` + run migrations), subdomain resolution
- **Plans** — Plan definitions, feature flags per plan
- **Subscriptions** — Tenant ↔ Plan linking, status management (active/grace/expired), Paystack/Flutterwave webhooks
- **Transactions** — Payment records, invoice generation (PDF via DomPDF/Spatie)
- **Access Levels** — Configurable access zone definitions per tenant

**Key Laravel Packages:**
- `tymon/jwt-auth` — JWT access + refresh tokens
- `spatie/laravel-multitenancy` — Tenant awareness middleware (sets `search_path`)
- `spatie/laravel-permission` — Role & permission management
- `spatie/laravel-medialibrary` — File uploads (e.g., visitor photos)
- `barryvdh/laravel-dompdf` — Invoice PDF generation
- `vladimir-yuldashev/laravel-queue-rabbitmq` — RabbitMQ publisher

**API Prefix:** `/api/v1/base/`

---

### 2. API Gateway (Node.js / Fastify) — Port 3000
Single entry point for all frontend/mobile requests.

- Validates JWT (shared secret with Base Service)
- Extracts `tenantId` + `role` from JWT claims
- Resolves tenant subdomain → `tenantId` via Redis cache (populated by Base Service on login)
- Injects `X-Tenant-ID` and `X-Correlation-ID` headers into upstream requests
- Rate limits per `tenantId` using Redis sliding window
- Health check aggregation endpoint

---

### 3. Core Service (Node.js / Express + TypeScript) — Port 3001
Domain service for both Host and Estate Manager business types. Groups all visitor and estate logic.

- Visitor CRUD (all queries scoped to tenant schema via `search_path`)
- Pre-registration + QR code generation (using `qrcode` npm package)
- Check-in / Check-out with timestamps
- Host notification trigger (publishes event to RabbitMQ)
- Visit analytics endpoint
- Export visit logs as CSV
- Resident CRUD (linked to `public.users`)
- Security Officer management
- Front Desk staff management
- Gate access log recording
- Resident visitor invitations
- Security & Resident reports

---

### 4. Notification Service (Node.js Worker) — No HTTP port
Pure RabbitMQ consumer. Does not expose HTTP.

**Consumes:**
| Event | Action |
|---|---|
| `user.registered` | Send branded welcome email |
| `user.password_reset_requested` | Send 6-digit OTP email |
| `visitor.pre_registered` | Send QR code to guest email |
| `visitor.checked_in` | Push/email host notification |
| `subscription.activated` | Send onboarding email |
| `subscription.expiring_soon` | Send renewal reminder |
| `payment.succeeded` | Send payment receipt PDF |
| `payment.failed` | Send payment failure alert |

**Email provider:** Nodemailer + Mailgun (with Termii fallback for SMS in NG)

---

### 5. Audit Service (Node.js Worker) — No HTTP port
Pure RabbitMQ consumer. Binds to `#` (all events).
Writes structured log entries to `public.audit_log`.

---

## Multi-Tenancy Strategy

### schema-per-tenant in PostgreSQL

```
public schema                          tenant_{uuid} schema
─────────────────────────────────────  ─────────────────────────────────────
users             (cross-tenant auth)  visitors
tenants           (registry)           visit_logs
plans             (global catalog)     residents
subscriptions     (billing)            security_officers
transactions      (payment records)    front_desk_staff
access_levels     (tenant-defined)     notifications
audit_log         (platform-wide)
```

### Laravel Tenant Middleware (Base Service)
```php
// app/Http/Middleware/InitializeTenancy.php
class InitializeTenancy {
    public function handle(Request $request, Closure $next) {
        $tenantId = auth()->user()?->tenant_id
                 ?? $request->header('X-Tenant-ID');

        if ($tenantId) {
            $tenant = Tenant::find($tenantId);
            DB::statement("SET search_path TO {$tenant->schema_name}, public");
            app()->instance('currentTenant', $tenant);
        }

        return $next($request);
    }
}
```

### Node.js Tenant Middleware (Core Service)
```typescript
// packages/tenant-db/src/middleware.ts
export const tenantScope = async (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  if (!tenantId) return res.status(401).json({ error: 'Tenant context missing' });

  const schemaName = await getTenantSchema(tenantId); // Redis cache → Base Service
  req.db = await getConnection(schemaName);           // sets search_path
  next();
};
```

---

## Database Schema

### Public Schema (Managed by Base Service Laravel Migrations)

```sql
-- Tenants
CREATE TABLE public.tenants (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schema_name   TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  subdomain     TEXT UNIQUE NOT NULL,
  business_type TEXT NOT NULL CHECK (business_type IN ('public', 'private', 'estate')),
  status        TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','suspended','deleted')),
  plan_id       UUID REFERENCES public.plans(id),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Users (Cross-tenant identity store)
CREATE TABLE public.users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  email         TEXT UNIQUE NOT NULL,
  password      TEXT NOT NULL,
  role          TEXT NOT NULL,
  first_name    TEXT,
  last_name     TEXT,
  phone         TEXT,
  is_verified   BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Plans
CREATE TABLE public.plans (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  type          TEXT NOT NULL CHECK (type IN ('public_private', 'estate')),
  price_monthly NUMERIC(10,2) NOT NULL,
  price_annually NUMERIC(10,2) NOT NULL,
  features      JSONB NOT NULL DEFAULT '{}',
  visitor_limit INT,
  user_limit    INT,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE public.subscriptions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  plan_id         UUID REFERENCES public.plans(id),
  status          TEXT NOT NULL DEFAULT 'active'
                    CHECK (status IN ('active','grace_period','expired','cancelled')),
  billing_cycle   TEXT NOT NULL CHECK (billing_cycle IN ('monthly', 'annually')),
  amount_paid     NUMERIC(10,2),
  started_at      TIMESTAMPTZ NOT NULL,
  expires_at      TIMESTAMPTZ NOT NULL,
  grace_ends_at   TIMESTAMPTZ,
  cancelled_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions
CREATE TABLE public.transactions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID REFERENCES public.tenants(id),
  subscription_id UUID REFERENCES public.subscriptions(id),
  amount          NUMERIC(10,2) NOT NULL,
  currency        TEXT DEFAULT 'NGN',
  gateway         TEXT NOT NULL CHECK (gateway IN ('paystack', 'flutterwave', 'stripe')),
  gateway_ref     TEXT UNIQUE NOT NULL,
  status          TEXT NOT NULL CHECK (status IN ('pending','success','failed','refunded')),
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Access Levels (tenant-owned but stored in public for cross-service access)
CREATE TABLE public.access_levels (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  zones           JSONB NOT NULL DEFAULT '[]',
  time_restriction JSONB DEFAULT NULL,
  is_default      BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Log
CREATE TABLE public.audit_log (
  id          BIGSERIAL PRIMARY KEY,
  tenant_id   UUID,
  user_id     UUID,
  action      TEXT NOT NULL,
  resource    TEXT,
  resource_id TEXT,
  payload     JSONB DEFAULT '{}',
  ip_address  INET,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### Tenant Schema (Run per-tenant via dynamic migrations)

```sql
-- Visitors
CREATE TABLE visitors (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name       TEXT NOT NULL,
  email           TEXT,
  phone           TEXT,
  photo_url       TEXT,
  company         TEXT,
  pre_registered  BOOLEAN DEFAULT FALSE,
  qr_code         TEXT UNIQUE,
  qr_expires_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Visit Logs
CREATE TABLE visit_logs (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id        UUID REFERENCES visitors(id),
  host_user_id      UUID NOT NULL,
  access_level_id   UUID,
  purpose           TEXT,
  note              TEXT,
  checked_in_at     TIMESTAMPTZ,
  checked_out_at    TIMESTAMPTZ,
  created_by        UUID NOT NULL
);

-- Residents (Estate type only)
CREATE TABLE residents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL,
  unit_number     TEXT NOT NULL,
  block           TEXT,
  estate_zone     TEXT,
  status          TEXT DEFAULT 'active' CHECK (status IN ('active','inactive')),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Security Officers
CREATE TABLE security_officers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL,
  badge_number    TEXT UNIQUE,
  gate_assignment TEXT,
  shift           TEXT,
  status          TEXT DEFAULT 'active',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications (in-app)
CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL,
  title       TEXT NOT NULL,
  body        TEXT,
  type        TEXT,
  data        JSONB DEFAULT '{}',
  read        BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Monorepo Directory Structure

```
invisitor-backend/
├── package.json                    ← npm workspaces root
├── tsconfig.base.json
├── docker-compose.yml              ← local dev stack
├── .env.example
├── .gitignore
│
├── services/
│   ├── api-gateway/                ← Node.js (Fastify)
│   │   ├── src/
│   │   │   ├── app.ts
│   │   │   ├── config/
│   │   │   ├── middleware/         ← JWT, tenant, rate-limit, correlation-id
│   │   │   └── routes/             ← proxy route definitions
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── core-service/               ← Node.js (Express + TypeScript)
│   │   ├── src/
│   │   │   ├── app.ts
│   │   │   ├── routes/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── middleware/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── notification-service/       ← Node.js (Worker, no HTTP)
│   │   ├── src/
│   │   │   ├── worker.ts           ← RabbitMQ consumer entry point
│   │   │   ├── consumers/          ← one file per event type
│   │   │   ├── templates/          ← Handlebars email templates
│   │   │   └── services/           ← mailer, sms
│   │   └── package.json
│   │
│   └── audit-service/              ← Node.js (Worker, no HTTP)
│       ├── src/
│       │   ├── worker.ts           
│       │   └── consumers/          
│       └── package.json
│
├── packages/
│   ├── event-contracts/            ← TypeScript event type definitions
│   │   └── src/index.ts
│   ├── tenant-db/                  ← DB connection factory
│   │   └── src/index.ts
│   └── logger/                     ← Pino structured logger
│       └── src/index.ts
│
├── base-service/                   ← Laravel PHP 8.3
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Auth/
│   │   │   │   │   ├── AuthController.php
│   │   │   │   │   └── PasswordResetController.php
│   │   │   │   ├── TenantController.php
│   │   │   │   ├── PlanController.php
│   │   │   │   ├── SubscriptionController.php
│   │   │   │   ├── TransactionController.php
│   │   │   │   └── AccessLevelController.php
│   │   │   ├── Middleware/
│   │   │   │   └── InitializeTenancy.php
│   │   │   └── Requests/
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Tenant.php
│   │   │   ├── Plan.php
│   │   │   ├── Subscription.php
│   │   │   ├── Transaction.php
│   │   │   └── AccessLevel.php
│   │   ├── Services/
│   │   │   ├── TenantProvisioningService.php
│   │   │   ├── OtpService.php
│   │   │   └── PaymentGatewayService.php
│   │   └── Events/
│   │       └── (domain events for RabbitMQ)
│   ├── database/
│   │   └── migrations/             ← Public schema migrations
│   └── routes/
│       └── api.php
│
└── db/
    └── migrations/tenant/          ← Per-tenant schema migrations (Knex)
        ├── 001_create_visitors.js
        ├── 002_create_visit_logs.js
        ├── 003_create_residents.js
        ├── 004_create_security_officers.js
        └── 005_create_notifications.js
```

---

## Event Contracts (Shared TypeScript Definitions)

```typescript
// packages/event-contracts/src/index.ts

export interface BaseEvent {
  eventId: string;        // UUID
  tenantId: string;
  timestamp: string;      // ISO 8601
  version: '1.0';
}

export interface UserRegisteredEvent extends BaseEvent {
  type: 'user.registered';
  payload: { userId: string; email: string; role: string; tenantName: string; };
}

export interface PasswordResetRequestedEvent extends BaseEvent {
  type: 'user.password_reset_requested';
  payload: { userId: string; email: string; otp: string; expiresAt: string; };
}

export interface TenantProvisionedEvent extends BaseEvent {
  type: 'tenant.provisioned';
  payload: { tenantId: string; schemaName: string; businessType: string; };
}

export interface VisitorCheckedInEvent extends BaseEvent {
  type: 'visitor.checked_in';
  payload: { visitorId: string; visitorName: string; hostUserId: string; hostEmail: string; checkedInAt: string; };
}

export interface VisitorPreRegisteredEvent extends BaseEvent {
  type: 'visitor.pre_registered';
  payload: { visitorId: string; visitorEmail: string; visitorName: string; qrCode: string; hostName: string; scheduledAt: string; };
}

export interface SubscriptionActivatedEvent extends BaseEvent {
  type: 'subscription.activated';
  payload: { subscriptionId: string; planName: string; expiresAt: string; };
}

export interface PaymentSucceededEvent extends BaseEvent {
  type: 'payment.succeeded';
  payload: { transactionId: string; amount: number; currency: string; gateway: string; invoiceUrl: string; };
}

export interface PaymentFailedEvent extends BaseEvent {
  type: 'payment.failed';
  payload: { transactionId: string; reason: string; gateway: string; };
}

export type InVisitorEvent =
  | UserRegisteredEvent
  | PasswordResetRequestedEvent
  | TenantProvisionedEvent
  | VisitorCheckedInEvent
  | VisitorPreRegisteredEvent
  | SubscriptionActivatedEvent
  | PaymentSucceededEvent
  | PaymentFailedEvent;
```

---

## RabbitMQ Topology

```
Exchange: invisitor.events (type: topic, durable: true)

Routing Key → Queue Binding:
  user.*                  → notification.queue
  visitor.*               → notification.queue
  subscription.*          → notification.queue
  payment.*               → notification.queue
  tenant.provisioned      → notification.queue
  #                       → audit.queue          (all events)

Dead Letter Exchange: invisitor.dlx
  DLQ Queues: notification.queue.dlq, audit.queue.dlq
  Retry Policy: 3 attempts, 5s → 30s → 120s exponential backoff
```

---

## Docker Compose (Local Dev)

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: invisitor
      POSTGRES_USER: invisitor
      POSTGRES_PASSWORD: secret
    ports: ["5432:5432"]
    volumes: [postgres_data:/var/lib/postgresql/data]

  rabbitmq:
    image: rabbitmq:3.13-management-alpine
    ports: ["5672:5672", "15672:15672"]
    environment:
      RABBITMQ_DEFAULT_USER: invisitor
      RABBITMQ_DEFAULT_PASS: secret

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
    command: redis-server --appendonly yes

  base-service:
    build: ./base-service
    ports: ["8000:8000"]
    env_file: ./base-service/.env
    depends_on: [postgres, rabbitmq, redis]

  api-gateway:
    build: ./services/api-gateway
    ports: ["3000:3000"]
    env_file: ./services/api-gateway/.env
    depends_on: [base-service, redis]

  core-service:
    build: ./services/core-service
    ports: ["3001:3001"]
    env_file: ./services/core-service/.env
    depends_on: [postgres, rabbitmq]

  notification-service:
    build: ./services/notification-service
    env_file: ./services/notification-service/.env
    depends_on: [rabbitmq]

  audit-service:
    build: ./services/audit-service
    env_file: ./services/audit-service/.env
    depends_on: [rabbitmq, postgres]

volumes:
  postgres_data:
```

---

## Phased Rollout (Revised)

### Phase 1 — Foundation (Weeks 1–3)
- [ ] Monorepo scaffold + Docker Compose
- [ ] Base Service (Laravel): Auth endpoints, JWT, Tenant CRUD, schema provisioning
- [ ] Public schema migrations via Laravel Migrations
- [ ] Shared packages: `logger`, `event-contracts`, `tenant-db`

### Phase 2 — Core Domain (Weeks 4–7)
- [ ] API Gateway: JWT validation, tenant resolution, proxy routes, rate limiting
- [ ] Core Service: Visitor CRUD, QR code gen, check-in/out, RabbitMQ publisher
- [ ] Notification Service: RabbitMQ consumer, OTP + visitor arrival emails

### Phase 3 — Estate + Billing (Weeks 8–12)
- [ ] Core Service: Residents, Security Officers, gate access logs
- [ ] Base Service: Plans, Subscriptions, Transactions, Paystack/Flutterwave webhooks
- [ ] Audit Service: consume all events → `public.audit_log`

### Phase 4 — Hardening (Weeks 13–16)
- [ ] Kubernetes manifests (HPA, resource limits, health checks)
- [ ] CI/CD GitHub Actions pipelines per service
- [ ] OpenTelemetry tracing (Jaeger)
- [ ] Load testing (k6)
