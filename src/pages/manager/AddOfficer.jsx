import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Shield, Mail, Phone, Clock, Check } from 'lucide-react';

const AddOfficer = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="success-page-container">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="success-card">
          <div className="success-icon-wrapper"><Check size={48} strokeWidth={4} /></div>
          <h1>Officer Added Successfully!</h1>
          <p>The new officer has been registered and can now access the system with their credentials.</p>
          <div className="success-actions">
            <button className="btn-primary" onClick={() => navigate('/manager/security')}>View Officers</button>
            <button className="btn-outline" onClick={() => navigate('/manager')}>Back to Dashboard</button>
          </div>
        </motion.div>
        <style jsx>{`
          .success-page-container { display: flex; align-items: center; justify-content: center; min-height: 70vh; padding: 2rem; }
          .success-card { background: white; padding: 4rem 2rem; border-radius: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center; max-width: 500px; width: 100%; border: 1px solid #e2e8f0; }
          .success-icon-wrapper { width: 80px; height: 80px; background: #dcfce7; color: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; }
          h1 { font-size: 1.75rem; font-weight: 800; color: #0d2331; margin-bottom: 1rem; }
          p { color: #64748b; margin-bottom: 2.5rem; line-height: 1.6; }
          .success-actions { display: flex; flex-direction: column; gap: 1rem; }
          .btn-primary { background: #3b82f6; color: white; border: none; padding: 1rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
          .btn-outline { background: white; color: #3b82f6; border: 2px solid #3b82f6; padding: 1rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="add-officer-container">
      <header className="page-header">
        <button className="btn-back" onClick={() => navigate(-1)}><ChevronLeft size={20} /> Back</button>
        <h1>Add New Officer</h1>
        <p>Create an account for a new Security or Front Desk Officer</p>
      </header>

      <form className="add-officer-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-with-icon"><User size={18} /><input type="text" placeholder="e.g. Officer James Wilson" required /></div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon"><Mail size={18} /><input type="email" placeholder="james@security.com" required /></div>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-with-dial-code">
                <select className="dial-code"><option>+234</option><option>+1</option><option>+44</option></select>
                <input type="tel" placeholder="814 609 2019" required />
              </div>
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select required><option value="">Select Gender</option><option>Male</option><option>Female</option></select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Employment Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Officer Type</label>
              <div className="input-with-icon"><Shield size={18} />
                <select required><option value="">Select Type</option><option>Security Officer</option><option>Front Desk Officer</option></select>
              </div>
            </div>
            <div className="form-group">
              <label>Badge Number / ID</label>
              <input type="text" placeholder="e.g. SEC001" required />
            </div>
            <div className="form-group">
              <label>Shift Assignment</label>
              <div className="input-with-icon"><Clock size={18} />
                <select required><option value="">Select Shift</option><option>Morning (6AM - 2PM)</option><option>Afternoon (2PM - 10PM)</option><option>Night (10PM - 6AM)</option></select>
              </div>
            </div>
            <div className="form-group">
              <label>Joining Date</label>
              <input type="date" required />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn-submit">Add Officer</button>
        </div>
      </form>

      <style jsx>{`
        .add-officer-container { padding: 2rem; max-width: 900px; margin: 0 auto; }
        .page-header { margin-bottom: 2.5rem; }
        .btn-back { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; color: #64748b; font-weight: 600; cursor: pointer; padding: 0; margin-bottom: 1rem; }
        h1 { font-size: 2rem; font-weight: 800; color: #0d2331; margin: 0 0 0.5rem; }
        .page-header p { color: #64748b; margin: 0; }
        .add-officer-form { display: flex; flex-direction: column; gap: 2rem; }
        .form-section { background: white; padding: 2rem; border-radius: 20px; border: 1px solid #e2e8f0; }
        .form-section h3 { font-size: 1.125rem; font-weight: 700; color: #0d2331; margin: 0 0 1.5rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .form-group label { font-size: 0.875rem; font-weight: 600; color: #0d2331; }
        .input-with-icon { position: relative; }
        .input-with-icon svg { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .input-with-icon input, .input-with-icon select { padding-left: 3rem; }
        .input-with-dial-code { display: flex; gap: 0.5rem; }
        .dial-code { width: 100px; flex-shrink: 0; }
        input, select { width: 100%; padding: 0.875rem 1rem; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 0.95rem; transition: all 0.2s; box-sizing: border-box; }
        input:focus, select:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
        .form-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
        .btn-cancel { padding: 1rem 2rem; border: 1px solid #e2e8f0; border-radius: 12px; font-weight: 700; background: white; cursor: pointer; color: #64748b; }
        .btn-submit { padding: 1rem 3rem; border: none; border-radius: 12px; font-weight: 700; background: #3b82f6; cursor: pointer; color: white; }
        .btn-submit:hover { background: #2563eb; }
        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; }
          .form-actions { flex-direction: column; }
          .btn-submit, .btn-cancel { width: 100%; }
          .add-officer-container { padding: 1.5rem; }
          h1 { font-size: 1.5rem; }
          .form-section { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default AddOfficer;
