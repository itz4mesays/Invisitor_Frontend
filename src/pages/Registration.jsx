import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const steps = [
    'Account info',
    'Business details',
    'Contact info',
    'KYC',
    'Verify'
  ];

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="step-content">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" placeholder="John" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" placeholder="Doe" />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="********" />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="********" />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" placeholder="Enter company name" />
              </div>
              <div className="form-group">
                <label>Company Email</label>
                <input type="email" placeholder="Enter company email" />
              </div>
              <div className="form-group">
                <label>Business Category</label>
                <select>
                  <option>Select Category</option>
                  <option>Retail</option>
                  <option>Logistics</option>
                </select>
              </div>
              <div className="form-group">
                <label>Company Size</label>
                <select>
                  <option>Select Size</option>
                  <option>1-10</option>
                  <option>11-50</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--input-border)', minHeight: '80px', fontFamily: 'inherit' }} placeholder="Tell us about your business"></textarea>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className="form-group">
                <label>Contact Phone</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <select style={{ width: '100px', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--input-border)' }}>
                    <option>+234</option>
                    <option>+1</option>
                    <option>+44</option>
                  </select>
                  <input type="text" placeholder="814 609 2019" style={{ flex: 1 }} />
                </div>
              </div>
              <div className="form-group">
                <label>Work Email</label>
                <input type="email" placeholder="work@company.com" />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Office Address</label>
                <input type="text" placeholder="123 Business St, Suite 100" />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Upload business registration documents and ID.</p>
            <div className="form-group">
              <label>CAC Documents / ID Proof</label>
              <div style={{ border: '2px dashed var(--border-default)', borderRadius: '12px', padding: '2rem', textAlign: 'center', cursor: 'pointer' }}>
                <p style={{ color: 'var(--text-quaternary)' }}>Drag and drop or click to upload</p>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-content">
            <h3 style={{ marginBottom: '1rem' }}>Review your information</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Please ensure all details provided are accurate before proceeding to payment.</p>
            <div style={{ background: 'var(--bg-subtle)', padding: '1.5rem', borderRadius: '12px', marginTop: '1.5rem' }}>
              <div className="summary-row"><span>Account</span> <span>John Doe</span></div>
              <div className="summary-row"><span>Company</span> <span>InVisitor Tech</span></div>
              <div className="summary-row"><span>Type</span> <span>Business</span></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card" style={{ maxWidth: '800px' }}>
      <h1 className="card-title">Sign Up</h1>
      <p className="card-subtitle">Complete your registration details</p>

      <div className="stepper" style={{ width: '100%', marginBottom: '2.5rem' }}>
        {steps.map((label, i) => (
          <div key={i} className={`step ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'completed' : ''}`}>
            <div className="step-circle" />
            <span className="step-label">{label}</span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        {step > 1 && (
          <button onClick={prevStep} className="btn btn-outline" style={{ flex: 1 }}>Back</button>
        )}
        <button 
          onClick={step === 5 ? () => navigate('/payment') : nextStep} 
          className="btn btn-primary" 
          style={{ flex: 2 }}
        >
          {step === 5 ? 'Proceed to Payment' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Registration;
