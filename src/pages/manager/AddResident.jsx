import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Mail, Phone, Home, MapPin, ShieldAlert, Check } from 'lucide-react';

const DIAL_CODES = ['+234', '+1', '+44', '+27', '+233'];

const AddResident = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', dialCode: '+234', phone: '',
    type: '', unit: '', streetNumber: '', houseAddress: '',
    emergencyName: '', emergencyDialCode: '+234', emergencyPhone: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', padding: '2rem' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'white', padding: '4rem 2rem', borderRadius: 24, boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: 500, width: '100%', border: '1px solid #e2e8f0' }}>
          <div style={{ width: 80, height: 80, background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <Check size={40} strokeWidth={3} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0d2331', marginBottom: '1rem' }}>Resident Added!</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: 1.6 }}>The new resident has been registered successfully.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button style={{ background: '#0d2331', color: 'white', border: 'none', padding: '1rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/manager/residents')}>View Residents</button>
            <button style={{ background: 'white', color: '#0d2331', border: '1.5px solid #e2e8f0', padding: '1rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }} onClick={() => navigate('/manager')}>Back to Dashboard</button>
          </div>
        </motion.div>
      </div>
    );
  }

  const Field = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0d2331' }}>{label}</label>
      {children}
    </div>
  );

  const inputStyle = { width: '100%', padding: '0.875rem 1rem', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' };

  return (
    <div className="ar-page">
      <header className="ar-header">
        <button className="ar-back" onClick={() => navigate(-1)}><ChevronLeft size={20} /> Back</button>
        <h1>Add New Resident</h1>
        <p>Register a new resident for the estate</p>
      </header>

      <form className="ar-form" onSubmit={handleSubmit}>
        {/* Personal Info */}
        <div className="ar-section">
          <h3><User size={18} /> Personal Information</h3>
          <div className="ar-grid">
            <Field label="First Name"><input style={inputStyle} value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} placeholder="First name" required /></Field>
            <Field label="Last Name"><input style={inputStyle} value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} placeholder="Last name" required /></Field>
            <Field label="Email Address"><input style={inputStyle} type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@example.com" required /></Field>
            <Field label="Phone Number">
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select style={{ ...inputStyle, width: 110, flexShrink: 0 }} value={form.dialCode} onChange={e => setForm({...form, dialCode: e.target.value})}>
                  {DIAL_CODES.map(c => <option key={c}>{c}</option>)}
                </select>
                <input style={inputStyle} type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="814 609 2019" required />
              </div>
            </Field>
            <Field label="Resident Type">
              <select style={inputStyle} value={form.type} onChange={e => setForm({...form, type: e.target.value})} required>
                <option value="">Select Type</option>
                <option>Tenant</option>
                <option>Property Owner</option>
              </select>
            </Field>
          </div>
        </div>

        {/* Address */}
        <div className="ar-section">
          <h3><Home size={18} /> Address Details</h3>
          <div className="ar-grid">
            <Field label="Unit Number"><input style={inputStyle} value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} placeholder="e.g. Block A, Apt 101" required /></Field>
            <Field label="Street Number"><input style={inputStyle} value={form.streetNumber} onChange={e => setForm({...form, streetNumber: e.target.value})} placeholder="e.g. 15" required /></Field>
            <Field label="House Address"><input style={{...inputStyle, gridColumn: 'span 2'}} value={form.houseAddress} onChange={e => setForm({...form, houseAddress: e.target.value})} placeholder="Full house address" required /></Field>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="ar-section">
          <h3><ShieldAlert size={18} /> Emergency Contact</h3>
          <div className="ar-grid">
            <Field label="Contact Name"><input style={inputStyle} value={form.emergencyName} onChange={e => setForm({...form, emergencyName: e.target.value})} placeholder="Full name" required /></Field>
            <Field label="Contact Phone">
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select style={{ ...inputStyle, width: 110, flexShrink: 0 }} value={form.emergencyDialCode} onChange={e => setForm({...form, emergencyDialCode: e.target.value})}>
                  {DIAL_CODES.map(c => <option key={c}>{c}</option>)}
                </select>
                <input style={inputStyle} type="tel" value={form.emergencyPhone} onChange={e => setForm({...form, emergencyPhone: e.target.value})} placeholder="Phone number" required />
              </div>
            </Field>
          </div>
        </div>

        <div className="ar-actions">
          <button type="button" className="ar-btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="ar-btn-submit">Add Resident</button>
        </div>
      </form>

      <style jsx>{`
        .ar-page { padding: 2rem; max-width: 900px; margin: 0 auto; }
        .ar-header { margin-bottom: 2rem; }
        .ar-back { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; color: #64748b; font-weight: 600; cursor: pointer; padding: 0; margin-bottom: 1rem; }
        .ar-header h1 { font-size: 2rem; font-weight: 800; color: #0d2331; margin: 0 0 0.5rem; }
        .ar-header p { color: #64748b; margin: 0; }
        .ar-form { display: flex; flex-direction: column; gap: 2rem; }
        .ar-section { background: white; padding: 2rem; border-radius: 20px; border: 1px solid #e2e8f0; }
        .ar-section h3 { font-size: 1rem; font-weight: 700; color: #0d2331; margin: 0 0 1.5rem; display: flex; align-items: center; gap: 0.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; }
        .ar-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .ar-actions { display: flex; justify-content: flex-end; gap: 1rem; }
        .ar-btn-cancel { padding: 1rem 2rem; border: 1px solid #e2e8f0; border-radius: 12px; font-weight: 700; background: white; cursor: pointer; color: #64748b; }
        .ar-btn-submit { padding: 1rem 3rem; border: none; border-radius: 12px; font-weight: 700; background: #0d2331; cursor: pointer; color: white; }
        @media (max-width: 768px) {
          .ar-page { padding: 1.5rem; }
          .ar-header h1 { font-size: 1.5rem; }
          .ar-grid { grid-template-columns: 1fr; }
          .ar-actions { flex-direction: column; }
          .ar-btn-submit, .ar-btn-cancel { width: 100%; }
          .ar-section { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default AddResident;
