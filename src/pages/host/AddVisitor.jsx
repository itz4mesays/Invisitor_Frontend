import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Shield, Calendar, Clock, User, CheckCircle } from 'lucide-react';

const AddVisitor = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/host/visitors');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="add-v-success">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="success-card"
        >
          <div className="success-icon"><CheckCircle size={64} /></div>
          <h2>Visitor Added Successfully</h2>
          <p>The visitor has been logged and the appointment is scheduled.</p>
          <p className="redirect-text">Redirecting you back to the visitors list...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="add-v-page">
      <div className="add-v-header">
        <button className="btn-back" onClick={() => navigate('/host/visitors')}>
          <ArrowLeft size={16} /> Back to Visitors
        </button>
        <h1>Add New Visitor</h1>
        <p>Enter the visitor's profile and schedule their appointment details.</p>
      </div>

      <form onSubmit={handleSubmit} className="add-v-form">
        <section className="form-section">
          <h2><User size={18} /> Visitor Profile</h2>
          <div className="profile-photo-area">
            <div className="photo-circle"><User size={40} color="var(--text-quaternary)" /></div>
            <button type="button" className="btn-upload-text">Upload Profile Picture</button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select className="phone-prefix"><option>+234</option><option>+1</option></select>
                <input type="text" placeholder="800 000 0000" style={{ flex: 1 }} required />
              </div>
            </div>
            <div className="form-group">
              <label>Visitor Type</label>
              <select required>
                <option value="">Select type...</option>
                <option value="General">General Visitor</option>
                <option value="Contractor">Contractor</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
            <div className="form-group">
              <label>Company Name (Optional)</label>
              <input type="text" placeholder="Acme Corp" />
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2><Shield size={18} /> Identification</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Document Type</label>
              <select required>
                <option value="">Select document...</option>
                <option value="Passport">Passport</option>
                <option value="Driver's License">Driver's License</option>
                <option value="National ID">National ID</option>
              </select>
            </div>
            <div className="form-group">
              <label>ID Number</label>
              <input type="text" placeholder="Enter ID number" required />
            </div>
          </div>
          <div className="upload-box">
            <Upload size={20} color="var(--text-tertiary)" />
            <span>Click to upload ID document copy (PDF, JPG)</span>
          </div>
        </section>

        <section className="form-section">
          <h2><Calendar size={18} /> Appointment Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Expected Date</label>
              <div className="input-with-icon">
                <input type="date" required />
              </div>
            </div>
            <div className="form-group">
              <label>Expected Time</label>
              <div className="input-with-icon">
                <input type="time" required />
              </div>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Purpose of Visit</label>
              <input type="text" placeholder="e.g. Meeting, Maintenance, Delivery" required />
            </div>
          </div>
        </section>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate('/host/visitors')}>Cancel</button>
          <button type="submit" className="btn-submit">Add Visitor</button>
        </div>
      </form>

      <style jsx>{`
        .add-v-page { max-width: 800px; margin: 0 auto; padding-bottom: 4rem; }
        .add-v-header { margin-bottom: 2.5rem; }
        .btn-back { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; color: var(--text-tertiary); font-weight: 600; cursor: pointer; padding: 0; margin-bottom: 1rem; transition: color 0.2s; }
        .btn-back:hover { color: var(--bg-brand); }
        .add-v-header h1 { font-size: 2rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.5rem 0; }
        .add-v-header p { color: var(--text-tertiary); margin: 0; }
        
        .add-v-form { display: flex; flex-direction: column; gap: 2rem; }
        .form-section { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 16px; padding: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .form-section h2 { display: flex; align-items: center; gap: 0.5rem; font-size: 1.1rem; font-weight: 800; color: var(--text-primary); border-bottom: 1px solid var(--bg-muted); padding-bottom: 1rem; margin: 0 0 1.5rem 0; }
        
        .profile-photo-area { display: flex; flex-direction: column; align-items: center; gap: 1rem; margin-bottom: 2rem; }
        .photo-circle { width: 80px; height: 80px; border-radius: 50%; background: var(--bg-muted); border: 2px dashed var(--border-heavy); display: flex; align-items: center; justify-content: center; }
        .btn-upload-text { background: none; border: none; color: var(--accent-primary); font-weight: 700; font-size: 0.875rem; cursor: pointer; }
        
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.75rem; font-weight: 700; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em; }
        .form-group input, .form-group select { padding: 0.875rem 1rem; border: 1px solid var(--border-heavy); border-radius: 8px; font-size: 0.95rem; color: var(--text-primary); transition: all 0.2s; background: #fff; }
        .form-group input:focus, .form-group select:focus { outline: none; border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(0, 163, 255, 0.1); }
        .phone-prefix { width: 90px; }
        
        .upload-box { margin-top: 1.5rem; border: 2px dashed var(--border-heavy); border-radius: 12px; padding: 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.75rem; color: var(--text-tertiary); font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: all 0.2s; background: var(--bg-subtle); }
        .upload-box:hover { border-color: var(--text-quaternary); background: var(--bg-muted); }
        
        .form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
        .btn-cancel { padding: 1rem 2rem; background: var(--bg-surface); border: 1px solid var(--border-heavy); border-radius: 12px; font-weight: 700; color: var(--text-secondary); cursor: pointer; font-size: 0.95rem; }
        .btn-submit { padding: 1rem 2.5rem; background: var(--bg-brand); border: none; border-radius: 12px; font-weight: 700; color: var(--text-inverse); cursor: pointer; font-size: 0.95rem; transition: background 0.2s; }
        .btn-submit:hover { background: var(--bg-brand-hover); }

        .add-v-success { position: fixed; inset: 0; background: rgba(255,255,255,0.95); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .success-card { background: var(--bg-surface); padding: 4rem 3rem; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); text-align: center; max-width: 450px; }
        .success-icon { color: var(--text-success); margin-bottom: 1.5rem; display: flex; justify-content: center; }
        .success-card h2 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin: 0 0 1rem 0; }
        .success-card p { color: var(--text-tertiary); margin: 0 0 1rem 0; line-height: 1.5; }
        .redirect-text { font-size: 0.875rem; color: var(--text-quaternary); font-style: italic; }

        @media (max-width: 768px) {
          .form-grid { grid-template-columns: 1fr; }
          .form-actions { flex-direction: column-reverse; }
          .btn-cancel, .btn-submit { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default AddVisitor;
