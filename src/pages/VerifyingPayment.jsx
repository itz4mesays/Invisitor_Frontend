import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ShieldCheck } from 'lucide-react';

const VerifyingPayment = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate transaction verification
    const timer = setTimeout(() => {
      // In a real app, you'd check a backend status here
      const isSuccess = true; 
      if (isSuccess) {
        navigate('/success');
      } else {
        navigate('/payment-failed');
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="card" style={{ maxWidth: '600px', textAlign: 'center', padding: '4rem 2rem' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}
      >
        <Loader2 size={64} color="var(--accent-primary)" />
      </motion.div>
      
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--bg-brand)' }}>
        Verifying Transaction
      </h2>
      <p style={{ color: 'var(--text-tertiary)', marginBottom: '2rem', lineHeight: 1.6 }}>
        Your payment is being processed by secure gateways. Please do not refresh the page or click the back button.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center', background: 'var(--bg-subtle)', padding: '1rem', borderRadius: '12px' }}>
        <ShieldCheck size={20} color="var(--text-success)" />
        <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
          Secured by InVisitor Encryption
        </span>
      </div>
    </div>
  );
};

export default VerifyingPayment;
