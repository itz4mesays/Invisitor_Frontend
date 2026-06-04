import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Star, Zap, Shield, ArrowRight } from 'lucide-react';

const privatePlans = [
  {
    name: 'Starter Plan',
    monthlyPrice: 25000,
    tagline: 'Perfect for small shops & offices',
    visitors: '500/mo',
    hosts: '10',
    history: '30 days',
    notif: 'Email + SMS',
    badge: 'Basic',
    reporting: 'Standard',
    support: 'Priority Email',
    security: 'Basic Whitelist',
    calendar: 'Basic',
    color: 'var(--accent-primary)',
  },
  {
    name: 'Professional Plan',
    monthlyPrice: 75000,
    tagline: 'For scaling businesses',
    visitors: '5,000/mo',
    hosts: '100',
    history: '90 days',
    notif: 'Push + Email + SMS',
    badge: 'Advanced',
    reporting: 'Detailed',
    support: '24/7 Phone/Email',
    security: 'Geo + Blacklist',
    calendar: 'Advanced Sync',
    color: '#8b5cf6'
  },
  {
    name: 'Enterprise Plan',
    monthlyPrice: 150000,
    tagline: 'Large-scale operations',
    visitors: 'Unlimited',
    hosts: 'Unlimited',
    history: 'Unlimited',
    notif: 'Custom',
    badge: 'Advanced',
    reporting: 'Custom Analytics',
    support: 'Dedicated Manager',
    security: 'Advanced SOC2',
    calendar: 'Multi-Team',
    color: 'var(--bg-brand)'
  }
];

const estatePlans = [
  {
    name: 'Estate Basic',
    monthlyPrice: 50000,
    tagline: 'Small gated communities',
    residents: 'Up to 100',
    visitors: '1,000/mo',
    security: '5 Officers',
    invoicing: 'Automated',
    notifications: 'SMS + Email',
    calendar: 'Basic',
    reporting: 'Standard',
    support: 'Email',
    accessControl: 'Gate Log',
    color: '#10b981',
  },
  {
    name: 'Estate Pro',
    monthlyPrice: 120000,
    tagline: 'Mid-size residential estates',
    residents: 'Up to 500',
    visitors: '10,000/mo',
    security: '20 Officers',
    invoicing: 'Automated',
    notifications: 'SMS + Email',
    calendar: 'Full Sync',
    reporting: 'Advanced Analytics',
    support: '24/7 Phone/Email',
    accessControl: 'QR + Badge',
    color: 'var(--accent-primary)',
  },
  {
    name: 'Estate Enterprise',
    monthlyPrice: 250000,
    tagline: 'Massive residential complexes',
    residents: 'Unlimited',
    visitors: 'Unlimited',
    security: 'Unlimited Officers',
    invoicing: 'Advanced + API',
    notifications: 'Custom',
    calendar: 'Multi-Team',
    reporting: 'Custom Analytics',
    support: 'Dedicated Manager',
    accessControl: 'Advanced Biometrics',
    color: 'var(--bg-brand)',
  }
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};

const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEstateManager = location.pathname.includes('/manager');
  const basePath = isEstateManager ? '/manager' : '/host';
  const plans = isEstateManager ? estatePlans : privatePlans;

  // Mocking the current active plan based on the role
  const currentPlanName = isEstateManager ? 'Estate Pro' : 'Starter Plan';

  const handleChoosePlan = (plan) => {
    // Navigate to checkout passing the plan details in state
    navigate(`${basePath}/checkout`, { state: { plan } });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Manage Your Subscription
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Upgrade or downgrade your plan to fit your {isEstateManager ? 'estate management' : 'business'} needs. Your current plan is highlighted below.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {plans.map((plan) => {
          const isCurrent = plan.name === currentPlanName;

          return (
            <div 
              key={plan.name} 
              style={{
                background: isCurrent ? 'var(--bg-subtle)' : 'var(--bg-surface)',
                border: `2px solid ${isCurrent ? plan.color : 'var(--border-default)'}`,
                borderRadius: '24px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                boxShadow: isCurrent ? '0 12px 40px rgba(0, 0, 0, 0.08)' : '0 4px 12px rgba(0, 0, 0, 0.02)',
                transform: isCurrent ? 'translateY(-8px)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              {isCurrent && (
                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: plan.color, color: 'white', padding: '0.25rem 1rem', borderRadius: '20px', fontSize: '0.875rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <Star size={14} fill="currentColor" /> Active Plan
                </div>
              )}

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{plan.name}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '1.5rem', height: '40px' }}>{plan.tagline}</p>

              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>{formatCurrency(plan.monthlyPrice).replace('.00', '')}</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>/mo</span>
              </div>

              <div style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {Object.entries(plan).map(([key, value]) => {
                    if (['name', 'monthlyPrice', 'tagline', 'color', 'popular'].includes(key)) return null;
                    return (
                      <li key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.9375rem', color: 'var(--text-primary)' }}>
                        <CheckCircle2 size={18} style={{ color: plan.color, flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{key}: <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>{value}</span></span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <button 
                  disabled={isCurrent}
                  onClick={() => handleChoosePlan(plan)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: 'none',
                    background: isCurrent ? 'var(--border-default)' : plan.color,
                    color: isCurrent ? 'var(--text-tertiary)' : (plan.color === 'var(--bg-brand)' ? 'var(--bg-surface)' : 'white'),
                    fontSize: '1rem',
                    fontWeight: 800,
                    cursor: isCurrent ? 'default' : 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s',
                    opacity: isCurrent ? 0.6 : 1
                  }}
                  onMouseOver={(e) => { if (!isCurrent) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseOut={(e) => { if (!isCurrent) e.currentTarget.style.transform = 'none'; }}
                >
                  {isCurrent ? 'Current Plan' : 'Choose Plan'} {!isCurrent && <ArrowRight size={18} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionManagement;
