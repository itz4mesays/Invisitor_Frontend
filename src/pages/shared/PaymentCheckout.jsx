import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle2, ChevronLeft, ShieldCheck, ArrowRight } from 'lucide-react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};

const PaymentCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  const isEstateManager = location.pathname.includes('/manager');
  const basePath = isEstateManager ? '/manager' : '/host';

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Fallback if accessed directly without state
  if (!plan) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2>No plan selected.</h2>
        <button onClick={() => navigate(`${basePath}/subscription`)} style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', borderRadius: '8px', background: 'var(--accent-primary)', color: 'white', border: 'none', cursor: 'pointer' }}>
          Back to Subscriptions
        </button>
      </div>
    );
  }

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsProcessing(false);
      navigate(`${basePath}/payment-success`, { state: { plan } });
    }, 2000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate(`${basePath}/subscription`)}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '2rem', fontSize: '0.9375rem', fontWeight: 600 }}
      >
        <ChevronLeft size={16} /> Back to Plans
      </button>

      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2rem', letterSpacing: '-0.02em' }}>Complete Your Payment</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        
        {/* Left Col - Payment Methods */}
        <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-default)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Payment Method
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: `2px solid ${paymentMethod === 'card' ? 'var(--accent-primary)' : 'var(--border-default)'}`, borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'card' ? 'var(--bg-subtle)' : 'transparent', transition: 'all 0.2s' }}>
              <input type="radio" name="payment_method" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} style={{ accentColor: 'var(--accent-primary)', width: '18px', height: '18px' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                <div style={{ background: 'rgba(0, 163, 255, 0.1)', padding: '0.5rem', borderRadius: '8px', color: 'var(--accent-primary)' }}><CreditCard size={20} /></div>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Credit / Debit Card</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: `2px solid ${paymentMethod === 'paystack' ? '#0ba4db' : 'var(--border-default)'}`, borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'paystack' ? 'var(--bg-subtle)' : 'transparent', transition: 'all 0.2s' }}>
              <input type="radio" name="payment_method" value="paystack" checked={paymentMethod === 'paystack'} onChange={() => setPaymentMethod('paystack')} style={{ accentColor: '#0ba4db', width: '18px', height: '18px' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                <div style={{ background: 'rgba(11, 164, 219, 0.1)', padding: '0.5rem', borderRadius: '8px', color: '#0ba4db', fontWeight: 800 }}>P</div>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Paystack</span>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: `2px solid ${paymentMethod === 'flutterwave' ? '#f5a623' : 'var(--border-default)'}`, borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'flutterwave' ? 'var(--bg-subtle)' : 'transparent', transition: 'all 0.2s' }}>
              <input type="radio" name="payment_method" value="flutterwave" checked={paymentMethod === 'flutterwave'} onChange={() => setPaymentMethod('flutterwave')} style={{ accentColor: '#f5a623', width: '18px', height: '18px' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                <div style={{ background: 'rgba(245, 166, 35, 0.1)', padding: '0.5rem', borderRadius: '8px', color: '#f5a623', fontWeight: 800 }}>F</div>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Flutterwave</span>
              </div>
            </label>
          </div>

          {paymentMethod === 'card' && (
            <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Cardholder Name</label>
                <input type="text" required placeholder="John Doe" style={{ width: '100%', padding: '0.875rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Card Number</label>
                <input type="text" required placeholder="0000 0000 0000 0000" style={{ width: '100%', padding: '0.875rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Expiry Date</label>
                  <input type="text" required placeholder="MM/YY" style={{ width: '100%', padding: '0.875rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>CVV</label>
                  <input type="text" required placeholder="123" style={{ width: '100%', padding: '0.875rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }} />
                </div>
              </div>
            </form>
          )}

          {paymentMethod !== 'card' && (
            <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-subtle)', borderRadius: '12px' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>You will be redirected to {paymentMethod === 'paystack' ? 'Paystack' : 'Flutterwave'} to complete your payment securely.</p>
            </div>
          )}
        </div>

        {/* Right Col - Order Summary */}
        <div>
          <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-default)', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-default)' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)' }}>{plan.name}</strong>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Billed Monthly</span>
              </div>
              <strong style={{ color: 'var(--text-primary)' }}>{formatCurrency(plan.monthlyPrice).replace('.00', '')}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              <span>Subtotal</span>
              <span>{formatCurrency(plan.monthlyPrice).replace('.00', '')}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              <span>Tax (0%)</span>
              <span>₦0</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              <span>Total Due</span>
              <span style={{ color: plan.color }}>{formatCurrency(plan.monthlyPrice).replace('.00', '')}</span>
            </div>

            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '12px',
                border: 'none',
                background: plan.color,
                color: plan.color === 'var(--bg-brand)' ? 'var(--bg-surface)' : 'white',
                fontSize: '1rem',
                fontWeight: 800,
                cursor: isProcessing ? 'wait' : 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: isProcessing ? 0.7 : 1,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              {isProcessing ? 'Processing...' : `Pay ${formatCurrency(plan.monthlyPrice).replace('.00', '')}`}
              {!isProcessing && <ArrowRight size={18} />}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>
              <ShieldCheck size={14} /> Payments are secure and encrypted.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PaymentCheckout;
