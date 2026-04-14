import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessType = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('');

  return (
    <div className="card" style={{ maxWidth: '600px' }}>
      <h1 className="card-title">Sign Up</h1>
      <p className="card-subtitle">Tell us about your business</p>

      <div className="stepper" style={{ width: '80%', margin: '0 auto 2.5rem' }}>
        <div className="step active">
          <div className="step-circle" />
          <span className="step-label">Account info</span>
        </div>
        <div className="step">
          <div className="step-circle" />
          <span className="step-label">Business details</span>
        </div>
        <div className="step">
          <div className="step-circle" />
          <span className="step-label">Contact info</span>
        </div>
        <div className="step">
          <div className="step-circle" />
          <span className="step-label">KYC</span>
        </div>
        <div className="step">
          <div className="step-circle" />
          <span className="step-label">Verify</span>
        </div>
      </div>

      <div className="form-group">
        <label>Select Business Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="" disabled>Choose an option</option>
          <option value="retail">Retail</option>
          <option value="service">Service Provider</option>
          <option value="tech">Technology</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button onClick={() => navigate('/register')} className="btn btn-primary" disabled={!type}>Proceed</button>
    </div>
  );
};

export default BusinessType;
