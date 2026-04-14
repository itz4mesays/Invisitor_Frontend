import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '2rem' }}>
        <CheckCircle size={80} color="#22c55e" style={{ margin: '0 auto' }} />
      </div>
      <h1 className="card-title">Payment Successful</h1>
      <p className="card-subtitle">
        Your account has been successfully created and your payment was processed correctly.
      </p>

      <button onClick={() => navigate('/login')} className="btn btn-primary">Proceed to Dashboard</button>
    </div>
  );
};

export default Success;
