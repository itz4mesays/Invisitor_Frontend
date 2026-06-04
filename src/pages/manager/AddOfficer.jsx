import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, User, Shield, Phone, Mail, Clock, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const AddOfficer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'Security Officer',
    shift: 'Morning (6AM - 2PM)',
    idType: 'National ID',
    idNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally we'd save data here
    navigate('/manager/security');
  };

  return (
    <div className="add-officer-page">
      <div className="ao-header">
        <button className="ao-back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} /> Back
        </button>
        <div>
          <h1>Add New Officer</h1>
          <p>Register a new security or front desk officer.</p>
        </div>
      </div>

      <motion.form 
        className="ao-form-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
      >
        <div className="ao-section">
          <h3><User size={18} /> Personal Information</h3>
          <div className="ao-grid">
            <div className="ao-field">
              <label>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="James" />
            </div>
            <div className="ao-field">
              <label>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Wilson" />
            </div>
            <div className="ao-field">
              <label>Email Address</label>
              <div className="ao-input-with-icon">
                <Mail size={16} />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="james@example.com" />
              </div>
            </div>
            <div className="ao-field">
              <label>Phone Number</label>
              <div className="ao-input-with-icon">
                <Phone size={16} />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+234 800 000 0000" />
              </div>
            </div>
          </div>
        </div>

        <div className="ao-divider" />

        <div className="ao-section">
          <h3><Shield size={18} /> Role & Assignment</h3>
          <div className="ao-grid">
            <div className="ao-field">
              <label>Officer Role</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="Security Officer">Security Officer</option>
                {/* <option value="Front Desk Officer">Front Desk Officer</option> */}
              </select>
            </div>
            <div className="ao-field">
              <label>Assigned Shift</label>
              <div className="ao-input-with-icon">
                <Clock size={16} />
                <select name="shift" value={formData.shift} onChange={handleChange}>
                  <option value="Morning (6AM - 2PM)">Morning (6AM - 2PM)</option>
                  <option value="Afternoon (2PM - 10PM)">Afternoon (2PM - 10PM)</option>
                  <option value="Night (10PM - 6AM)">Night (10PM - 6AM)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="ao-divider" />

        <div className="ao-section">
          <h3><CreditCard size={18} /> Identification</h3>
          <div className="ao-grid">
            <div className="ao-field">
              <label>ID Type</label>
              <select name="idType" value={formData.idType} onChange={handleChange}>
                <option value="National ID">National ID</option>
                <option value="Driver's License">Driver's License</option>
                <option value="International Passport">International Passport</option>
              </select>
            </div>
            <div className="ao-field">
              <label>ID Number</label>
              <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} required placeholder="NIN or ID Number" />
            </div>
          </div>
        </div>

        <div className="ao-form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn-submit"><Save size={18} /> Save Officer</button>
        </div>
      </motion.form>

      <style jsx>{`
        .add-officer-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; max-width: 800px; margin: 0 auto; }
        .ao-header { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 0.5rem; }
        .ao-back-btn { background: var(--bg-surface); border: 1px solid var(--border-default); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; flex-shrink: 0; }
        .ao-back-btn:hover { background: var(--bg-subtle); color: var(--bg-brand); }
        .ao-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.25rem 0; }
        .ao-header p { color: var(--text-tertiary); margin: 0; font-size: 0.9375rem; }

        .ao-form-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 2rem; display: flex; flex-direction: column; gap: 2rem; }
        .ao-section h3 { font-size: 1.125rem; font-weight: 700; color: var(--text-primary); margin: 0 0 1.25rem 0; display: flex; align-items: center; gap: 0.5rem; }
        .ao-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        
        .ao-field { display: flex; flex-direction: column; gap: 0.5rem; }
        .ao-field label { font-size: 0.8125rem; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.05em; }
        .ao-field input, .ao-field select { padding: 0.75rem 1rem; border: 1px solid var(--border-default); border-radius: 10px; font-size: 0.9375rem; color: var(--text-primary); outline: none; transition: border 0.2s; width: 100%; box-sizing: border-box; font-family: inherit; }
        .ao-field input:focus, .ao-field select:focus { border-color: #3b82f6; }
        
        .ao-input-with-icon { position: relative; display: flex; align-items: center; }
        .ao-input-with-icon svg { position: absolute; left: 1rem; color: var(--text-quaternary); }
        .ao-input-with-icon input, .ao-input-with-icon select { padding-left: 2.75rem; width: 100%; }

        .ao-divider { height: 1px; background: var(--bg-muted); margin: 0.5rem 0; }

        .ao-form-actions { display: flex; justify-content: flex-end; gap: 1rem; padding-top: 1rem; }
        .btn-cancel { padding: 0.875rem 1.5rem; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 12px; font-weight: 700; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
        .btn-cancel:hover { background: var(--bg-subtle); color: var(--text-primary); }
        .btn-submit { padding: 0.875rem 1.5rem; background: var(--bg-brand); border: none; border-radius: 12px; font-weight: 700; color: var(--text-inverse); cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
        .btn-submit:hover { background: var(--text-primary); transform: translateY(-1px); }

        @media (max-width: 768px) {
          .ao-grid { grid-template-columns: 1fr; }
          .ao-form-card { padding: 1.5rem; }
          .ao-form-actions { flex-direction: column-reverse; }
          .btn-cancel, .btn-submit { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default AddOfficer;
