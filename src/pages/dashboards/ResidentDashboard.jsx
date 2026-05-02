import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, Clock, ArrowRight, Shield, QrCode, Plus, ChevronRight, Share2, Copy, Check 
} from 'lucide-react';

const ResidentDashboard = () => {
  const navigate = useNavigate();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [copied, setCopied] = useState(false);

  const stats = [
    { label: 'Upcoming Visitors', value: '3', icon: <Users size={20} />, bg: '#eef2ff', color: '#6366f1' },
    { label: 'Past Month Visits', value: '12', icon: <Calendar size={20} />, bg: '#f0fdf4', color: '#16a34a' },
    { label: 'Security Alerts', value: '0', icon: <Shield size={20} />, bg: '#fffbeb', color: '#d97706' },
  ];

  const upcomingAppointments = [
    { id: 'APT-001', code: 'INV-7H2A', visitor: 'Dr. Alison Ogaga', purpose: 'Medical Visit', time: '09:00 AM', status: 'scheduled', date: 'Today' },
    { id: 'APT-002', code: 'INV-3KP9', visitor: 'Mr. James Wilson', purpose: 'Business Meeting', time: '11:30 AM', status: 'scheduled', date: 'Today' },
    { id: 'APT-003', code: 'INV-9LM4', visitor: 'Ms. Sarah Connor', purpose: 'Social Visit', time: '02:00 PM', status: 'scheduled', date: 'Tomorrow' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return { bg: '#dcfce7', color: '#166534' };
      case 'scheduled': return { bg: '#e0f2fe', color: '#0369a1' };
      case 'cancelled': return { bg: '#fef2f2', color: '#dc2626' };
      default: return { bg: '#f1f5f9', color: '#475569' };
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="resd-page">
      <div className="resd-header">
        <div>
          <h1>Welcome, Resident</h1>
          <p>Manage your visitors and view upcoming appointments.</p>
        </div>
        <button className="resd-btn-primary" onClick={() => navigate('/resident/appointments')}>
          <Plus size={18} /> Book Appointment
        </button>
      </div>

      <div className="resd-stats-grid">
        {stats.map((s, i) => (
          <motion.div key={i} className="resd-stat-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="resd-stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div className="resd-stat-info">
              <span className="resd-stat-label">{s.label}</span>
              <span className="resd-stat-value">{s.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="resd-main-grid">
        <div className="resd-recent-appointments">
          <div className="resd-card-header">
            <h3>Your Upcoming Appointments</h3>
            <button className="resd-btn-link" onClick={() => navigate('/resident/appointments')}>View All <ArrowRight size={14} /></button>
          </div>
          <div className="resd-appt-list">
            {upcomingAppointments.length === 0 ? (
              <div className="resd-empty-state">
                <Calendar size={48} className="resd-text-light" />
                <p>No upcoming appointments.</p>
              </div>
            ) : (
              upcomingAppointments.map((apt, i) => {
                const sc = getStatusColor(apt.status);
                return (
                  <div key={i} className="resd-appt-item" onClick={() => setSelectedAppointment(apt)}>
                    <div className="resd-appt-icon"><Clock size={16} /></div>
                    <div className="resd-appt-details">
                      <h4>{apt.visitor}</h4>
                      <p>{apt.purpose}</p>
                    </div>
                    <div className="resd-appt-meta">
                      <span className="resd-appt-time">{apt.date} at {apt.time}</span>
                      <span className="resd-status-pill" style={{ background: sc.bg, color: sc.color }}>{apt.status}</span>
                    </div>
                    <ChevronRight size={16} className="resd-text-gray resd-hide-mobile" />
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="resd-side-panel">
          <div className="resd-invite-box">
            <h3>Quick Invite</h3>
            <p>Send a fast invite code to a guest without booking a full appointment.</p>
            <div className="resd-quick-code">INV-FAST</div>
            <button className="resd-btn-outline" onClick={() => handleCopy('INV-FAST')}>
              {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy Code</>}
            </button>
          </div>
          
          <div className="resd-support-box">
            <h3>Need Help?</h3>
            <p>Contact estate management for any issues or to report a security concern.</p>
            <button className="resd-btn-outline" onClick={() => navigate('/resident/support')}>Contact Support</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedAppointment && (
          <div className="resd-modal-overlay" onClick={() => setSelectedAppointment(null)}>
            <motion.div className="resd-modal" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <button className="resd-modal-close" onClick={() => setSelectedAppointment(null)}>✕</button>
              
              <div className="resd-modal-header">
                <h2>Share Appointment</h2>
                <span className="resd-status-pill" style={{ background: getStatusColor(selectedAppointment.status).bg, color: getStatusColor(selectedAppointment.status).color }}>
                  {selectedAppointment.status.toUpperCase()}
                </span>
              </div>

              <div className="resd-qr-section">
                <div className="resd-qr-box">
                  <QrCode size={100} color="#0d2331" />
                </div>
                <div className="resd-code-display">
                  <p>ENTRY CODE</p>
                  <h3>{selectedAppointment.code}</h3>
                </div>
              </div>

              <div className="resd-details-grid">
                <div className="resd-detail-item">
                  <span>Visitor</span>
                  <strong>{selectedAppointment.visitor}</strong>
                </div>
                <div className="resd-detail-item">
                  <span>Purpose</span>
                  <strong>{selectedAppointment.purpose}</strong>
                </div>
                <div className="resd-detail-item">
                  <span>Date & Time</span>
                  <strong>{selectedAppointment.date} at {selectedAppointment.time}</strong>
                </div>
              </div>
              
              <div className="resd-modal-actions">
                <button className="resd-btn-share"><Share2 size={18} /> Share Invite</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .resd-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .resd-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
        .resd-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin-bottom: 0.25rem; }
        .resd-header p { color: #64748b; font-size: 0.9375rem; }
        .resd-btn-primary { background: #0d2331; color: white; padding: 0.75rem 1.25rem; border-radius: 12px; border: none; font-weight: 700; font-size: 0.875rem; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; white-space: nowrap; }
        .resd-text-gray { color: #94a3b8; }
        .resd-text-light { color: #cbd5e1; }
        
        .resd-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .resd-stat-card { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; display: flex; align-items: center; gap: 1.25rem; }
        .resd-stat-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .resd-stat-info { display: flex; flex-direction: column; gap: 0.25rem; }
        .resd-stat-label { font-size: 0.8125rem; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
        .resd-stat-value { font-size: 1.875rem; font-weight: 800; color: #1e293b; line-height: 1; }

        .resd-main-grid { display: grid; grid-template-columns: 1fr 340px; gap: 1.5rem; }
        .resd-recent-appointments { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; }
        .resd-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .resd-card-header h3 { font-size: 1.125rem; font-weight: 800; color: #1e293b; margin: 0; }
        .resd-btn-link { background: none; border: none; color: #3b82f6; font-weight: 700; font-size: 0.875rem; display: flex; align-items: center; gap: 4px; cursor: pointer; }
        
        .resd-appt-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .resd-appt-item { display: flex; align-items: center; gap: 1rem; padding: 1.25rem; border: 1px solid #f1f5f9; border-radius: 16px; cursor: pointer; transition: all 0.2s; background: #fcfcfd; }
        .resd-appt-item:hover { border-color: #e2e8f0; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.02); transform: translateY(-2px); }
        .resd-appt-icon { width: 40px; height: 40px; background: #f1f5f9; color: #64748b; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .resd-appt-details { flex: 1; }
        .resd-appt-details h4 { font-size: 0.9375rem; font-weight: 800; color: #1e293b; margin: 0 0 2px 0; }
        .resd-appt-details p { font-size: 0.8125rem; color: #64748b; margin: 0; }
        .resd-appt-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
        .resd-appt-time { font-size: 0.75rem; font-weight: 600; color: #94a3b8; }
        .resd-status-pill { font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em; }
        .resd-empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem 0; gap: 1rem; color: #94a3b8; font-weight: 600; }
        
        .resd-side-panel { display: flex; flex-direction: column; gap: 1.5rem; }
        .resd-invite-box, .resd-support-box { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; text-align: center; }
        .resd-invite-box h3, .resd-support-box h3 { font-size: 1.125rem; font-weight: 800; color: #1e293b; margin: 0 0 0.5rem 0; }
        .resd-invite-box p, .resd-support-box p { font-size: 0.875rem; color: #64748b; margin: 0 0 1.5rem 0; line-height: 1.5; }
        .resd-quick-code { font-size: 1.5rem; font-weight: 900; color: #0d2331; letter-spacing: 4px; background: #f8fafc; padding: 1rem; border-radius: 12px; border: 1px dashed #cbd5e1; margin-bottom: 1rem; }
        .resd-btn-outline { background: white; border: 1.5px solid #e2e8f0; color: #0d2331; padding: 0.75rem 1rem; border-radius: 12px; font-weight: 700; width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; transition: all 0.2s; }
        .resd-btn-outline:hover { background: #f8fafc; border-color: #cbd5e1; }

        /* Modal Styles */
        .resd-modal-overlay { position: fixed; inset: 0; background: rgba(13, 35, 49, 0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
        .resd-modal { background: white; border-radius: 24px; padding: 2rem; max-width: 440px; width: 100%; position: relative; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .resd-modal-close { position: absolute; top: 1.25rem; right: 1.25rem; background: #f1f5f9; border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #475569; font-size: 1.1rem; font-weight: 700; transition: background 0.2s; }
        .resd-modal-close:hover { background: #e2e8f0; }
        .resd-modal-header { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; margin-bottom: 2rem; padding-top: 0.5rem; }
        .resd-modal-header h2 { font-size: 1.5rem; font-weight: 800; color: #0d2331; margin: 0; }
        
        .resd-qr-section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; margin-bottom: 1.5rem; text-align: center; }
        .resd-qr-box { background: white; padding: 1rem; border-radius: 16px; border: 1px solid #e2e8f0; display: inline-block; margin-bottom: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .resd-code-display p { font-size: 0.75rem; font-weight: 700; color: #64748b; margin: 0 0 0.25rem 0; text-transform: uppercase; letter-spacing: 0.05em; }
        .resd-code-display h3 { font-size: 2rem; font-weight: 900; color: #0d2331; letter-spacing: 4px; margin: 0; }

        .resd-details-grid { display: grid; grid-template-columns: 1fr; gap: 0.875rem; background: #fcfcfd; border: 1px solid #f1f5f9; padding: 1.25rem; border-radius: 16px; margin-bottom: 1.5rem; }
        .resd-detail-item { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.875rem; }
        .resd-detail-item:last-child { border-bottom: none; padding-bottom: 0; }
        .resd-detail-item span { font-size: 0.8125rem; font-weight: 600; color: #94a3b8; }
        .resd-detail-item strong { font-size: 0.9375rem; font-weight: 700; color: #1e293b; }
        
        .resd-modal-actions { display: flex; gap: 1rem; }
        .resd-btn-share { flex: 1; background: #0d2331; color: white; padding: 1rem; border-radius: 12px; border: none; font-weight: 700; font-size: 0.9375rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; cursor: pointer; }

        @media (max-width: 1024px) {
          .resd-stats-grid { grid-template-columns: repeat(3, 1fr); }
          .resd-main-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .resd-page { padding: 1rem; }
          .resd-header { flex-direction: column; }
          .resd-btn-primary { width: 100%; justify-content: center; }
          .resd-stats-grid { grid-template-columns: 1fr; }
          .resd-appt-item { flex-direction: column; align-items: flex-start; text-align: left; }
          .resd-appt-meta { align-items: flex-start; margin-top: 0.5rem; flex-direction: row; width: 100%; justify-content: space-between; }
          .resd-hide-mobile { display: none; }
        }
      `}</style>
    </div>
  );
};

export default ResidentDashboard;
