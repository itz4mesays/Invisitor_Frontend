import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Home, CreditCard, Check, Shield, Lock, Mail, MapPin, Users, Globe } from 'lucide-react';

const SignupWizard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(location.state?.planType || 'private');
  const [paymentMethod, setPaymentMethod] = useState('Paystack');
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Extract number of units from residents string if available
  const initialUnits = location.state?.residents ? location.state.residents.replace(/[^0-9]/g, '') : '';
  const [units, setUnits] = useState(initialUnits);

  // Handle initial step from route if needed
  useEffect(() => {
    if (location.state?.step) {
      setStep(location.state.step);
    }
    if (location.state?.planType) {
      setSelectedType(location.state.planType);
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
            <p style={{ textAlign: 'center', fontWeight: 600, marginBottom: '2.5rem', color: 'var(--bg-brand)' }}>Select Business Type</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2.5rem' }}>
              <motion.div 
                whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(0, 144, 230, 0.15)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedType('private')}
                style={{ 
                  padding: '2.5rem 2rem', 
                  border: selectedType === 'private' ? '2px solid var(--bg-brand)' : '2px solid var(--border-default)', 
                  borderRadius: '20px', 
                  cursor: 'pointer', 
                  background: selectedType === 'private' ? 'rgba(0, 144, 230, 0.05)' : 'white', 
                  textAlign: 'center', 
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: selectedType !== 'private' ? 0.5 : 1
                }}
              >
                {selectedType === 'private' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--bg-brand)' }} />}
                <div style={{ 
                  width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 1.5rem', 
                  background: selectedType === 'private' ? 'var(--bg-brand)' : '#f3f4f6', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  <Briefcase size={36} color={selectedType === 'private' ? 'white' : 'var(--bg-brand)'} />
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Private / Public Business</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>Corporate offices, agencies, retail, and commercial spaces.</p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(16, 185, 129, 0.15)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedType('real-estate')}
                style={{ 
                  padding: '2.5rem 2rem', 
                  border: selectedType === 'real-estate' ? '2px solid #10b981' : '2px solid var(--border-default)', 
                  borderRadius: '20px', 
                  cursor: 'pointer', 
                  background: selectedType === 'real-estate' ? 'rgba(16, 185, 129, 0.05)' : 'white', 
                  textAlign: 'center', 
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: selectedType !== 'real-estate' ? 0.5 : 1
                }}
              >
                {selectedType === 'real-estate' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#10b981' }} />}
                <div style={{ 
                  width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 1.5rem', 
                  background: selectedType === 'real-estate' ? '#10b981' : '#f3f4f6', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  <Home size={36} color={selectedType === 'real-estate' ? 'white' : '#10b981'} />
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>Real Estate / Estates</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>Residential communities, estates, and managed apartments.</p>
              </motion.div>
            </div>
          </div>
        );
      case 2: // Business Information
        return (
          <div className="step-content">
             {selectedType === 'private' ? (
               <div className="form-grid">
                 <div className="form-group" style={{ gridColumn: 'span 2' }}>
                   <label>Organization/Business Name</label>
                   <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="Official business name" style={{ paddingLeft: '2.75rem' }} />
                    <Briefcase size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
                   </div>
                 </div>
                 <div className="form-group">
                   <label>Organization Type</label>
                   <div style={{ position: 'relative' }}>
                    <select style={{ paddingLeft: '2.75rem' }}>
                      <option value="">Select Type</option>
                      <option value="llc">LLC</option>
                      <option value="plc">PLC</option>
                      <option value="ngo">NGO</option>
                      <option value="government">Government</option>
                      <option value="others">Others</option>
                    </select>
                    <Shield size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
                   </div>
                 </div>
                 <div className="form-group">
                   <label>Registration Number</label>
                   <input type="text" placeholder="RC1234567" />
                 </div>
                 <div className="form-group" style={{ gridColumn: 'span 2' }}>
                   <label>Address of Organization</label>
                   <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="Full physical address" style={{ paddingLeft: '2.75rem' }} />
                    <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
                   </div>
                 </div>
                 <div className="form-group">
                   <label>Industry</label>
                   <select>
                     <option value="">Select Industry</option>
                     <option value="tech">Technology</option>
                     <option value="finance">Finance</option>
                     <option value="retail">Retail</option>
                     <option value="health">Healthcare</option>
                   </select>
                 </div>
                 <div className="form-group">
                   <label>Number of Employees</label>
                   <div style={{ position: 'relative' }}>
                    <select style={{ paddingLeft: '2.75rem' }}>
                      <option value="">Select Range</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="200+">200+</option>
                    </select>
                    <Users size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
                   </div>
                 </div>
                 <div className="form-group" style={{ gridColumn: 'span 2' }}>
                   <label>Organization Email Address</label>
                   <div style={{ position: 'relative' }}>
                    <input type="email" placeholder="contact@business.com" style={{ paddingLeft: '2.75rem' }} />
                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
                   </div>
                 </div>
               </div>
             ) : (
               <div className="form-grid">
                 <div className="form-group" style={{ gridColumn: 'span 2' }}>
                   <label>Legal Entity Name</label>
                   <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="Full legal name" style={{ paddingLeft: '2.75rem' }} />
                    <Home size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
                   </div>
                 </div>
                 <div className="form-group">
                   <label>Entity Type</label>
                   <select>
                     <option value="">Select Type</option>
                     <option value="commercial">Commercial</option>
                     <option value="residential">Residential</option>
                     <option value="industrial">Industrial</option>
                   </select>
                 </div>
                 <div className="form-group">
                   <label>Owner Type</label>
                   <select>
                     <option value="">Select Owner Type</option>
                     <option value="individual">Individual</option>
                     <option value="joint">Joint</option>
                     <option value="company">Company</option>
                     <option value="trust">Trust</option>
                     <option value="government">Government</option>
                   </select>
                 </div>
                 <div className="form-group" style={{ gridColumn: 'span 2' }}>
                   <label>Full Address</label>
                   <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="Property address" style={{ paddingLeft: '2.75rem' }} />
                    <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
                   </div>
                 </div>
                 <div className="form-group">
                   <label>Number of Units</label>
                   <input type="number" placeholder="0" min="1" style={{ width: '100%' }} value={units} onChange={(e) => setUnits(e.target.value)} />
                 </div>
                 <div className="form-group">
                   <label>Primary Industry (Optional)</label>
                   <input type="text" placeholder="e.g. Hospitality" />
                 </div>
                 <div className="form-group">
                   <label>Latitude</label>
                   <input type="text" placeholder="0.0000" />
                 </div>
                 <div className="form-group">
                   <label>Longitude</label>
                   <input type="text" placeholder="0.0000" />
                 </div>
               </div>
             )}
          </div>
        );
      case 3: // Contact Information
        return (
          <div className="step-content">
             {selectedType === 'private' ? (
               <div className="form-grid">
                 <div className="form-group" style={{ gridColumn: 'span 2' }}>
                   <label>Primary Contact Person</label>
                   <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="Full name of primary contact" style={{ paddingLeft: '2.75rem' }} />
                    <Briefcase size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
                   </div>
                 </div>
                 <div className="form-group">
                   <label>Primary Contact Position</label>
                   <input type="text" placeholder="e.g. CEO, Manager" />
                 </div>
                  <div className="form-group">
                    <label>Contact Phone Number (WhatsApp preferred)</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                       <select style={{ width: '100px', flexShrink: 0, padding: '0.625rem', border: '1px solid var(--border-default)', borderRadius: '8px' }}>
                         <option>+234</option>
                         <option>+1</option>
                         <option>+44</option>
                       </select>
                       <input type="text" placeholder="814 609 2019" style={{ flex: 1, padding: '0.625rem', border: '1px solid var(--border-default)', borderRadius: '8px' }} />
                    </div>
                  </div>
                 <div className="form-group" style={{ gridColumn: 'span 2' }}>
                   <label>Contact Address</label>
                   <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="Full contact address" style={{ paddingLeft: '2.75rem' }} />
                    <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
                   </div>
                 </div>
                 <div className="form-group" style={{ gridColumn: 'span 2' }}>
                   <label>Contact Email Address</label>
                   <div style={{ position: 'relative' }}>
                    <input type="email" placeholder="contact@business.com" style={{ paddingLeft: '2.75rem' }} />
                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
                   </div>
                 </div>
               </div>
             ) : (
               <div className="form-grid">
                 <div className="form-group" style={{ gridColumn: 'span 2' }}>
                   <label>Estate Manager Name</label>
                   <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="Full name of estate manager" style={{ paddingLeft: '2.75rem' }} />
                    <Home size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
                   </div>
                 </div>
                  <div className="form-group">
                    <label>Manager Phone Number (WhatsApp preferred)</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                       <select style={{ width: '100px', flexShrink: 0, padding: '0.625rem', border: '1px solid var(--border-default)', borderRadius: '8px' }}>
                         <option>+234</option>
                         <option>+1</option>
                         <option>+44</option>
                       </select>
                       <input type="text" placeholder="814 609 2019" style={{ flex: 1, padding: '0.625rem', border: '1px solid var(--border-default)', borderRadius: '8px' }} />
                    </div>
                  </div>
                 <div className="form-group">
                   <label>Manager Email Address</label>
                   <div style={{ position: 'relative' }}>
                    <input type="email" placeholder="manager@estate.com" style={{ paddingLeft: '2.75rem' }} />
                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
                   </div>
                 </div>
                 <div className="form-group">
                   <label>Emergency Contact Person</label>
                   <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="Emergency contact name" style={{ paddingLeft: '2.75rem' }} />
                    <Shield size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-quaternary)' }} />
                   </div>
                 </div>
                  <div className="form-group">
                    <label>Emergency Contact Phone</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                       <select style={{ width: '100px', flexShrink: 0, padding: '0.625rem', border: '1px solid var(--border-default)', borderRadius: '8px' }}>
                         <option>+234</option>
                         <option>+1</option>
                         <option>+44</option>
                       </select>
                       <input type="text" placeholder="814 609 2019" style={{ flex: 1, padding: '0.625rem', border: '1px solid var(--border-default)', borderRadius: '8px' }} />
                    </div>
                  </div>
               </div>
             )}
          </div>
        );
      case 4: // Payment
        return (
          <div className="step-content">
            <div style={{ background: 'rgba(13, 35, 49, 0.02)', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid var(--border-default)' }}>
               <h4 style={{ marginBottom: '1rem', color: 'var(--bg-brand)' }}>Order Summary</h4>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>Account Type</span>
                  <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{selectedType.replace('-', ' ')}</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>Selected Plan</span>
                  <span style={{ fontWeight: 600 }}>{location.state?.planTier || 'Starter Plan'} — Monthly</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', color: 'var(--bg-brand)', borderTop: '1px dashed var(--border-heavy)', paddingTop: '1rem' }}>
                  <span>Total Due</span>
                  <span>₦25,000</span>
               </div>
            </div>

            <div className="form-group">
               <label>Select Payment Method</label>
               <div className="payment-grid">
                  {[
                    { name: 'Paystack', logo: 'https://paystack.com/assets/img/login/paystack-logo.png' },
                    { name: 'Flutterwave', logo: 'https://flutterwave.com/images/logo/logo-blue.svg' },
                    { name: 'Stripe', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' }
                  ].map(method => (
                    <div 
                      key={method.name}
                      onClick={() => setPaymentMethod(method.name)}
                      style={{ 
                        padding: '1.5rem 1rem', borderRadius: '12px', border: paymentMethod === method.name ? '2px solid var(--bg-brand)' : '1px solid var(--border-default)',
                        textAlign: 'center', cursor: 'pointer', background: paymentMethod === method.name ? 'var(--bg-subtle)' : 'white',
                        transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem'
                      }}
                    >
                      <div style={{ height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {method.name === 'Paystack' ? (
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <rect x="2" y="5" width="20" height="3" rx="1.5" fill="#00C3F8" />
                               <rect x="2" y="10" width="16" height="3" rx="1.5" fill="#00C3F8" />
                               <rect x="2" y="15" width="20" height="3" rx="1.5" fill="#00C3F8" />
                             </svg>
                             <span style={{ fontWeight: 900, fontSize: '1.2rem', color: '#011b33', letterSpacing: '-0.5px' }}>paystack</span>
                           </div>
                         ) : method.name === 'Flutterwave' ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 20C30 20 20 40 20 50C20 60 30 80 50 80C70 80 80 60 80 50C80 40 70 20 50 20Z" stroke="#fb923c" strokeWidth="8" />
                                <path d="M40 30C25 30 15 45 15 50C15 55 25 70 40 70" stroke="#f472b6" strokeWidth="6" />
                                <path d="M60 30C75 30 85 45 85 50C85 55 75 70 60 70" stroke="var(--text-success)" strokeWidth="6" />
                              </svg>
                              <span style={{ fontWeight: 900, fontSize: '1.2rem', color: '#1f2937', letterSpacing: '-0.5px' }}>flutterwave</span>
                            </div>
                         ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ fontWeight: 900, fontSize: '1.4rem', color: '#635bff', letterSpacing: '-1px', fontStyle: 'italic' }}>stripe</span>
                            </div>
                         )}
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{method.name}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '2rem', padding: '1.5rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid var(--bg-success-subtle)' }}>
               <Lock size={20} color="var(--text-success)" />
               <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 600, marginBottom: '0.25rem' }}>Secure Checkout</p>
                  <p style={{ fontSize: '0.75rem', color: '#16a34a', opacity: 0.8 }}>You will be redirected to {paymentMethod}'s secure portal to complete your transaction.</p>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '850px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', marginBottom: '2.5rem', padding: 0, transition: 'color 0.2s' }}
        onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'}
        onMouseOut={(e) => e.target.style.color = 'var(--text-tertiary)'}
      >
        ← Back to Site
      </button>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>Sign Up</h1>
      <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '3.5rem' }}>
        {step === 4 ? "Unlock the full potential of InVisitor" : "InVisitor is catered to businesses of all kinds."}
      </p>

      {/* Modern Stepper */}
      <div style={{ display: 'flex', position: 'relative', marginBottom: '4rem', padding: '0 2rem' }}>
        <div style={{ position: 'absolute', top: '22px', left: '10%', right: '10%', height: '2px', background: 'var(--border-default)', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: '22px', left: '10%', width: `${((step - 1) / (steps.length - 1)) * 80}%`, height: '2.5px', background: 'var(--text-success)', zIndex: 1, transition: 'all 0.4s ease' }} />
        
        {steps.map((s) => (
          <div key={s.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', zIndex: 2 }}>
            <div style={{ 
              width: '44px', height: '44px', borderRadius: '50%', 
              background: step > s.id ? 'var(--text-success)' : (step === s.id ? 'var(--bg-brand)' : 'white'),
              border: step > s.id ? '2px solid var(--text-success)' : (step === s.id ? '2px solid var(--bg-brand)' : '2px solid var(--border-default)'),
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: step >= s.id ? 'white' : 'var(--text-quaternary)',
              fontSize: '0.95rem', fontWeight: 700, transition: 'all 0.3s'
            }}>
              {step > s.id ? <Check size={20} /> : s.id}
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: step === s.id ? 'var(--bg-brand)' : (step > s.id ? 'var(--text-success)' : 'var(--text-quaternary)'), textAlign: 'center' }}>{s.label}</span>
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
          <button onClick={prevStep} style={{ flex: 1, padding: '1.2rem', background: 'transparent', color: 'var(--text-primary)', border: '1.5px solid var(--border-default)', borderRadius: '12px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => e.target.style.background = 'var(--bg-subtle)'} onMouseOut={(e) => e.target.style.background = 'transparent'}>Back</button>
        )}
        <button 
          onClick={step === 4 ? () => navigate('/verify-payment') : nextStep} 
          style={{ flex: 2, padding: '1.2rem', background: 'var(--bg-brand)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 4px 12px rgba(0, 144, 230, 0.2)' }}
        >
          {step === 4 ? `Pay with ${paymentMethod}` : 'Proceed'}
        </button>
      </div>
      
      <style jsx>{`
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .payment-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
        
        .form-group label { display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; }
        .form-group input, .form-group select { 
          width: 100%; padding: 1rem; border-radius: 12px; border: 1.5px solid var(--border-default); 
          background: transparent; color: var(--text-primary); font-size: 1rem; outline: none; transition: border-color 0.2s; 
        }
        .form-group input:focus, .form-group select:focus { border-color: var(--bg-brand); }
        
        @media (max-width: 768px) {
          .form-grid { grid-template-columns: 1fr; }
          .payment-grid { grid-template-columns: 1fr; }
          .step-label { display: none; }
        }
      `}</style>
    </div>
  );
};

export default SignupWizard;
