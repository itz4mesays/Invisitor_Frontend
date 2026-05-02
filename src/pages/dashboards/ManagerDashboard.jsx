import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Calendar, Clock, ArrowRight, Shield, QrCode, CreditCard, ChevronRight, CheckCircle2, AlertCircle 
} from 'lucide-react';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const stats = [
    { label: 'Total Residents', value: '450', icon: <Users size={20} />, bg: '#eef2ff', color: '#6366f1', trend: '+12 this month' },
    { label: 'Active Appointments', value: '128', icon: <Calendar size={20} />, bg: '#f0fdf4', color: '#16a34a', trend: 'Today' },
    { label: 'Security Officers', value: '24', icon: <Shield size={20} />, bg: '#fffbeb', color: '#d97706', trend: '4 on duty' },
    { label: 'Pending Support', value: '5', icon: <AlertCircle size={20} />, bg: '#fef2f2', color: '#dc2626', trend: 'Requires attention' },
  ];

  const recentAppointments = [
    { id: 'APT-001', code: 'INV-7H2A', visitor: 'Dr. Alison Ogaga', resident: 'John Smith (Apt 101)', time: '09:00 AM', status: 'completed', date: 'Today' },
    { id: 'APT-002', code: 'INV-3KP9', visitor: 'Mr. James Wilson', resident: 'Sarah Johnson (Apt 205)', time: '11:30 AM', status: 'scheduled', date: 'Today' },
    { id: 'APT-003', code: 'INV-9LM4', visitor: 'Ms. Sarah Connor', resident: 'Emily Davis (Apt 415)', time: '02:00 PM', status: 'scheduled', date: 'Tomorrow' },
    { id: 'APT-004', code: 'INV-2RT7', visitor: 'Mrs. Grace Olu', resident: 'David Wilson (Apt 102)', time: '04:15 PM', status: 'pending', date: 'Tomorrow' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return { bg: '#dcfce7', color: '#166534' };
      case 'scheduled': return { bg: '#e0f2fe', color: '#0369a1' };
      case 'pending': return { bg: '#fef3c7', color: '#b45309' };
      default: return { bg: '#f1f5f9', color: '#475569' };
    }
  };

  return (
    <div className="md-page">
      <div className="md-header">
        <div>
          <h1>Welcome, Estate Manager</h1>
          <p>Here is what's happening in your estate today.</p>
        </div>
        <div className="md-date-badge">
          <Calendar size={18} className="md-text-gray" />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      <div className="md-stats-grid">
        {stats.map((s, i) => (
          <motion.div key={i} className="md-stat-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="md-stat-top">
              <div className="md-stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
              <span className="md-stat-trend">{s.trend}</span>
            </div>
            <div className="md-stat-info">
              <span className="md-stat-label">{s.label}</span>
              <span className="md-stat-value">{s.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="md-main-grid">
        <div className="md-recent-appointments">
          <div className="md-card-header">
            <h3>Recent & Upcoming Appointments</h3>
            <button className="md-btn-link" onClick={() => navigate('/manager/appointments')}>View All <ArrowRight size={14} /></button>
          </div>
          <div className="md-appt-list">
            {recentAppointments.map((apt, i) => {
              const sc = getStatusColor(apt.status);
              return (
                <div key={i} className="md-appt-item" onClick={() => setSelectedAppointment(apt)}>
                  <div className="md-appt-icon"><Clock size={16} /></div>
                  <div className="md-appt-details">
                    <h4>{apt.visitor}</h4>
                    <p>Visiting {apt.resident}</p>
                  </div>
                  <div className="md-appt-meta">
                    <span className="md-appt-time">{apt.date} at {apt.time}</span>
                    <span className="md-status-pill" style={{ background: sc.bg, color: sc.color }}>{apt.status}</span>
                  </div>
                  <ChevronRight size={16} className="md-text-gray md-hide-mobile" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="md-side-panel">
          <div className="md-quick-actions">
            <h3>Quick Actions</h3>
            <div className="md-action-grid">
              <button className="md-action-btn" onClick={() => navigate('/manager/residents/add')}>
                <div className="md-action-icon" style={{ background: '#eef2ff', color: '#6366f1' }}><Users size={20} /></div>
                <span>Add Resident</span>
              </button>
              <button className="md-action-btn" onClick={() => navigate('/manager/security/add-officer')}>
                <div className="md-action-icon" style={{ background: '#fffbeb', color: '#d97706' }}><Shield size={20} /></div>
                <span>Add Officer</span>
              </button>
              <button className="md-action-btn" onClick={() => navigate('/manager/support')}>
                <div className="md-action-icon" style={{ background: '#fef2f2', color: '#dc2626' }}><AlertCircle size={20} /></div>
                <span>Support Tickets</span>
              </button>
              <button className="md-action-btn" onClick={() => navigate('/manager/transactions')}>
                <div className="md-action-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}><CreditCard size={20} /></div>
                <span>Transactions</span>
              </button>
            </div>
          </div>

          <div className="md-system-status">
            <h3>System Status</h3>
            <div className="md-status-item">
              <div className="md-status-indicator active"></div>
              <div>
                <h4>Main Gate Access</h4>
                <p>Operational</p>
              </div>
            </div>
            <div className="md-status-item">
              <div className="md-status-indicator active"></div>
              <div>
                <h4>Visitor Registration</h4>
                <p>Operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedAppointment && (
          <div className="md-modal-overlay" onClick={() => setSelectedAppointment(null)}>
            <motion.div className="md-modal" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
              <button className="md-modal-close" onClick={() => setSelectedAppointment(null)}>✕</button>
              
              <div className="md-modal-header">
                <h2>Appointment Details</h2>
                <span className="md-status-pill" style={{ background: getStatusColor(selectedAppointment.status).bg, color: getStatusColor(selectedAppointment.status).color }}>
                  {selectedAppointment.status.toUpperCase()}
                </span>
              </div>

              <div className="md-qr-section">
                <div className="md-qr-box">
                  <QrCode size={100} color="#0d2331" />
                </div>
                <div className="md-code-display">
                  <p>APPOINTMENT CODE</p>
                  <h3>{selectedAppointment.code}</h3>
                </div>
                <p className="md-qr-instruction">Scan this QR code or enter the code at the security gate to grant access.</p>
              </div>

              <div className="md-details-grid">
                <div className="md-detail-item">
                  <span>Visitor</span>
                  <strong>{selectedAppointment.visitor}</strong>
                </div>
                <div className="md-detail-item">
                  <span>Host / Resident</span>
                  <strong>{selectedAppointment.resident}</strong>
                </div>
                <div className="md-detail-item">
                  <span>Date</span>
                  <strong>{selectedAppointment.date}</strong>
                </div>
                <div className="md-detail-item">
                  <span>Time</span>
                  <strong>{selectedAppointment.time}</strong>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .md-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .md-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
        .md-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin-bottom: 0.25rem; }
        .md-header p { color: #64748b; font-size: 0.9375rem; }
        .md-date-badge { display: flex; align-items: center; gap: 0.75rem; background: white; border: 1px solid #e2e8f0; padding: 0.75rem 1.25rem; border-radius: 12px; font-weight: 600; color: #1e293b; font-size: 0.875rem; }
        .md-text-gray { color: #94a3b8; }
        
        .md-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .md-stat-card { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
        .md-stat-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .md-stat-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .md-stat-trend { font-size: 0.75rem; font-weight: 600; color: #64748b; background: #f8fafc; padding: 4px 10px; border-radius: 20px; }
        .md-stat-info { display: flex; flex-direction: column; gap: 0.25rem; }
        .md-stat-label { font-size: 0.8125rem; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
        .md-stat-value { font-size: 1.875rem; font-weight: 800; color: #1e293b; line-height: 1; }

        .md-main-grid { display: grid; grid-template-columns: 1fr 340px; gap: 1.5rem; }
        .md-recent-appointments { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; }
        .md-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .md-card-header h3 { font-size: 1.125rem; font-weight: 800; color: #1e293b; margin: 0; }
        .md-btn-link { background: none; border: none; color: #3b82f6; font-weight: 700; font-size: 0.875rem; display: flex; align-items: center; gap: 4px; cursor: pointer; }
        
        .md-appt-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .md-appt-item { display: flex; align-items: center; gap: 1rem; padding: 1.25rem; border: 1px solid #f1f5f9; border-radius: 16px; cursor: pointer; transition: all 0.2s; background: #fcfcfd; }
        .md-appt-item:hover { border-color: #e2e8f0; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.02); transform: translateY(-2px); }
        .md-appt-icon { width: 40px; height: 40px; background: #f1f5f9; color: #64748b; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .md-appt-details { flex: 1; }
        .md-appt-details h4 { font-size: 0.9375rem; font-weight: 800; color: #1e293b; margin: 0 0 2px 0; }
        .md-appt-details p { font-size: 0.8125rem; color: #64748b; margin: 0; }
        .md-appt-meta { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
        .md-appt-time { font-size: 0.75rem; font-weight: 600; color: #94a3b8; }
        .md-status-pill { font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.05em; }
        
        .md-side-panel { display: flex; flex-direction: column; gap: 1.5rem; }
        .md-quick-actions, .md-system-status { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; }
        .md-quick-actions h3, .md-system-status h3 { font-size: 1.125rem; font-weight: 800; color: #1e293b; margin: 0 0 1.25rem 0; }
        .md-action-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .md-action-btn { background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 16px; padding: 1.25rem 1rem; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; cursor: pointer; transition: all 0.2s; }
        .md-action-btn:hover { background: white; border-color: #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.03); transform: translateY(-2px); }
        .md-action-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .md-action-btn span { font-size: 0.8125rem; font-weight: 700; color: #1e293b; }

        .md-status-item { display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid #f1f5f9; }
        .md-status-item:last-child { border-bottom: none; padding-bottom: 0; }
        .md-status-indicator { width: 12px; height: 12px; border-radius: 50%; }
        .md-status-indicator.active { background: #22c55e; box-shadow: 0 0 0 4px #dcfce7; }
        .md-status-item h4 { font-size: 0.875rem; font-weight: 700; color: #1e293b; margin: 0 0 2px 0; }
        .md-status-item p { font-size: 0.75rem; color: #64748b; margin: 0; }

        /* Modal Styles */
        .md-modal-overlay { position: fixed; inset: 0; background: rgba(13, 35, 49, 0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
        .md-modal { background: white; border-radius: 24px; padding: 2rem; max-width: 480px; width: 100%; position: relative; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .md-modal-close { position: absolute; top: 1.25rem; right: 1.25rem; background: #f1f5f9; border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #475569; font-size: 1.1rem; font-weight: 700; transition: background 0.2s; }
        .md-modal-close:hover { background: #e2e8f0; }
        .md-modal-header { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; margin-bottom: 2rem; padding-top: 0.5rem; }
        .md-modal-header h2 { font-size: 1.5rem; font-weight: 800; color: #0d2331; margin: 0; }
        
        .md-qr-section { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 20px; padding: 2rem; display: flex; flex-direction: column; align-items: center; margin-bottom: 2rem; text-align: center; }
        .md-qr-box { background: white; padding: 1.5rem; border-radius: 16px; border: 1px solid #e2e8f0; display: inline-block; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .md-code-display p { font-size: 0.75rem; font-weight: 700; color: #64748b; margin: 0 0 0.25rem 0; text-transform: uppercase; letter-spacing: 0.05em; }
        .md-code-display h3 { font-size: 2rem; font-weight: 900; color: #0d2331; letter-spacing: 4px; margin: 0; }
        .md-qr-instruction { font-size: 0.875rem; color: #64748b; margin: 1rem 0 0 0; line-height: 1.5; max-width: 280px; }

        .md-details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; background: #fcfcfd; border: 1px solid #f1f5f9; padding: 1.5rem; border-radius: 16px; }
        .md-detail-item { display: flex; flex-direction: column; gap: 0.375rem; }
        .md-detail-item span { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
        .md-detail-item strong { font-size: 0.9375rem; font-weight: 700; color: #1e293b; }

        @media (max-width: 1024px) {
          .md-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .md-main-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .md-page { padding: 1rem; }
          .md-header { flex-direction: column; }
          .md-date-badge { width: 100%; justify-content: center; }
          .md-stats-grid { grid-template-columns: 1fr; }
          .md-appt-item { flex-direction: column; align-items: flex-start; text-align: left; }
          .md-appt-meta { align-items: flex-start; margin-top: 0.5rem; flex-direction: row; width: 100%; justify-content: space-between; }
          .md-hide-mobile { display: none; }
          .md-details-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default ManagerDashboard;
