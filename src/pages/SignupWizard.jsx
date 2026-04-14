import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building2, CreditCard, Check, Shield, Lock } from 'lucide-react';

const SignupWizard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('private');

  // Handle initial step from route if needed
  useEffect(() => {
    if (location.state?.step) {
      setStep(location.state.step);
    }
  }, [location.state]);

  const steps = [
    { id: 1, label: 'Business Type' },
    { id: 2, label: 'Business Information' },
    { id: 3, label: 'Contact Information' },
    { id: 4, label: 'Payment' },
  ];

  const nextStep = () => setStep(s => Math.min(s + 1, steps.length));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const renderStep = () => {
    switch(step) {
      case 1: // Business Type
        return (
          <div className="step-content">
            <p style={{ textAlign: 'center', fontWeight: 600, marginBottom: '2.5rem', color: '#0d2331' }}>Select Business Type</p>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '1rem' }}>
              <div 
                onClick={() => setSelectedType('private')}
                style={{ 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', 
                  cursor: 'pointer', flex: 1, padding: '1.5rem', borderRadius: '24px',
                  background: selectedType === 'private' ? 'rgba(d, 35, 49, 0.03)' : 'transparent',
                  border: selectedType === 'private' ? '2px solid #0d2331' : '2px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#ffb347', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                   <User size={60} color="white" />
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0d2331' }}>Private/Public</span>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.5rem', background: selectedType === 'private' ? '#0d2331' : 'transparent' }}>
                  {selectedType === 'private' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />}
                </div>
              </div>
              <div 
                onClick={() => setSelectedType('real-estate')}
                style={{ 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', 
                  cursor: 'pointer', flex: 1, padding: '1.5rem', borderRadius: '24px',
                  background: selectedType === 'real-estate' ? 'rgba(d, 35, 49, 0.03)' : 'transparent',
                  border: selectedType === 'real-estate' ? '2px solid #0d2331' : '2px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#0FB3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                   <Building2 size={60} color="white" />
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0d2331' }}>Real Estate</span>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.5rem', background: selectedType === 'real-estate' ? '#0d2331' : 'transparent' }}>
                  {selectedType === 'real-estate' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />}
                </div>
              </div>
            </div>
          </div>
        );
      case 2: // Business Information
        return (
          <div className="step-content">
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
               <div className="form-group" style={{ gridColumn: 'span 2' }}>
                 <label>Official Name of Business/Organization</label>
                 <input type="text" placeholder="Enter business name" />
               </div>
               <div className="form-group">
                 <label>Registration Number (Optional)</label>
                 <input type="text" placeholder="RC1234567" />
               </div>
               <div className="form-group">
                 <label>Establishment Date</label>
                 <input type="date" />
               </div>
               <div className="form-group" style={{ gridColumn: 'span 2' }}>
                 <label>Business Category</label>
                 <select>
                   <option value="">Select a category</option>
                   <option value="retail">Retail</option>
                   <option value="tech">Technology</option>
                   <option value="service">Service</option>
                 </select>
               </div>
             </div>
          </div>
        );
      case 3: // Contact Information
        return (
          <div className="step-content">
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
               <div className="form-group" style={{ gridColumn: 'span 2' }}>
                 <label>Physical Address</label>
                 <input type="text" placeholder="House No, Street, City, State" />
               </div>
               <div className="form-group">
                 <label>Contact Email</label>
                 <input type="email" placeholder="email@business.com" />
               </div>
               <div className="form-group">
                 <label>Contact Phone</label>
                 <input type="text" placeholder="+234 (0) 800..." />
               </div>
               <div className="form-group" style={{ gridColumn: 'span 2' }}>
                 <label>Liaison Officer Name</label>
                 <input type="text" placeholder="Full name of person in charge" />
               </div>
             </div>
          </div>
        );
      case 4: // Payment
        return (
          <div className="step-content">
            <div style={{ background: 'rgba(13, 35, 49, 0.02)', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: '#64748b' }}>Selected Plan</span>
                  <span style={{ fontWeight: 700 }}>Starter Plan — $29/mo</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', color: '#0d2331' }}>
                  <span>Total Due</span>
                  <span>$29.00</span>
               </div>
            </div>
            <div className="form-group">
               <label>Card Number</label>
               <div style={{ position: 'relative' }}>
                  <input type="text" placeholder="0000 0000 0000 0000" />
                  <CreditCard size={18} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#cbd5e1' }} />
               </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
               <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" />
               </div>
               <div className="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" />
               </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '1rem', padding: '1rem', background: '#f0fdf4', borderRadius: '8px' }}>
               <Lock size={16} color="#22c55e" />
               <span style={{ fontSize: '0.8rem', color: '#16a34a' }}>Your payment is secured with industry-standard encryption.</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card" style={{ maxWidth: '850px', padding: '3.5rem' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.9rem', cursor: 'pointer', marginBottom: '1.5rem', padding: 0 }}
      >
        ← Back to Site
      </button>
      <h1 className="card-title" style={{ fontSize: '2.5rem', textAlign: 'center' }}>Sign Up</h1>
      <p className="card-subtitle" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        {step === 4 ? "Unlock the full potential of InVisitor" : "InVisitor is catered to businesses of all kinds."}
      </p>

      {/* Modern Stepper */}
      <div style={{ display: 'flex', position: 'relative', marginBottom: '4rem', padding: '0 2rem' }}>
        <div style={{ position: 'absolute', top: '22px', left: '10%', right: '10%', height: '2px', background: '#e2e8f0', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '22px', left: '10%', width: `${((step - 1) / (steps.length - 1)) * 80}%`, height: '2.5px', background: '#00a3ff', zIndex: 1, transition: 'all 0.4s ease' }} />
        
        {steps.map((s) => (
          <div key={s.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', zIndex: 2 }}>
            <div style={{ 
              width: '44px', height: '44px', borderRadius: '50%', 
              background: step >= s.id ? '#0d2331' : 'white',
              border: step >= s.id ? '2px solid #0d2331' : '2px solid #e2e8f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: step >= s.id ? 'white' : '#94a3b8',
              fontSize: '0.95rem', fontWeight: 700, transition: 'all 0.3s'
            }}>
              {step > s.id ? <Check size={20} /> : s.id}
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: step >= s.id ? '#0d2331' : '#94a3b8', textAlign: 'center' }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div style={{ minHeight: '350px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3.5rem' }}>
        {step > 1 && (
          <button onClick={prevStep} className="btn btn-outline" style={{ flex: 1, padding: '1.2rem' }}>Back</button>
        )}
        <button 
          onClick={step === 4 ? () => navigate('/success') : nextStep} 
          className="btn btn-primary" 
          style={{ flex: 2, padding: '1.2rem' }}
        >
          {step === 4 ? 'Complete Payment' : 'Proceed'}
        </button>
      </div>
    </div>
  );
};

export default SignupWizard;
