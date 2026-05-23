import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, User, Shield, Phone, Mail, Calendar, List, Edit, Save, X, CheckCircle, Ban } from 'lucide-react';

const VISITOR_DATA = {
  '1': { id: '1', name: 'Elizabeth Ateli', type: 'Contractor', doc: 'Passport', docNumber: '56398897654', phone: '0814 609 2019', email: 'oyinbopepper@outlook.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElizabethA', gender: 'Female', dob: '1990-06-15', company: 'Acme Corps', purpose: 'Plumbing Services', hostName: 'John Smith', backgroundCheck: 'Passed', status: 'Active' },
  '2': { id: '2', name: 'Victoria Salisu', type: 'Contractor', doc: "Driver's License", docNumber: '78901234567', phone: '0814 609 2019', email: 'landonc@yandex.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victoria', gender: 'Female', dob: '1988-11-22', company: 'BuildRight Ltd', purpose: 'Construction Inspection', hostName: 'Sarah Johnson', backgroundCheck: 'Passed', status: 'Active' },
};

const TRACKING_DATA = [
  { date: '12th July, 2025', checkIn: '09:00 AM', checkOut: '05:00 PM', duration: '8h 0m', status: 'Completed', gate: 'Main Gate' },
  { date: '11th July, 2025', checkIn: '08:45 AM', checkOut: '04:30 PM', duration: '7h 45m', status: 'Completed', gate: 'West Gate' },
  { date: '10th July, 2025', checkIn: '09:15 AM', checkOut: '05:15 PM', duration: '8h 0m', status: 'Completed', gate: 'Main Gate' },
];

const VisitorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Fallback to first visitor if id not found
  const raw = VISITOR_DATA[id] || VISITOR_DATA['1'];
  const [visitor, setVisitor] = useState(raw);
  const [activeTab, setActiveTab] = useState('Profile');
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...raw });
  const [showBlacklist, setShowBlacklist] = useState(false);
  const [isBlacklisted, setIsBlacklisted] = useState(false);

  const handleSave = () => {
    setVisitor(form);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({ ...visitor });
    setIsEditing(false);
  };

  const handleBlacklist = () => {
    setIsBlacklisted(!isBlacklisted);
    setShowBlacklist(false);
  };

  return (
    <div className="vd-page">
      {/* Header */}
      <div className="vd-topbar">
        <button className="vd-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to Visitors
        </button>
        <div className="vd-topbar-actions">
          <button
            className={`vd-btn-blacklist ${isBlacklisted ? 'whitelisted' : ''}`}
            onClick={() => setShowBlacklist(true)}
          >
            <Ban size={16} />
            {isBlacklisted ? 'Whitelist Visitor' : 'Blacklist Visitor'}
          </button>
          {!isEditing ? (
            <button className="vd-btn-edit" onClick={() => setIsEditing(true)}>
              <Edit size={16} /> Edit Profile
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="vd-btn-save" onClick={handleSave}><Save size={16} /> Save Changes</button>
              <button className="vd-btn-cancel" onClick={handleCancel}><X size={16} /> Cancel</button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Hero */}
      <div className="vd-hero">
        <div className="vd-hero-avatar">
          <img src={visitor.avatar} alt={visitor.name} />
          {isBlacklisted && <div className="vd-blacklist-badge"><Ban size={14} /> Blacklisted</div>}
        </div>
        <div className="vd-hero-info">
          <h1>{visitor.name}</h1>
          <div className="vd-hero-meta">
            <span className="vd-type-pill">{visitor.type}</span>
            <span className="vd-bg-pill" style={{ background: visitor.backgroundCheck === 'Passed' ? '#f0fdf4' : '#fffbeb', color: visitor.backgroundCheck === 'Passed' ? '#16a34a' : '#d97706' }}>
              <CheckCircle size={12} /> {visitor.backgroundCheck} Background Check
            </span>
          </div>
          <div className="vd-hero-contacts">
            <span><Phone size={14} /> {visitor.phone}</span>
            <span><Mail size={14} /> {visitor.email}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="vd-tabs">
        {['Profile', 'Activity Log'].map(tab => (
          <button key={tab} className={`vd-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'Profile' ? <User size={16} /> : <List size={16} />} {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {activeTab === 'Profile' ? (
            <div className="vd-sections">
              {/* Personal Info */}
              <section className="vd-card">
                <h3><User size={16} /> Personal Information</h3>
                <div className="vd-form-grid">
                  <div className="vd-field">
                    <label>Full Name</label>
                    {isEditing ? <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /> : <div className="vd-val">{visitor.name}</div>}
                  </div>
                  <div className="vd-field">
                    <label>Email Address</label>
                    {isEditing ? <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} /> : <div className="vd-val">{visitor.email}</div>}
                  </div>
                  <div className="vd-field">
                    <label>Phone Number</label>
                    {isEditing ? <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} /> : <div className="vd-val">{visitor.phone}</div>}
                  </div>
                  <div className="vd-field">
                    <label>Gender</label>
                    {isEditing ? (
                      <select value={form.gender} onChange={e => setForm(p => ({ ...p, gender: e.target.value }))}>
                        <option>Male</option><option>Female</option>
                      </select>
                    ) : <div className="vd-val">{visitor.gender}</div>}
                  </div>
                  <div className="vd-field">
                    <label>Date of Birth</label>
                    {isEditing ? <input type="date" value={form.dob} onChange={e => setForm(p => ({ ...p, dob: e.target.value }))} /> : <div className="vd-val">{visitor.dob}</div>}
                  </div>
                  <div className="vd-field">
                    <label>Company (Optional)</label>
                    {isEditing ? <input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} /> : <div className="vd-val">{visitor.company || '—'}</div>}
                  </div>
                </div>
              </section>

              {/* Visit Details */}
              <section className="vd-card">
                <h3><Calendar size={16} /> Visit Details</h3>
                <div className="vd-form-grid">
                  <div className="vd-field">
                    <label>Visitor Type</label>
                    {isEditing ? (
                      <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                        <option>General Visitor</option><option>Contractor</option><option>VIP</option>
                      </select>
                    ) : <div className="vd-val">{visitor.type}</div>}
                  </div>
                  <div className="vd-field">
                    <label>Host Name</label>
                    {isEditing ? <input value={form.hostName} onChange={e => setForm(p => ({ ...p, hostName: e.target.value }))} /> : <div className="vd-val">{visitor.hostName}</div>}
                  </div>
                  <div className="vd-field" style={{ gridColumn: '1 / -1' }}>
                    <label>Purpose of Visit</label>
                    {isEditing ? <input value={form.purpose} onChange={e => setForm(p => ({ ...p, purpose: e.target.value }))} /> : <div className="vd-val">{visitor.purpose}</div>}
                  </div>
                </div>
              </section>

              {/* ID Document */}
              <section className="vd-card">
                <h3><Shield size={16} /> Identification</h3>
                <div className="vd-form-grid">
                  <div className="vd-field">
                    <label>Document Type</label>
                    {isEditing ? (
                      <select value={form.doc} onChange={e => setForm(p => ({ ...p, doc: e.target.value }))}>
                        <option>Passport</option><option>Driver's License</option><option>National ID</option>
                      </select>
                    ) : <div className="vd-val">{visitor.doc}</div>}
                  </div>
                  <div className="vd-field">
                    <label>ID Number</label>
                    {isEditing ? <input value={form.docNumber} onChange={e => setForm(p => ({ ...p, docNumber: e.target.value }))} /> : <div className="vd-val">{visitor.docNumber}</div>}
                  </div>
                </div>
                <div className="vd-doc-preview">
                  <Shield size={18} color="#00a3ff" />
                  <span>ID CARD.PDF</span>
                  <button className="btn-view-doc">View Document</button>
                </div>
              </section>
            </div>
          ) : (
            <div className="vd-card">
              <h3><List size={16} /> Activity Log</h3>
              <div style={{ overflowX: 'auto' }}>
                <table className="vd-table">
                  <thead>
                    <tr>
                      <th>Date</th><th>Check-in</th><th>Check-out</th><th>Duration</th><th>Status</th><th>Gate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRACKING_DATA.map((log, i) => (
                      <tr key={i}>
                        <td>{log.date}</td>
                        <td style={{ color: '#16a34a', fontWeight: 600 }}>{log.checkIn}</td>
                        <td style={{ color: '#dc2626', fontWeight: 600 }}>{log.checkOut}</td>
                        <td>{log.duration}</td>
                        <td><span className="vd-log-badge">{log.status}</span></td>
                        <td style={{ color: '#64748b' }}>{log.gate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Blacklist Confirmation Modal */}
      <AnimatePresence>
        {showBlacklist && (
          <div className="vd-overlay" onClick={() => setShowBlacklist(false)}>
            <motion.div className="vd-confirm-modal" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
              <div className="vd-modal-icon" style={{ background: isBlacklisted ? '#dcfce7' : '#fee2e2', color: isBlacklisted ? '#16a34a' : '#ef4444' }}>
                <Ban size={32} />
              </div>
              <h3>{isBlacklisted ? 'Whitelist This Visitor?' : 'Blacklist This Visitor?'}</h3>
              <p>{isBlacklisted ? `${visitor.name} will be restored to active and allowed entry.` : `${visitor.name} will be denied entry to the estate. This can be reversed.`}</p>
              <div className="vd-modal-actions">
                <button className={isBlacklisted ? 'btn-confirm-white' : 'btn-confirm-red'} onClick={handleBlacklist}>{isBlacklisted ? 'Yes, Whitelist' : 'Yes, Blacklist'}</button>
                <button className="btn-confirm-outline" onClick={() => setShowBlacklist(false)}>Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .vd-page { max-width: 900px; margin: 0 auto; padding-bottom: 4rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .vd-topbar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .vd-back { display: flex; align-items: center; gap: 0.5rem; background: none; border: none; color: #64748b; font-weight: 600; cursor: pointer; padding: 0; transition: color 0.2s; font-size: 0.9rem; }
        .vd-back:hover { color: #0d2331; }
        .vd-topbar-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .vd-btn-blacklist { display: flex; align-items: center; gap: 0.5rem; border: 1px solid #fca5a5; background: #fef2f2; color: #dc2626; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; transition: all 0.2s; }
        .vd-btn-blacklist.whitelisted { background: #f0fdf4; border-color: #86efac; color: #16a34a; }
        .vd-btn-edit { display: flex; align-items: center; gap: 0.5rem; background: white; border: 1px solid #e2e8f0; color: #0d2331; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; }
        .vd-btn-save { display: flex; align-items: center; gap: 0.5rem; background: #0d2331; border: none; color: white; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; }
        .vd-btn-cancel { display: flex; align-items: center; gap: 0.5rem; background: white; border: 1px solid #e2e8f0; color: #64748b; padding: 0.6rem 1.25rem; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; }

        .vd-hero { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 2rem; display: flex; align-items: flex-start; gap: 2rem; }
        .vd-hero-avatar { position: relative; flex-shrink: 0; }
        .vd-hero-avatar img { width: 100px; height: 100px; border-radius: 50%; border: 4px solid #f1f5f9; box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        .vd-blacklist-badge { position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); background: #dc2626; color: white; font-size: 0.65rem; font-weight: 800; padding: 2px 8px; border-radius: 12px; display: flex; align-items: center; gap: 4px; white-space: nowrap; }
        .vd-hero-info { flex: 1; }
        .vd-hero-info h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin: 0 0 0.75rem 0; }
        .vd-hero-meta { display: flex; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .vd-type-pill { background: #e0f2fe; color: #0369a1; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; }
        .vd-bg-pill { display: flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; }
        .vd-hero-contacts { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .vd-hero-contacts span { display: flex; align-items: center; gap: 0.4rem; font-size: 0.875rem; color: #64748b; font-weight: 500; }

        .vd-tabs { display: flex; gap: 0.5rem; border-bottom: 2px solid #f1f5f9; }
        .vd-tab { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.25rem; background: none; border: none; font-weight: 700; font-size: 0.9rem; color: #64748b; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.2s; }
        .vd-tab.active { color: #0d2331; border-bottom-color: #0d2331; }

        .vd-sections { display: flex; flex-direction: column; gap: 1.5rem; }
        .vd-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.75rem; }
        .vd-card h3 { display: flex; align-items: center; gap: 0.5rem; font-size: 1rem; font-weight: 800; color: #1e293b; margin: 0 0 1.5rem 0; padding-bottom: 1rem; border-bottom: 1px solid #f1f5f9; }
        .vd-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .vd-field { display: flex; flex-direction: column; gap: 0.5rem; }
        .vd-field label { font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
        .vd-val { font-size: 0.95rem; font-weight: 600; color: #1e293b; padding: 0.6rem 0; }
        .vd-field input, .vd-field select { padding: 0.75rem 1rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; color: #1e293b; transition: all 0.2s; }
        .vd-field input:focus, .vd-field select:focus { outline: none; border-color: #00a3ff; box-shadow: 0 0 0 3px rgba(0,163,255,0.1); }

        .vd-doc-preview { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.25rem; background: #f8fafc; border-radius: 12px; margin-top: 1.5rem; }
        .vd-doc-preview span { flex: 1; font-weight: 700; font-size: 0.875rem; color: #1e293b; }
        .btn-view-doc { background: white; border: 1px solid #e2e8f0; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 700; font-size: 0.8125rem; cursor: pointer; color: #0d2331; }

        .vd-table { width: 100%; border-collapse: collapse; min-width: 600px; }
        .vd-table th { padding: 0.875rem; font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; text-align: left; }
        .vd-table td { padding: 1rem 0.875rem; font-size: 0.875rem; color: #334155; border-bottom: 1px solid #f8fafc; }
        .vd-table tbody tr:last-child td { border-bottom: none; }
        .vd-log-badge { background: #f0fdf4; color: #16a34a; padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }

        .vd-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; backdrop-filter: blur(3px); }
        .vd-confirm-modal { background: white; border-radius: 24px; padding: 2.5rem; max-width: 420px; width: 100%; text-align: center; }
        .vd-modal-icon { width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; }
        .vd-confirm-modal h3 { font-size: 1.375rem; font-weight: 800; color: #1e293b; margin: 0 0 0.75rem; }
        .vd-confirm-modal p { color: #64748b; line-height: 1.5; margin: 0 0 2rem; font-size: 0.95rem; }
        .vd-modal-actions { display: flex; flex-direction: column; gap: 0.75rem; }
        .btn-confirm-red { background: #ef4444; color: white; border: none; padding: 0.875rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .btn-confirm-white { background: #22c55e; color: white; border: none; padding: 0.875rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .btn-confirm-outline { background: white; border: 1px solid #e2e8f0; color: #64748b; padding: 0.875rem; border-radius: 12px; font-weight: 700; cursor: pointer; }

        @media (max-width: 768px) {
          .vd-hero { flex-direction: column; align-items: center; text-align: center; }
          .vd-hero-contacts { justify-content: center; }
          .vd-hero-meta { justify-content: center; }
          .vd-form-grid { grid-template-columns: 1fr; }
          .vd-topbar { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
};

export default VisitorDetails;
