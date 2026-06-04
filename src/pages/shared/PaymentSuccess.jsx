import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download, Home } from 'lucide-react';
import Confetti from 'react-confetti';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  const isEstateManager = location.pathname.includes('/manager');
  const basePath = isEstateManager ? '/manager' : '/host';

  const transactionRef = `TRX-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2rem' }}>
      {/* Simple confetti effect for 5 seconds */}
      <Confetti recycle={false} numberOfPieces={500} gravity={0.15} />

      <div style={{ background: 'var(--bg-surface)', padding: '3rem', borderRadius: '24px', border: '1px solid var(--border-default)', maxWidth: '500px', width: '100%', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 1.5rem' }}>
          <CheckCircle size={40} />
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Payment Successful!
        </h1>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.0625rem', marginBottom: '2rem', lineHeight: 1.6 }}>
          Thank you for your payment. Your subscription to <strong style={{ color: 'var(--text-primary)' }}>{plan ? plan.name : 'your new plan'}</strong> is now active.
        </p>

        <div style={{ background: 'var(--bg-subtle)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Amount Paid</span>
            <strong style={{ color: 'var(--text-primary)' }}>{plan ? new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(plan.monthlyPrice).replace('.00', '') : '₦0'}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Transaction Ref</span>
            <strong style={{ color: 'var(--text-primary)' }}>{transactionRef}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>Date</span>
            <strong style={{ color: 'var(--text-primary)' }}>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={() => navigate(basePath)}
            style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--accent-primary)', color: 'white', border: 'none', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
          >
            <Home size={18} /> Go to Dashboard
          </button>
          <button 
            style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-default)', fontSize: '1rem', fontWeight: 800, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Download size={18} /> Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
