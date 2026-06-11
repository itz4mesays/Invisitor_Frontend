import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Users, Calendar, Clock, User, Shield,
  CheckCircle, Share2, Copy, Briefcase
} from 'lucide-react';

const EXISTING_VISITORS = [
  { name: 'David Awolowo', phone: '8146092019', email: 'david@example.com', gender: 'Male', company: 'Tech Inc', idDocument: 'Passport', idNumber: 'A12345678' },
  { name: 'Alison Ogaga', phone: '8031234567', email: 'alison@clinic.com', gender: 'Female', company: 'HealthCorp', idDocument: 'National ID', idNumber: 'NIN987654' },
  { name: 'Victoria Salisu', phone: '7089991122', email: 'vic.s@gmail.com', gender: 'Female', company: 'Designers LLC', idDocument: 'Driver\'s License', idNumber: 'DL334455' },
  { name: 'John Smith', phone: '9012345678', email: 'john.smith@acme.com', gender: 'Male', company: 'Acme Corp', idDocument: 'Passport', idNumber: 'P0987654' }
];

const AddAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.split('/')[1];

  const [isSuccess, setIsSuccess] = useState(false);
  const [inviteCode] = useState(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return 'INV-' + Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  });

  const [form, setForm] = useState({
    visitorName: '',
    gender: 'Male',
    dob: '',
    phone: '',
    phoneCode: '+234',
    email: '',
    company: '',
    idDocument: '',
    idNumber: '',
    purpose: 'Business Meeting',
    hostName: '',
    appointmentDate: '',
    arrivalTime: '',
    duration: '30 Minutes',
    autoApprove: false,
  });

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredVisitors, setFilteredVisitors] = useState([]);

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setForm(prev => ({ ...prev, visitorName: val }));
    
    if (val.trim().length > 0) {
      const filtered = EXISTING_VISITORS.filter(v => 
        v.name.toLowerCase().includes(val.toLowerCase())
      );
      setFilteredVisitors(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectVisitor = (visitor) => {
    setForm(prev => ({
      ...prev,
      visitorName: visitor.name,
      phone: visitor.phone || '',
      email: visitor.email || '',
      gender: visitor.gender || 'Male',
      company: visitor.company || '',
      idDocument: visitor.idDocument || '',
      idNumber: visitor.idNumber || ''
    }));
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const backPath = `/${role}/appointments`;

  if (isSuccess) {
    return (
      <div className="aa-success-page">
        <motion.div
          className="aa-success-card"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="aa-success-icon">
            <CheckCircle size={64} />
          </div>
          <h2>Appointment Created!</h2>
          <p>The appointment has been scheduled and an invitation code has been generated.</p>

          <div className="aa-invite-box">
            <span className="aa-invite-label">Invitation Code</span>
            <span className="aa-invite-code">{inviteCode}</span>
            <p className="aa-invite-hint">Share this code with the visitor for gate entry</p>
          </div>

          <div className="aa-success-actions">
            <button className="aa-btn-share">
              <Share2 size={18} /> Share Code
            </button>
            <button className="aa-btn-copy" onClick={() => navigator.clipboard?.writeText(inviteCode)}>
              <Copy size={18} /> Copy Code
            </button>
          </div>

          <button className="aa-btn-back-link" onClick={() => navigate(backPath)}>
            ← Back to Appointments
          </button>
        </motion.div>

        <style jsx>{`
          .aa-success-page { display: flex; align-items: center; justify-content: center; min-height: 60vh; padding: 2rem; }
          .aa-success-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 24px; padding: 3rem; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
          .aa-success-icon { color: var(--text-success); display: flex; justify-content: center; margin-bottom: 1.5rem; }
          .aa-success-card h2 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.75rem; }
          .aa-success-card p { color: var(--text-tertiary); font-size: 0.9375rem; line-height: 1.5; margin: 0 0 2rem; }
          .aa-invite-box { background: linear-gradient(135deg, var(--bg-brand), var(--bg-brand-hover)); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; }
          .aa-invite-label { display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-quaternary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
          .aa-invite-code { display: block; font-size: 2rem; font-weight: 800; color: var(--text-inverse); letter-spacing: 4px; margin-bottom: 0.5rem; }
          .aa-invite-hint { font-size: 0.8125rem; color: var(--text-quaternary); margin: 0; }
          .aa-success-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.5rem; }
          .aa-btn-share { background: var(--bg-brand); color: var(--text-inverse); border: none; padding: 0.875rem; border-radius: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; }
          .aa-btn-copy { background: var(--bg-surface); border: 1.5px solid var(--border-default); color: var(--bg-brand); padding: 0.875rem; border-radius: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; }
          .aa-btn-back-link { background: none; border: none; color: var(--text-tertiary); font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: color 0.2s; }
          .aa-btn-back-link:hover { color: var(--bg-brand); }
        `}</style>
      </div>
    );
  }

  return (
    <div className="aa-page">
      <div className="aa-header">
        <button className="aa-back-btn" onClick={() => navigate(backPath)}>
          <ArrowLeft size={16} /> Back to Appointments
        </button>
        <div>
          <h1>Add An Appointment</h1>
          <p>Create an appointment by filling in the visitor and scheduling details below.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="aa-form">
        {/* Visitor Details */}
        <section className="aa-section">
          <div className="aa-section-title">
            <div className="aa-section-icon"><Users size={20} /></div>
            <div>
              <h2>Visitor Details</h2>
              <p>Enter information about the visitor</p>
            </div>
          </div>

          <div className="aa-grid">
            <div className="aa-field aa-autocomplete-wrapper">
              <label>VISITOR NAME <span className="aa-required">*</span></label>
              <input 
                type="text" 
                placeholder="Enter visitor name..." 
                value={form.visitorName} 
                onChange={handleNameChange}
                onFocus={() => {
                  if (form.visitorName && filteredVisitors.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                required 
                autoComplete="off"
              />
              
              {showSuggestions && filteredVisitors.length > 0 && (
                <div className="aa-suggestions-dropdown">
                  {filteredVisitors.map((v, i) => (
                    <div key={i} className="aa-suggestion-item" onClick={() => handleSelectVisitor(v)}>
                      <strong>{v.name}</strong>
                      <span className="aa-suggestion-meta">{v.phone} • {v.company || 'No Company'}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="aa-field">
              <label>GENDER <span className="aa-optional">(Optional)</span></label>
              <select value={form.gender} onChange={handleChange('gender')}>
                <option>Male</option>
                <option>Female</option>
                <option>Prefer not to say</option>
              </select>
            </div>

            <div className="aa-field">
              <label>DATE OF BIRTH <span className="aa-optional">(Optional)</span></label>
              <div className="aa-input-icon">
                <input type="date" value={form.dob} onChange={handleChange('dob')} />
                <Calendar size={18} className="aa-icon" />
              </div>
            </div>
            <div className="aa-field">
              <label>PHONE NUMBER <span className="aa-required">*</span></label>
              <div className="aa-phone-row">
                <select value={form.phoneCode} onChange={handleChange('phoneCode')} className="aa-phone-code">
                  <option>+234</option>
                  <option>+1</option>
                  <option>+44</option>
                  <option>+27</option>
                </select>
                <input type="tel" placeholder="814 609 2019" value={form.phone} onChange={handleChange('phone')} required />
              </div>
            </div>

            <div className="aa-field">
              <label>EMAIL ADDRESS</label>
              <input type="email" placeholder="visitor@email.com" value={form.email} onChange={handleChange('email')} />
            </div>
            <div className="aa-field">
              <label>COMPANY NAME <span className="aa-optional">(Optional)</span></label>
              <input type="text" placeholder="e.g. Acme Corp" value={form.company} onChange={handleChange('company')} />
            </div>

            <div className="aa-field">
              <label>IDENTIFICATION DOCUMENT <span className="aa-required">*</span></label>
              <select value={form.idDocument} onChange={handleChange('idDocument')} required>
                <option value="">Select document type...</option>
                <option value="Passport">Passport</option>
                <option value="Driver's License">Driver's License</option>
                <option value="National ID">National ID Card</option>
              </select>
            </div>
            <div className="aa-field">
              <label>ID NUMBER <span className="aa-required">*</span></label>
              <input type="text" placeholder="e.g. A12345678" value={form.idNumber} onChange={handleChange('idNumber')} required />
            </div>
          </div>
        </section>

        {/* Appointment Details */}
        <section className="aa-section">
          <div className="aa-section-title">
            <div className="aa-section-icon aa-section-icon--blue"><Calendar size={20} /></div>
            <div>
              <h2>Appointment Details</h2>
              <p>Schedule the visit date, time and purpose</p>
            </div>
          </div>

          <div className="aa-grid">
            <div className="aa-field">
              <label>VISIT PURPOSE <span className="aa-required">*</span></label>
              <select value={form.purpose} onChange={handleChange('purpose')} required>
                <option value="Business Meeting">Business Meeting</option>
                <option value="Social Visit">Social Visit</option>
                <option value="Medical Visit">Medical Visit</option>
                <option value="Family Visit">Family Visit</option>
                <option value="Package Delivery">Package Delivery</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Interview">Interview</option>
              </select>
            </div>
            <div className="aa-field">
              <label>HOST NAME <span className="aa-required">*</span></label>
              <select value={form.hostName} onChange={handleChange('hostName')} required>
                <option value="">Select host...</option>
                <option value="Harvey Specter">Harvey Specter</option>
                <option value="John Smith">John Smith</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
              </select>
            </div>

            <div className="aa-field">
              <label>APPOINTMENT DATE <span className="aa-required">*</span></label>
              <div className="aa-input-icon">
                <input type="date" value={form.appointmentDate} onChange={handleChange('appointmentDate')} required />
                <Calendar size={18} className="aa-icon" />
              </div>
            </div>
            <div className="aa-field">
              <label>ARRIVAL TIME <span className="aa-required">*</span></label>
              <div className="aa-input-icon">
                <input type="time" value={form.arrivalTime} onChange={handleChange('arrivalTime')} required />
                <Clock size={18} className="aa-icon" />
              </div>
            </div>

            <div className="aa-field">
              <label>DURATION</label>
              <select value={form.duration} onChange={handleChange('duration')}>
                <option>15 Minutes</option>
                <option>30 Minutes</option>
                <option>1 Hour</option>
                <option>2 Hours</option>
                <option>Half Day</option>
                <option>Full Day</option>
              </select>
            </div>
          </div>
        </section>

        {['resident', 'host', 'frontdesk'].includes(role) && (
          <section className="aa-section" style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Auto-Approve Entry</h3>
              <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-quaternary)' }}>Skip gate confirmation when this visitor arrives.</p>
            </div>
            <button
              type="button"
              className={`aa-toggle-btn ${form.autoApprove ? 'on' : 'off'}`}
              onClick={() => setForm(prev => ({ ...prev, autoApprove: !prev.autoApprove }))}
            >
              <span className="aa-toggle-knob" />
            </button>
          </section>
        )}

        <div className="aa-actions">
          <button type="submit" className="aa-btn-submit">
            Create Appointment
          </button>
          <button type="button" className="aa-btn-cancel" onClick={() => navigate(backPath)}>
            Cancel
          </button>
        </div>
      </form>

      <style jsx>{`
        .aa-page { max-width: 860px; margin: 0 auto; padding-bottom: 4rem; }
        .aa-header { margin-bottom: 2rem; }
        .aa-back-btn { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; color: var(--text-tertiary); font-weight: 600; font-size: 0.875rem; cursor: pointer; padding: 0; margin-bottom: 1rem; transition: color 0.2s; }
        .aa-back-btn:hover { color: var(--bg-brand); }
        .aa-header h1 { font-size: 2rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.5rem; }
        .aa-header p { color: var(--text-tertiary); margin: 0; font-size: 0.9375rem; }

        .aa-form { display: flex; flex-direction: column; gap: 1.5rem; }

        .aa-section { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 2rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .aa-section-title { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--bg-muted); }
        .aa-section-icon { width: 48px; height: 48px; background: var(--bg-muted); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--bg-brand); flex-shrink: 0; }
        .aa-section-icon--blue { background: #eff6ff; color: var(--accent-primary); }
        .aa-section-title h2 { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.25rem; }
        .aa-section-title p { font-size: 0.8125rem; color: var(--text-quaternary); margin: 0; font-weight: 500; }

        .aa-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 2rem; }
        .aa-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .aa-field label { font-size: 0.6875rem; font-weight: 800; color: var(--text-quaternary); text-transform: uppercase; letter-spacing: 0.06em; }
        .aa-required { color: var(--text-danger); }
        .aa-optional { color: var(--border-heavy); font-weight: 600; text-transform: none; letter-spacing: 0; font-size: 0.6875rem; }
        .aa-field input, .aa-field select {
          width: 100%; padding: 0.875rem 1rem; border: 1.5px solid var(--border-default); border-radius: 12px;
          font-size: 0.9375rem; color: var(--text-primary); font-weight: 500; background: var(--bg-surface);
          transition: all 0.2s; outline: none; box-sizing: border-box;
        }
        .aa-field input:focus, .aa-field select:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(0,163,255,0.1); }
        .aa-input-icon { position: relative; }
        .aa-input-icon input { padding-right: 3rem; }
        .aa-icon { position: absolute; right: 1rem; top: 50%; transform: translateY(-50%); color: var(--text-quaternary); pointer-events: none; }
        .aa-phone-row { display: flex; gap: 0.5rem; }
        .aa-field .aa-phone-code { width: 100px; flex-shrink: 0; }
        .aa-field .aa-phone-row input { flex: 1; min-width: 0; }

        .aa-autocomplete-wrapper { position: relative; }
        .aa-suggestions-dropdown { position: absolute; top: 100%; left: 0; right: 0; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 12px; margin-top: 4px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 10; max-height: 250px; overflow-y: auto; }
        .aa-suggestion-item { padding: 0.75rem 1rem; cursor: pointer; transition: background 0.2s; display: flex; flex-direction: column; gap: 2px; }
        .aa-suggestion-item:hover { background: var(--bg-subtle); }
        .aa-suggestion-item strong { font-size: 0.875rem; color: var(--text-primary); }
        .aa-suggestion-meta { font-size: 0.75rem; color: var(--text-quaternary); }

        .aa-actions { display: flex; gap: 1rem; justify-content: flex-end; padding-top: 0.5rem; }
        .aa-btn-submit { background: var(--bg-brand); color: var(--text-inverse); border: none; padding: 1rem 2.5rem; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: background 0.2s; }
        .aa-btn-submit:hover { background: var(--bg-brand-hover); }
        .aa-btn-cancel { background: var(--bg-surface); border: 1.5px solid var(--border-default); color: var(--text-secondary); padding: 1rem 2rem; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: all 0.2s; }
        .aa-btn-cancel:hover { background: var(--bg-subtle); border-color: var(--border-heavy); }

        .aa-toggle-btn { width: 44px; height: 24px; border-radius: 12px; border: none; position: relative; cursor: pointer; transition: background 0.3s; }
        .aa-toggle-btn.off { background: var(--border-heavy); }
        .aa-toggle-btn.on { background: var(--bg-brand); }
        .aa-toggle-knob { width: 20px; height: 20px; background: white; border-radius: 50%; position: absolute; top: 2px; transition: transform 0.3s; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .aa-toggle-btn.off .aa-toggle-knob { transform: translateX(2px); }
        .aa-toggle-btn.on .aa-toggle-knob { transform: translateX(22px); }

        @media (max-width: 640px) {
          .aa-grid { grid-template-columns: 1fr; }
          .aa-actions { flex-direction: column; }
          .aa-btn-submit, .aa-btn-cancel { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default AddAppointment;
