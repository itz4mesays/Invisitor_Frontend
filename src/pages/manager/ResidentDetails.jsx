import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Home, ShieldAlert, Calendar, History, Edit3, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResidentDetails = () => {
  const { residentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isEditing, setIsEditing] = useState(false);

  const [resident, setResident] = useState({
    id: residentId, name: 'John Smith', email: 'john@email.com',
    phone: '801 234 5678', dialCode: '+234', unit: 'Block A, Apt 101',
    streetNumber: '15', houseAddress: '15, Maple Street, Estate Phase 1',
    type: 'Tenant', occupancyStatus: 'occupying', moveInDate: '2023-05-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    emergencyContactName: 'Jane Smith', emergencyContactPhone: '802 345 6789', emergencyContactDialCode: '+234'
  });

  const [editForm, setEditForm] = useState({ ...resident });
  const dialCodes = ['+234', '+1', '+44'];

  const appointments = [
    { id: 1, visitor: 'Dr. Alison Ogaga', date: '2024-11-20', time: '2:00 PM', purpose: 'Medical Visit', status: 'scheduled' },
    { id: 2, visitor: 'Mr. James Wilson', date: '2024-11-18', time: '3:00 PM', purpose: 'Business Meeting', status: 'completed' },
    { id: 3, visitor: 'Ms. Sarah Connor', date: '2024-11-10', time: '11:00 AM', purpose: 'Social Visit', status: 'completed' },
  ];

  const activityLogs = [
    { id: 1, date: '2024-11-18', action: 'Created Appointment', details: 'Dr. Smith - Medical Visit', time: '10:30 AM' },
    { id: 2, date: '2024-11-15', action: 'Created Visitor', details: 'John Visitor - Family', time: '03:00 PM' },
    { id: 3, date: '2024-11-10', action: 'Payment Made', details: 'November Rent', time: '09:00 AM' },
  ];

  const handleSave = () => { setResident(editForm); setIsEditing(false); };

  const Field = ({ label, value, edit }) => (
    <div className="rd-info-item">
      <label>{label}</label>
      {isEditing ? edit : <p>{value}</p>}
    </div>
  );

  return (
    <div className="rd-page">
      <header className="rd-header">
        <button className="rd-back" onClick={() => navigate(-1)}><ChevronLeft size={20} /> Back to Residents</button>
        <div className="rd-header-main">
          <div className="rd-profile-summary">
            <img src={resident.avatar} alt={resident.name} className="rd-avatar" />
            <div className="rd-summary-text">
              <h1>{resident.name}</h1>
              <div className="rd-badge-row">
                <span className={`rd-status-badge ${resident.occupancyStatus}`}>{resident.occupancyStatus}</span>
                <span className="rd-type-badge">{resident.type}</span>
              </div>
            </div>
          </div>
          <div className="rd-header-actions">
            {!isEditing ? (
              <button className="rd-btn-edit" onClick={() => setIsEditing(true)}><Edit3 size={18} /> Edit Profile</button>
            ) : (
              <div className="rd-edit-actions">
                <button className="rd-btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                <button className="rd-btn-save" onClick={handleSave}><Save size={18} /> Save Changes</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="rd-container">
        <nav className="rd-tabs">
          {['Overview', 'Appointments', 'Activity Logs'].map(tab => (
            <button key={tab} className={`rd-tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab === 'Overview' && <User size={16} />}
              {tab === 'Appointments' && <Calendar size={16} />}
              {tab === 'Activity Logs' && <History size={16} />}
              {tab}
            </button>
          ))}
        </nav>

        <div className="rd-tab-content">
          <AnimatePresence mode="wait">
            {activeTab === 'Overview' && (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="rd-overview-grid">
                <div className="rd-info-section">
                  <div className="rd-section-title"><User size={18} /><h3>Personal Information</h3></div>
                  <div className="rd-display-grid">
                    <Field label="Full Name" value={resident.name} edit={<input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />} />
                    <Field label="Email" value={resident.email} edit={<input value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />} />
                    <Field label="Phone" value={`${resident.dialCode} ${resident.phone}`} edit={
                      <div style={{ display: 'flex', gap: 6 }}>
                        <select value={editForm.dialCode} onChange={e => setEditForm({...editForm, dialCode: e.target.value})} style={{ width: 80 }}>{dialCodes.map(d => <option key={d}>{d}</option>)}</select>
                        <input value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} />
                      </div>
                    } />
                    <Field label="Type" value={resident.type} edit={
                      <select value={editForm.type} onChange={e => setEditForm({...editForm, type: e.target.value})}><option>Tenant</option><option>Property Owner</option></select>
                    } />
                  </div>
                </div>
                <div className="rd-info-section">
                  <div className="rd-section-title"><Home size={18} /><h3>Address Details</h3></div>
                  <div className="rd-display-grid">
                    <Field label="Unit" value={resident.unit} edit={<input value={editForm.unit} onChange={e => setEditForm({...editForm, unit: e.target.value})} />} />
                    <Field label="Street Number" value={resident.streetNumber} edit={<input value={editForm.streetNumber} onChange={e => setEditForm({...editForm, streetNumber: e.target.value})} />} />
                    <Field label="House Address" value={resident.houseAddress} edit={<input value={editForm.houseAddress} onChange={e => setEditForm({...editForm, houseAddress: e.target.value})} />} />
                    <Field label="Move-In Date" value={resident.moveInDate} edit={<input type="date" value={editForm.moveInDate} onChange={e => setEditForm({...editForm, moveInDate: e.target.value})} />} />
                  </div>
                </div>
                <div className="rd-info-section rd-full-width">
                  <div className="rd-section-title"><ShieldAlert size={18} /><h3>Emergency Contact</h3></div>
                  <div className="rd-display-grid">
                    <Field label="Contact Name" value={resident.emergencyContactName} edit={<input value={editForm.emergencyContactName} onChange={e => setEditForm({...editForm, emergencyContactName: e.target.value})} />} />
                    <Field label="Contact Phone" value={`${resident.emergencyContactDialCode} ${resident.emergencyContactPhone}`} edit={
                      <div style={{ display: 'flex', gap: 6 }}>
                        <select value={editForm.emergencyContactDialCode} onChange={e => setEditForm({...editForm, emergencyContactDialCode: e.target.value})} style={{ width: 80 }}>{dialCodes.map(d => <option key={d}>{d}</option>)}</select>
                        <input value={editForm.emergencyContactPhone} onChange={e => setEditForm({...editForm, emergencyContactPhone: e.target.value})} />
                      </div>
                    } />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'Appointments' && (
              <motion.div key="appts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ overflowX: 'auto' }}>
                  <table className="rd-table">
                    <thead><tr><th>Visitor</th><th>Purpose</th><th>Date & Time</th><th>Status</th></tr></thead>
                    <tbody>
                      {appointments.map(a => (
                        <tr key={a.id}>
                          <td><strong>{a.visitor}</strong></td>
                          <td>{a.purpose}</td>
                          <td><div>{a.date}</div><small>{a.time}</small></td>
                          <td><span className={`rd-status-mini ${a.status}`}>{a.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'Activity Logs' && (
              <motion.div key="logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="rd-timeline">
                  {activityLogs.map(log => (
                    <div key={log.id} className="rd-timeline-item">
                      <div className="rd-marker" />
                      <div className="rd-log-content">
                        <div className="rd-log-header">
                          <h4>{log.action}</h4>
                          <span>{log.date} at {log.time}</span>
                        </div>
                        <p>{log.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .rd-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; max-width: 1100px; margin: 0 auto; padding: 1.5rem; }
        .rd-back { background: none; border: none; color: var(--text-tertiary); font-weight: 600; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; margin-bottom: 1rem; padding: 0; }
        .rd-header-main { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .rd-profile-summary { display: flex; align-items: center; gap: 1.25rem; }
        .rd-avatar { width: 80px; height: 80px; border-radius: 50%; border: 4px solid var(--bg-surface); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .rd-summary-text h1 { font-size: 1.5rem; font-weight: 800; color: var(--bg-brand); margin: 0 0 0.5rem; }
        .rd-badge-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .rd-status-badge { padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: capitalize; }
        .rd-status-badge.occupying { background: var(--bg-success-subtle); color: #166534; }
        .rd-type-badge { background: var(--bg-muted); color: var(--text-secondary); padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; }
        .rd-btn-edit { background: var(--bg-brand); color: var(--text-inverse); border: none; padding: 0.75rem 1.5rem; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
        .rd-edit-actions { display: flex; gap: 0.75rem; }
        .rd-btn-cancel { background: var(--bg-surface); border: 1.5px solid var(--border-default); padding: 0.75rem 1.5rem; border-radius: 12px; font-weight: 700; color: var(--text-tertiary); cursor: pointer; }
        .rd-btn-save { background: var(--text-success); color: var(--text-inverse); border: none; padding: 0.75rem 1.5rem; border-radius: 12px; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
        .rd-container { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 24px; overflow: hidden; }
        .rd-tabs { display: flex; gap: 2rem; padding: 0 2rem; border-bottom: 1px solid var(--bg-muted); background: var(--bg-subtle); overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .rd-tab-btn { background: none; border: none; padding: 1.25rem 0; font-weight: 700; color: var(--text-quaternary); cursor: pointer; position: relative; display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; }
        .rd-tab-btn.active { color: var(--bg-brand); }
        .rd-tab-btn.active::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: var(--bg-brand); border-radius: 3px 3px 0 0; }
        .rd-tab-content { padding: 2rem; }
        .rd-overview-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .rd-full-width { grid-column: span 2; }
        .rd-info-section { background: var(--bg-subtle); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--bg-muted); }
        .rd-section-title { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem; color: var(--bg-brand); }
        .rd-section-title h3 { font-size: 0.9375rem; font-weight: 700; margin: 0; }
        .rd-display-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .rd-info-item label { display: block; font-size: 0.65rem; font-weight: 800; color: var(--text-quaternary); text-transform: uppercase; margin-bottom: 0.25rem; }
        .rd-info-item p { font-size: 0.9375rem; font-weight: 600; color: var(--text-primary); margin: 0; }
        .rd-info-item input, .rd-info-item select { width: 100%; padding: 0.625rem; border: 1.5px solid var(--border-default); border-radius: 8px; font-size: 0.875rem; outline: none; box-sizing: border-box; }
        .rd-table { width: 100%; border-collapse: collapse; min-width: 480px; }
        .rd-table th { text-align: left; padding: 0.875rem 1rem; font-size: 0.75rem; font-weight: 700; color: var(--text-quaternary); text-transform: uppercase; border-bottom: 1px solid var(--bg-muted); }
        .rd-table td { padding: 1rem; font-size: 0.875rem; border-bottom: 1px solid var(--bg-subtle); }
        .rd-status-mini { padding: 3px 10px; border-radius: 12px; font-size: 0.7rem; font-weight: 700; text-transform: capitalize; }
        .rd-status-mini.scheduled { background: #e0f2fe; color: #0369a1; }
        .rd-status-mini.completed { background: var(--bg-success-subtle); color: #166534; }
        .rd-timeline { position: relative; padding-left: 2rem; }
        .rd-timeline::before { content: ''; position: absolute; left: 7px; top: 0; bottom: 0; width: 2px; background: var(--bg-muted); }
        .rd-timeline-item { position: relative; margin-bottom: 2rem; }
        .rd-marker { position: absolute; left: -1.875rem; top: 0.25rem; width: 12px; height: 12px; border-radius: 50%; background: var(--bg-brand); border: 3px solid var(--bg-surface); box-shadow: 0 0 0 3px var(--bg-muted); }
        .rd-log-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem; flex-wrap: wrap; gap: 0.25rem; }
        .rd-log-header h4 { font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin: 0; }
        .rd-log-header span { font-size: 0.75rem; color: var(--text-quaternary); }
        .rd-log-content p { font-size: 0.875rem; color: var(--text-tertiary); margin: 0; }
        @media (max-width: 768px) {
          .rd-page { padding: 1rem; }
          .rd-header-main { flex-direction: column; align-items: flex-start; }
          .rd-profile-summary { flex-direction: column; align-items: flex-start; }
          .rd-header-actions { width: 100%; }
          .rd-btn-edit, .rd-edit-actions { width: 100%; }
          .rd-edit-actions { flex-direction: column; }
          .rd-btn-save, .rd-btn-cancel { width: 100%; justify-content: center; }
          .rd-tabs { gap: 1rem; padding: 0 1rem; }
          .rd-tab-content { padding: 1.25rem 1rem; }
          .rd-overview-grid { grid-template-columns: 1fr; }
          .rd-full-width { grid-column: span 1; }
          .rd-display-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default ResidentDetails;
