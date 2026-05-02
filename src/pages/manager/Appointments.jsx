import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MoreVertical, Eye, Trash2, Calendar, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from '../../components/Pagination';

const STATUSES = { all: 'All', scheduled: 'Scheduled', completed: 'Completed', cancelled: 'Cancelled', pending: 'Pending' };
const STATUS_COLORS = {
  scheduled: { bg: '#eff6ff', color: '#2563eb' },
  completed: { bg: '#f0fdf4', color: '#16a34a' },
  cancelled: { bg: '#fef2f2', color: '#dc2626' },
  pending: { bg: '#fffbeb', color: '#d97706' },
};

const APPOINTMENTS = [
  { id: 'APT-001', code: 'INV-7H2A', visitor: 'Dr. Alison Ogaga', resident: 'John Smith', purpose: 'Medical Visit', date: '2024-11-20', time: '2:00 PM', status: 'scheduled', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alison' },
  { id: 'APT-002', code: 'INV-3KP9', visitor: 'Mr. James Wilson', resident: 'Sarah Johnson', purpose: 'Business Meeting', date: '2024-11-18', time: '3:00 PM', status: 'completed', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { id: 'APT-003', code: 'INV-9LM4', visitor: 'Ms. Sarah Connor', resident: 'Emily Davis', purpose: 'Social Visit', date: '2024-11-15', time: '11:00 AM', status: 'cancelled', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahC' },
  { id: 'APT-004', code: 'INV-2RT7', visitor: 'Mrs. Grace Olu', resident: 'David Wilson', purpose: 'Family Visit', date: '2024-11-22', time: '4:00 PM', status: 'pending', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace' },
  { id: 'APT-005', code: 'INV-5NB6', visitor: 'Mr. Victor Salisu', resident: 'John Smith', purpose: 'Package Delivery', date: '2024-11-24', time: '10:30 AM', status: 'scheduled', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victor' },
];

const ManagerAppointments = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [viewAppt, setViewAppt] = useState(null);
  const [deleteAppt, setDeleteAppt] = useState(null);
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = appointments.filter(a => {
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    const q = search.toLowerCase();
    if (q && !a.visitor.toLowerCase().includes(q) && !a.resident.toLowerCase().includes(q) && !a.code.toLowerCase().includes(q)) return false;
    return true;
  });

  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDelete = () => {
    setAppointments(p => p.filter(a => a.id !== deleteAppt.id));
    setDeleteAppt(null);
  };

  return (
    <div className="ma-page">
      <div className="ma-header">
        <div><h1>Appointments</h1><p>All estate appointments — read-only view.</p></div>
      </div>

      <div className="ma-controls">
        <div className="ma-search">
          <Search size={16} />
          <input placeholder="Search by visitor, resident, or code..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />
        </div>
        <div className="ma-status-tabs">
          {Object.entries(STATUSES).map(([key, label]) => (
            <button key={key} className={`ma-tab ${filterStatus === key ? 'active' : ''}`} onClick={() => { setFilterStatus(key); setCurrentPage(1); }}>{label}</button>
          ))}
        </div>
      </div>

      <div className="ma-table-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="ma-table">
            <thead>
              <tr><th>Code</th><th>Visitor</th><th>Resident</th><th>Purpose</th><th>Date & Time</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {paginated.map(a => {
                const sc = STATUS_COLORS[a.status] || {};
                return (
                  <tr key={a.id}>
                    <td><code className="ma-code">{a.code}</code></td>
                    <td>
                      <div className="ma-visitor-cell">
                        <img src={a.avatar} alt={a.visitor} />
                        <span>{a.visitor}</span>
                      </div>
                    </td>
                    <td><span style={{ color: '#64748b' }}>{a.resident}</span></td>
                    <td><span style={{ color: '#64748b' }}>{a.purpose}</span></td>
                    <td><div style={{ fontWeight: 600 }}>{a.date}</div><small style={{ color: '#94a3b8' }}>{a.time}</small></td>
                    <td><span className="ma-status-pill" style={{ background: sc.bg, color: sc.color }}>{a.status.charAt(0).toUpperCase() + a.status.slice(1)}</span></td>
                    <td>
                      <div className="ma-action-wrap">
                        <button className="ma-btn-dots" onClick={() => setActiveDropdown(activeDropdown === a.id ? null : a.id)}>
                          <MoreVertical size={18} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === a.id && (
                            <>
                              <div className="ma-drop-overlay" onClick={() => setActiveDropdown(null)} />
                              <motion.div className="ma-dropdown" initial={{ opacity: 0, scale: 0.95, y: 6 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
                                <button onClick={() => { setViewAppt(a); setActiveDropdown(null); }}><Eye size={15} /> View Details</button>
                                <button className="delete" onClick={() => { setDeleteAppt(a); setActiveDropdown(null); }}><Trash2 size={15} /> Delete</button>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>No appointments found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalCount={filtered.length} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={(s) => { setCurrentPage(1); }} />
      </div>

      {/* View Modal */}
      {viewAppt && (
        <div className="ma-modal-overlay" onClick={() => setViewAppt(null)}>
          <div className="ma-modal" onClick={e => e.stopPropagation()}>
            <button className="ma-modal-close" onClick={() => setViewAppt(null)}>✕</button>
            <div className="ma-modal-avatar">
              <img src={viewAppt.avatar} alt={viewAppt.visitor} />
            </div>
            <h2>{viewAppt.visitor}</h2>
            <div className="ma-modal-code-section">
              <div className="ma-modal-code">{viewAppt.code}</div>
              <p>Scan QR at gate entry</p>
              <div className="ma-qr-placeholder"><QrCode size={80} color="#0d2331" /></div>
            </div>
            <div className="ma-modal-details">
              {[['Resident', viewAppt.resident], ['Purpose', viewAppt.purpose], ['Date', viewAppt.date], ['Time', viewAppt.time]].map(([k, v]) => (
                <div key={k} className="ma-modal-row"><span>{k}</span><strong>{v}</strong></div>
              ))}
              <div className="ma-modal-row">
                <span>Status</span>
                <strong><span className="ma-status-pill" style={{ background: STATUS_COLORS[viewAppt.status]?.bg, color: STATUS_COLORS[viewAppt.status]?.color }}>{viewAppt.status}</span></strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteAppt && (
        <div className="ma-modal-overlay" onClick={() => setDeleteAppt(null)}>
          <div className="ma-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 380 }}>
            <div style={{ width: 64, height: 64, background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <Trash2 size={32} />
            </div>
            <h3 style={{ textAlign: 'center', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Delete Appointment?</h3>
            <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '1.5rem' }}>This will permanently remove the appointment for <strong>{deleteAppt.visitor}</strong>.</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button style={{ flex: 1, background: '#ef4444', color: 'white', border: 'none', padding: '0.875rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }} onClick={handleDelete}>Delete</button>
              <button style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', color: '#1e293b', padding: '0.875rem', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }} onClick={() => setDeleteAppt(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .ma-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .ma-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .ma-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin-bottom: 0.25rem; }
        .ma-header p { color: #64748b; }
        .ma-controls { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
        .ma-search { flex: 1; min-width: 200px; display: flex; align-items: center; gap: 0.75rem; background: white; padding: 0.75rem 1rem; border: 1px solid #e2e8f0; border-radius: 10px; color: #94a3b8; }
        .ma-search input { flex: 1; border: none; outline: none; background: none; font-size: 0.875rem; color: #1e293b; }
        .ma-status-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .ma-tab { background: white; border: 1px solid #e2e8f0; padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8125rem; font-weight: 600; color: #64748b; cursor: pointer; }
        .ma-tab.active { background: #0d2331; color: white; border-color: #0d2331; }
        .ma-table-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.5rem; }
        .ma-table { width: 100%; border-collapse: collapse; min-width: 700px; }
        .ma-table th { padding: 0.875rem 0; font-size: 0.75rem; font-weight: 600; color: #94a3b8; border-bottom: 1px solid #f1f5f9; text-align: left; }
        .ma-table td { padding: 1rem 0; font-size: 0.875rem; border-bottom: 1px solid #f8fafc; }
        .ma-code { background: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-size: 0.8125rem; font-weight: 700; color: #0d2331; }
        .ma-visitor-cell { display: flex; align-items: center; gap: 0.75rem; }
        .ma-visitor-cell img { width: 36px; height: 36px; border-radius: 50%; }
        .ma-visitor-cell span { font-weight: 600; color: #1e293b; }
        .ma-status-pill { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; white-space: nowrap; }
        .ma-action-wrap { position: relative; display: inline-block; }
        .ma-btn-dots { background: none; border: none; cursor: pointer; color: #94a3b8; display: flex; align-items: center; padding: 4px; border-radius: 6px; }
        .ma-btn-dots:hover { background: #f1f5f9; }
        .ma-drop-overlay { position: fixed; inset: 0; z-index: 90; }
        .ma-dropdown { position: absolute; right: 0; top: calc(100% + 4px); background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); z-index: 100; min-width: 140px; overflow: hidden; }
        .ma-dropdown button { display: flex; align-items: center; gap: 8px; padding: 0.75rem 1rem; font-size: 0.875rem; font-weight: 600; color: #1e293b; background: none; border: none; width: 100%; cursor: pointer; }
        .ma-dropdown button:hover { background: #f8fafc; }
        .ma-dropdown button.delete { color: #ef4444; }
        .ma-dropdown button.delete:hover { background: #fef2f2; }
        .ma-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
        .ma-modal { background: white; border-radius: 24px; padding: 2rem; max-width: 480px; width: 100%; position: relative; max-height: 90vh; overflow-y: auto; }
        .ma-modal-close { position: absolute; top: 1.25rem; right: 1.25rem; background: #f1f5f9; border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; font-size: 1rem; }
        .ma-modal-avatar { text-align: center; margin-bottom: 1rem; }
        .ma-modal-avatar img { width: 80px; height: 80px; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .ma-modal h2 { text-align: center; font-size: 1.375rem; font-weight: 800; color: #1e293b; margin-bottom: 1.25rem; }
        .ma-modal-code-section { text-align: center; background: #f8fafc; padding: 1.25rem; border-radius: 16px; margin-bottom: 1.5rem; }
        .ma-modal-code { font-size: 1.5rem; font-weight: 800; color: #0d2331; letter-spacing: 4px; margin-bottom: 0.25rem; }
        .ma-modal-code-section p { font-size: 0.75rem; color: #94a3b8; margin: 0 0 1rem; }
        .ma-qr-placeholder { display: flex; justify-content: center; opacity: 0.5; }
        .ma-modal-details { display: flex; flex-direction: column; gap: 0.875rem; }
        .ma-modal-row { display: flex; justify-content: space-between; align-items: center; padding-bottom: 0.875rem; border-bottom: 1px solid #f1f5f9; }
        .ma-modal-row:last-child { border-bottom: none; }
        .ma-modal-row span { font-size: 0.8125rem; color: #94a3b8; font-weight: 600; }
        .ma-modal-row strong { font-size: 0.9375rem; color: #1e293b; }
        @media (max-width: 768px) {
          .ma-controls { flex-direction: column; align-items: stretch; }
          .ma-search { width: 100%; }
          .ma-status-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 4px; }
          .ma-table-card { padding: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default ManagerAppointments;
