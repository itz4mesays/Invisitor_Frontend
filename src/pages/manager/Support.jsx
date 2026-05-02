import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Plus, Filter, MoreVertical, Eye, Trash2, Check, Ticket, Calendar, Upload, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from '../../components/Pagination';

const CATEGORIES = ['Technical Issue', 'Billing', 'Account Access', 'General Inquiry', 'Feature Request', 'Other'];
const ALL_STATUSES = ['All', 'Open', 'Closed', 'Resolved', 'Pending', 'In Progress'];
const STATUS_COLORS = {
  Open: { bg: '#fffbeb', color: '#d97706' },
  Closed: { bg: '#fef2f2', color: '#dc2626' },
  Resolved: { bg: '#f0fdf4', color: '#16a34a' },
  Pending: { bg: '#eff6ff', color: '#2563eb' },
  'In Progress': { bg: '#faf5ff', color: '#7c3aed' },
};

const initialTickets = [
  { id: 'TK-001', subject: 'Unable to login to dashboard', category: 'Account Access', date: '2026-04-01', status: 'Open', createdBy: 'David Fayemi' },
  { id: 'TK-002', subject: 'Payment not reflecting', category: 'Billing', date: '2026-04-03', status: 'Resolved', createdBy: 'Sarah Host' },
  { id: 'TK-003', subject: 'Visitor QR code not working', category: 'Technical Issue', date: '2026-04-05', status: 'Open', createdBy: 'John Resident' },
  { id: 'TK-004', subject: 'Request for bulk visitor import', category: 'Feature Request', date: '2026-04-07', status: 'Closed', createdBy: 'Alice Manager' },
  { id: 'TK-005', subject: 'Appointment notifications not sending', category: 'Technical Issue', date: '2026-04-09', status: 'In Progress', createdBy: 'David Fayemi' },
];

const ManagerSupport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.split('/')[1];
  const [tickets, setTickets] = useState(initialTickets);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [statusDropOpen, setStatusDropOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [deleteTicket, setDeleteTicket] = useState(null);
  const [form, setForm] = useState({ subject: '', category: '', description: '', attachment: null });
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = tickets.filter(t => {
    if (filterStatus !== 'All' && t.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!t.subject.toLowerCase().includes(q) && !t.id.toLowerCase().includes(q) && !t.createdBy.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setTickets(prev => [{
      id: `TK-${String(prev.length + 1).padStart(3, '0')}`,
      subject: form.subject, category: form.category || CATEGORIES[0],
      date: new Date().toISOString().split('T')[0], status: 'Open', createdBy: 'You',
    }, ...prev]);
    setIsAddSuccess(true);
  };

  const resetAdd = () => { setIsAddOpen(false); setTimeout(() => { setIsAddSuccess(false); setForm({ subject: '', category: '', description: '', attachment: null }); }, 300); };

  return (
    <div className="sp-page">
      <div className="sp-page-header"><h1>Support</h1></div>

      <div className="sp-top-row">
        <div className="sp-summary-badges">
          {ALL_STATUSES.filter(s => s !== 'All').map(s => {
            const sc = STATUS_COLORS[s] || {};
            return (
              <div key={s} className="sp-badge" style={{ background: sc.bg, color: sc.color }}>
                <span>{s}</span>
                <span className="sp-badge-count">{tickets.filter(t => t.status === s).length}</span>
              </div>
            );
          })}
        </div>
        <button className="sp-btn-add" onClick={() => setIsAddOpen(true)}><Plus size={18} /> New Ticket</button>
      </div>

      <div className="sp-table-card">
        <div className="sp-toolbar">
          <h2>All Tickets</h2>
          <div className="sp-toolbar-actions">
            <div className="sp-search">
              <Search size={15} />
              <input placeholder="Search tickets..." value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
            </div>
            <div className="sp-status-wrap">
              <button className="sp-status-btn" onClick={() => setStatusDropOpen(!statusDropOpen)} style={filterStatus !== 'All' && STATUS_COLORS[filterStatus] ? { background: STATUS_COLORS[filterStatus].bg, color: STATUS_COLORS[filterStatus].color } : {}}>
                {filterStatus === 'All' ? 'All Statuses' : filterStatus} <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {statusDropOpen && (
                  <><div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={() => setStatusDropOpen(false)} />
                  <motion.div className="sp-status-dropdown" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}>
                    {ALL_STATUSES.map(s => {
                      const sc = STATUS_COLORS[s];
                      return (
                        <button key={s} className={filterStatus === s ? 'active' : ''} onClick={() => { setFilterStatus(s); setStatusDropOpen(false); setCurrentPage(1); }}>
                          {sc && <span style={{ width: 8, height: 8, borderRadius: '50%', background: sc.color, display: 'inline-block', marginRight: 8 }} />}
                          {s}
                        </button>
                      );
                    })}
                  </motion.div></>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="sp-table">
            <thead>
              <tr><th>Ticket ID</th><th>Subject</th><th>Category</th><th>Created By</th><th>Date</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {paginated.map(ticket => {
                const sc = STATUS_COLORS[ticket.status] || {};
                return (
                  <tr key={ticket.id}>
                    <td className="sp-id">{ticket.id}</td>
                    <td className="sp-subject">{ticket.subject}</td>
                    <td className="sp-gray">{ticket.category}</td>
                    <td className="sp-gray">{ticket.createdBy}</td>
                    <td className="sp-gray">{ticket.date}</td>
                    <td><span className="sp-pill" style={{ background: sc.bg, color: sc.color }}>{ticket.status}</span></td>
                    <td>
                      <div className="sp-action-wrap">
                        <button className="sp-btn-dots" onClick={() => setActiveDropdown(activeDropdown === ticket.id ? null : ticket.id)}><MoreVertical size={18} /></button>
                        <AnimatePresence>
                          {activeDropdown === ticket.id && (
                            <><div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={() => setActiveDropdown(null)} />
                            <motion.div className="sp-dropdown" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                              <button onClick={() => { navigate(`/${role}/support/tickets/${ticket.id}`); setActiveDropdown(null); }}><Eye size={15} /> View Ticket</button>
                              <button className="delete" onClick={() => { setDeleteTicket(ticket); setActiveDropdown(null); }}><Trash2 size={15} /> Delete</button>
                            </motion.div></>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginated.length === 0 && <tr><td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>No tickets found.</td></tr>}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalCount={filtered.length} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={() => {}} />
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isAddOpen && (
          <div className="sp-modal-overlay" onClick={resetAdd}>
            <motion.div className="sp-modal" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <button className="sp-modal-close" onClick={resetAdd}><X size={20} /></button>
              {isAddSuccess ? (
                <div className="sp-success">
                  <div className="sp-success-icon"><Check size={40} strokeWidth={3} /></div>
                  <h2>Ticket Submitted Successfully</h2>
                  <button className="sp-btn-back" onClick={resetAdd}>Back to Tickets</button>
                </div>
              ) : (
                <div className="sp-add-content">
                  <Ticket size={20} style={{ color: '#0d2331', marginBottom: '0.75rem' }} />
                  <h2>New Support Ticket</h2>
                  <p>Describe your issue and we'll get back to you</p>
                  <form onSubmit={handleAddSubmit}>
                    <div className="sp-form-field"><label>SUBJECT</label><input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Brief description" required /></div>
                    <div className="sp-form-field"><label>CATEGORY</label>
                      <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required>
                        <option value="">Select a category</option>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="sp-form-field"><label>DESCRIPTION</label><textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Provide as much detail as possible..." required /></div>
                    <div className="sp-form-actions">
                      <button type="submit" className="sp-btn-submit">Submit Ticket</button>
                      <button type="button" className="sp-btn-cancel" onClick={resetAdd}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteTicket && (
          <div className="sp-modal-overlay" onClick={() => setDeleteTicket(null)}>
            <motion.div className="sp-modal sp-delete-modal" onClick={e => e.stopPropagation()} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div className="sp-delete-icon"><Trash2 size={32} /></div>
              <h3>Delete Ticket?</h3>
              <p>Are you sure you want to delete <strong>{deleteTicket.subject}</strong>? This cannot be undone.</p>
              <div className="sp-form-actions">
                <button className="sp-btn-delete-confirm" onClick={() => { setTickets(p => p.filter(t => t.id !== deleteTicket.id)); setDeleteTicket(null); }}>Yes, Delete</button>
                <button className="sp-btn-cancel" onClick={() => setDeleteTicket(null)}>Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .sp-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .sp-page-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; }
        .sp-top-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .sp-summary-badges { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .sp-badge { display: flex; align-items: center; gap: 6px; padding: 5px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
        .sp-badge-count { background: rgba(0,0,0,0.12); border-radius: 10px; padding: 1px 7px; font-size: 0.6875rem; font-weight: 800; }
        .sp-btn-add { background: #0d2331; color: white; padding: 0.75rem 1.25rem; border-radius: 8px; border: none; font-weight: 700; font-size: 0.875rem; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; white-space: nowrap; }
        .sp-table-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 1.5rem; }
        .sp-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem; }
        .sp-toolbar h2 { font-size: 1.125rem; font-weight: 800; color: #1e293b; }
        .sp-toolbar-actions { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
        .sp-search { display: flex; align-items: center; gap: 0.5rem; background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.5rem 1rem; border-radius: 8px; color: #94a3b8; width: 220px; }
        .sp-search input { border: none; background: none; outline: none; font-size: 0.8125rem; color: #1e293b; width: 100%; }
        .sp-status-wrap { position: relative; }
        .sp-status-btn { display: flex; align-items: center; gap: 6px; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.5rem 0.875rem; font-size: 0.8125rem; font-weight: 700; color: #475569; cursor: pointer; white-space: nowrap; }
        .sp-status-dropdown { position: absolute; right: 0; top: calc(100% + 6px); background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 100; min-width: 180px; overflow: hidden; }
        .sp-status-dropdown button { display: flex; align-items: center; padding: 0.625rem 1rem; font-size: 0.875rem; font-weight: 600; color: #1e293b; background: none; border: none; width: 100%; cursor: pointer; text-align: left; }
        .sp-status-dropdown button:hover { background: #f8fafc; }
        .sp-status-dropdown button.active { background: #f1f5f9; font-weight: 800; }
        .sp-table { width: 100%; border-collapse: collapse; min-width: 620px; }
        .sp-table th { padding: 0.875rem 0; font-size: 0.75rem; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9; text-align: left; }
        .sp-table td { padding: 1.125rem 0; font-size: 0.875rem; border-bottom: 1px solid #f1f5f9; }
        .sp-id { font-weight: 700; color: #1e293b; }
        .sp-subject { font-weight: 600; color: #1e293b; max-width: 200px; }
        .sp-gray { color: #64748b; }
        .sp-pill { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; white-space: nowrap; }
        .sp-action-wrap { position: relative; display: inline-block; }
        .sp-btn-dots { background: none; border: none; color: #94a3b8; cursor: pointer; padding: 4px; border-radius: 6px; display: flex; align-items: center; }
        .sp-btn-dots:hover { background: #f1f5f9; }
        .sp-dropdown { position: absolute; right: 0; top: calc(100% + 4px); background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); z-index: 100; min-width: 140px; overflow: hidden; }
        .sp-dropdown button { display: flex; align-items: center; gap: 8px; padding: 0.75rem 1rem; font-size: 0.875rem; font-weight: 600; color: #1e293b; background: none; border: none; width: 100%; cursor: pointer; }
        .sp-dropdown button:hover { background: #f8fafc; }
        .sp-dropdown button.delete { color: #ef4444; }
        .sp-dropdown button.delete:hover { background: #fef2f2; }
        .sp-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
        .sp-modal { background: white; width: 100%; max-width: 600px; border-radius: 28px; position: relative; max-height: 90vh; overflow-y: auto; }
        .sp-modal-close { position: absolute; top: 1.25rem; right: 1.25rem; background: white; border: 1px solid #e2e8f0; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #1e293b; z-index: 10; }
        .sp-add-content { padding: 2.5rem; }
        .sp-add-content h2 { font-size: 1.5rem; font-weight: 800; color: #0d2331; margin-bottom: 4px; }
        .sp-add-content p { font-size: 0.875rem; color: #94a3b8; margin-bottom: 2rem; }
        .sp-form-field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem; }
        .sp-form-field label { font-size: 0.75rem; font-weight: 800; color: #1e293b; }
        .sp-form-field input, .sp-form-field select, .sp-form-field textarea { padding: 0.875rem; border-radius: 10px; border: 1.5px solid #e2e8f0; font-size: 0.875rem; color: #1e293b; outline: none; font-family: inherit; }
        .sp-form-field textarea { resize: vertical; }
        .sp-form-actions { display: flex; gap: 1rem; margin-top: 0.5rem; }
        .sp-btn-submit { background: #0d2331; color: white; border: none; padding: 1rem 2rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .sp-btn-cancel { background: white; border: 1px solid #e2e8f0; color: #1e293b; padding: 1rem 2rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .sp-success { padding: 3.5rem 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
        .sp-success-icon { width: 80px; height: 80px; border-radius: 50%; background: #22c55e; color: white; display: flex; align-items: center; justify-content: center; }
        .sp-success h2 { font-size: 1.5rem; font-weight: 800; color: #0d2331; }
        .sp-btn-back { background: white; border: 1px solid #e2e8f0; color: #0d2331; padding: 0.875rem 2rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .sp-delete-modal { max-width: 400px; padding: 2.5rem; text-align: center; }
        .sp-delete-icon { width: 72px; height: 72px; border-radius: 50%; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
        .sp-delete-modal h3 { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin-bottom: 0.75rem; }
        .sp-delete-modal p { font-size: 0.875rem; color: #64748b; margin-bottom: 1.5rem; line-height: 1.6; }
        .sp-btn-delete-confirm { background: #ef4444; color: white; border: none; padding: 0.875rem 2rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        @media (max-width: 768px) {
          .sp-top-row { flex-direction: column; align-items: flex-start; }
          .sp-btn-add { width: 100%; justify-content: center; }
          .sp-summary-badges { overflow-x: auto; width: 100%; padding-bottom: 4px; -webkit-overflow-scrolling: touch; }
          .sp-toolbar { flex-direction: column; align-items: flex-start; }
          .sp-toolbar-actions { flex-direction: column; align-items: stretch; width: 100%; }
          .sp-search { width: 100%; }
          .sp-status-btn { width: 100%; justify-content: space-between; }
          .sp-form-actions { flex-direction: column; }
          .sp-btn-submit, .sp-btn-cancel, .sp-btn-delete-confirm { width: 100%; }
          .sp-table-card { padding: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default ManagerSupport;
