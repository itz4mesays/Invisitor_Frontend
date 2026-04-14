import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCcw } from 'lucide-react';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <XCircle size={80} color="#ef4444" style={{ margin: '0 auto' }} />
      </div>
      <h1 className="card-title" style={{ fontSize: '2rem', color: '#0d2331' }}>Payment Failed</h1>
      <p className="card-subtitle" style={{ fontSize: '1rem', marginBottom: '2.5rem' }}>
        We are sorry, but we couldn't process your transaction. 
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/register')} className="btn btn-outline" style={{ flex: 1 }}>
          <RefreshCcw size={18} /> Retry Payment
        </button>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{ flex: 1 }}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
