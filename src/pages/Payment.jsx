import React from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();

  return (
    <div className="card" style={{ maxWidth: '600px' }}>
      <h1 className="card-title">Sign Up</h1>
      <p className="card-subtitle">Choose a plan and complete payment</p>

      <div className="stepper" style={{ width: '80%', margin: '0 auto 2.5rem' }}>
        <div className="step completed">
          <div className="step-circle" />
          <span className="step-label">Account info</span>
        </div>
        <div className="step completed">
          <div className="step-circle" />
          <span className="step-label">Business details</span>
        </div>
        <div className="step active">
          <div className="step-circle" />
          <span className="step-label">Payment</span>
        </div>
      </div>

      <div className="order-summary">
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Order Summary</h3>
        <div className="summary-row">
          <span>Basic Plan (Monthly)</span>
          <span>$9.99</span>
        </div>
        <div className="summary-row">
          <span>Setup Fee</span>
          <span>$5.00</span>
        </div>
        <div className="summary-row">
          <span>VAT (7.5%)</span>
          <span>$1.12</span>
        </div>
        <div className="summary-total">
          <span>Order Total (USD)</span>
          <span>$16.11</span>
        </div>
      </div>

      <div className="form-group">
        <label>Card Details</label>
        <div style={{ position: 'relative' }}>
          <input type="text" placeholder="0000 0000 0000 0000" />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <input type="text" placeholder="MM/YY" style={{ width: '50%' }} />
            <input type="text" placeholder="CVV" style={{ width: '50%' }} />
          </div>
        </div>
      </div>

      <button onClick={() => navigate('/success')} className="btn btn-primary">Complete Payment</button>
    </div>
  );
};

export default Payment;
