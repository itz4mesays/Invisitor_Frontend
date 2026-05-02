import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Eye,
  Trash2,
  X,
  Calendar,
  Upload,
  Check,
  Ticket,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import Pagination from '../../components/Pagination';

/* ──────────────────────────────────────────────
   Reusable Modal
────────────────────────────────────────────── */
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header-simple">
          <button onClick={onClose} className="btn-close-circle">
            <X size={24} />
          </button>
        </div>
        <div className="modal-body-p-0">{children}</div>
      </motion.div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Mock data & constants
────────────────────────────────────────────── */
const CATEGORIES = ['Technical Issue', 'Billing', 'Account Access', 'General Inquiry', 'Feature Request', 'Other'];

const ALL_STATUSES = ['All', 'Open', 'Closed', 'Resolved', 'Pending', 'In Progress'];

const STATUS_COLORS = {
  Open:        { bg: '#fffbeb', color: '#d97706' },
  Closed:      { bg: '#fef2f2', color: '#dc2626' },
  Resolved:    { bg: '#f0fdf4', color: '#16a34a' },
  Pending:     { bg: '#eff6ff', color: '#2563eb' },
  'In Progress': { bg: '#faf5ff', color: '#7c3aed' },
};

const initialTickets = [
  { id: 'TK-001', subject: 'Unable to login to dashboard',         category: 'Account Access',  date: '2026-04-01', status: 'Open',        createdBy: 'David Fayemi',  description: 'I keep getting a 403 error when trying to log in.' },
  { id: 'TK-002', subject: 'Payment not reflecting',               category: 'Billing',          date: '2026-04-03', status: 'Resolved',     createdBy: 'Sarah Host',    description: 'Made payment 3 days ago, still not reflected on my account.' },
  { id: 'TK-003', subject: 'Visitor QR code not working',          category: 'Technical Issue',  date: '2026-04-05', status: 'Open',         createdBy: 'John Resident', description: 'Visitors scan the QR code but nothing happens.' },
  { id: 'TK-004', subject: 'Request for bulk visitor import',      category: 'Feature Request',  date: '2026-04-07', status: 'Closed',       createdBy: 'Alice Manager', description: 'Would be great to upload a CSV file for multiple visitors at once.' },
  { id: 'TK-005', subject: 'Appointment notifications not sending', category: 'Technical Issue', date: '2026-04-09', status: 'In Progress',  createdBy: 'David Fayemi',  description: 'Email notifications for new appointments stopped working.' },
  { id: 'TK-006', subject: 'Update subscription plan',             category: 'Billing',          date: '2026-04-10', status: 'Resolved',     createdBy: 'Sarah Host',    description: 'Need help upgrading from basic to enterprise plan.' },
  { id: 'TK-007', subject: 'Profile picture not uploading',        category: 'General Inquiry',  date: '2026-04-12', status: 'Pending',      createdBy: 'Bob Visitor',   description: 'I try to upload a profile image but it just spins forever.' },
];

/* ──────────────────────────────────────────────
   Main component
────────────────────────────────────────────── */
const ManageTickets = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const role = location.pathname.split('/')[1];

  const [tickets, setTickets]           = useState(initialTickets);
  const [searchQuery, setSearchQuery]   = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo]     = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [statusDropOpen, setStatusDropOpen] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeDropdown, setActiveDropdown]   = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Add ticket modal
  const [isAddOpen, setIsAddOpen]     = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [form, setForm] = useState({ subject: '', category: '', description: '', attachment: null });

  // Delete modal
  const [deleteTicket, setDeleteTicket] = useState(null);

  /* Handlers */
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      id: `TK-${String(tickets.length + 1).padStart(3, '0')}`,
      subject:    form.subject,
      category:   form.category || CATEGORIES[0],
      date:       new Date().toISOString().split('T')[0],
      status:     'Open',
      createdBy:  'You',
      description: form.description,
    };
    setTickets((prev) => [newTicket, ...prev]);
    setIsAddSuccess(true);
  };

  const resetAddModal = () => {
    setIsAddOpen(false);
    setTimeout(() => {
      setIsAddSuccess(false);
      setForm({ subject: '', category: '', description: '', attachment: null });
    }, 300);
  };

  const handleDelete = () => {
    setTickets((prev) => prev.filter((t) => t.id !== deleteTicket.id));
    setDeleteTicket(null);
  };

  /* Filtering */
  const filtered = tickets.filter((t) => {
    if (filterStatus !== 'All' && t.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !t.subject.toLowerCase().includes(q) &&
        !t.category.toLowerCase().includes(q) &&
        !t.id.toLowerCase().includes(q) &&
        !t.createdBy.toLowerCase().includes(q)
      ) return false;
    }
    if (filterDateFrom && t.date < filterDateFrom) return false;
    if (filterDateTo   && t.date > filterDateTo)   return false;
    return true;
  });

  const totalItems = filtered.length;
  const currentTableData = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filtered.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filtered, pageSize]);

  // Reset to page 1 if search / filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus, filterDateFrom, filterDateTo]);

  const currentStatusColor = STATUS_COLORS[filterStatus];

  return (
    <div className="mt-page">
      <div className="mt-page-header">
        <h1>Manage Tickets</h1>
      </div>

      {/* Top action row */}
      <div className="mt-top-row">
        <div className="mt-summary-badges">
          {ALL_STATUSES.filter((s) => s !== 'All').map((s) => {
            const cnt = tickets.filter((t) => t.status === s).length;
            const sc  = STATUS_COLORS[s] || {};
            return (
              <div key={s} className="mt-summary-badge" style={{ background: sc.bg, color: sc.color }}>
                <span className="mt-summary-label">{s}</span>
                <span className="mt-summary-count">{cnt}</span>
              </div>
            );
          })}
        </div>
        <button className="mt-btn-add" onClick={() => setIsAddOpen(true)}>
          <Plus size={18} />
          Add New Ticket
        </button>
      </div>

      {/* Table card */}
      <div className="mt-table-card">
        <div className="mt-table-toolbar">
          <h2 className="mt-table-title">All Tickets</h2>
          <div className="mt-toolbar-actions">
            {/* Search */}
            <div className="mt-search-box">
              <Search size={16} className="mt-search-icon" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Status filter dropdown */}
            <div className="mt-status-drop-wrap">
              <button
                className="mt-status-drop-btn"
                onClick={() => setStatusDropOpen(!statusDropOpen)}
                style={filterStatus !== 'All' && currentStatusColor ? {
                  background: currentStatusColor.bg,
                  color: currentStatusColor.color,
                  borderColor: 'transparent',
                } : {}}
              >
                {filterStatus === 'All' ? 'All Statuses' : filterStatus}
                <ChevronDown size={14} className={statusDropOpen ? 'rotated' : ''} />
              </button>
              <AnimatePresence>
                {statusDropOpen && (
                  <>
                    <div className="mt-drop-overlay" onClick={() => setStatusDropOpen(false)} />
                    <motion.div
                      className="mt-status-dropdown"
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    >
                      {ALL_STATUSES.map((s) => {
                        const sc = STATUS_COLORS[s];
                        return (
                          <button
                            key={s}
                            className={`mt-status-drop-item ${filterStatus === s ? 'active' : ''}`}
                            onClick={() => { setFilterStatus(s); setStatusDropOpen(false); }}
                          >
                            {sc && <span className="mt-dot" style={{ background: sc.color }} />}
                            {s}
                            <span className="mt-drop-count">
                              {s === 'All' ? tickets.length : tickets.filter((t) => t.status === s).length}
                            </span>
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Date filter */}
            <button
              className={`mt-btn-filter ${showFilterPanel ? 'active' : ''}`}
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <Filter size={15} />
              Date Filter
            </button>
          </div>
        </div>

        {/* Date filter panel */}
        <AnimatePresence>
          {showFilterPanel && (
            <motion.div
              className="mt-filter-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="mt-filter-row">
                <div className="mt-filter-field">
                  <label>DATE FROM</label>
                  <div className="mt-input-icon">
                    <input type="date" value={filterDateFrom} onChange={(e) => setFilterDateFrom(e.target.value)} />
                    <Calendar size={15} className="mt-field-icon" />
                  </div>
                </div>
                <div className="mt-filter-field">
                  <label>DATE TO</label>
                  <div className="mt-input-icon">
                    <input type="date" value={filterDateTo} onChange={(e) => setFilterDateTo(e.target.value)} />
                    <Calendar size={15} className="mt-field-icon" />
                  </div>
                </div>
                <button
                  className="mt-btn-clear-filter"
                  onClick={() => { setFilterDateFrom(''); setFilterDateTo(''); setShowFilterPanel(false); }}
                >
                  Clear
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <table className="mt-table">
          <thead>
            <tr>
              <th><div className="mt-th">Ticket ID <MoreVertical size={13} className="mt-sort" /></div></th>
              <th><div className="mt-th">Subject <MoreVertical size={13} className="mt-sort" /></div></th>
              <th><div className="mt-th">Category <MoreVertical size={13} className="mt-sort" /></div></th>
              <th><div className="mt-th">Created By <MoreVertical size={13} className="mt-sort" /></div></th>
              <th><div className="mt-th">Date <MoreVertical size={13} className="mt-sort" /></div></th>
              <th><div className="mt-th">Status <MoreVertical size={13} className="mt-sort" /></div></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.length > 0 ? (
              currentTableData.map((ticket) => {
                const sc = STATUS_COLORS[ticket.status] || {};
                return (
                  <tr key={ticket.id}>
                    <td className="mt-id-cell">{ticket.id}</td>
                    <td className="mt-subject-cell">{ticket.subject}</td>
                    <td className="mt-text-gray">{ticket.category}</td>
                    <td className="mt-text-gray">{ticket.createdBy}</td>
                    <td className="mt-text-gray">{ticket.date}</td>
                    <td>
                      <span className="mt-status-pill" style={{ background: sc.bg, color: sc.color }}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="mt-actions-cell">
                      <div className="mt-dropdown-wrap">
                        <button
                          className="mt-btn-dots"
                          onClick={() => setActiveDropdown(activeDropdown === ticket.id ? null : ticket.id)}
                        >
                          <MoreVertical size={18} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === ticket.id && (
                            <>
                              <div className="mt-dropdown-overlay" onClick={() => setActiveDropdown(null)} />
                              <motion.div
                                className="mt-dropdown-menu"
                                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                              >
                                <button
                                  className="mt-dropdown-item"
                                  onClick={() => {
                                    navigate(`/${role}/support/tickets/${ticket.id}`);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  <Eye size={15} /> View Ticket
                                </button>
                                <button
                                  className="mt-dropdown-item delete"
                                  onClick={() => { setDeleteTicket(ticket); setActiveDropdown(null); }}
                                >
                                  <Trash2 size={15} /> Delete
                                </button>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage}
          totalCount={totalItems}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
          onPageSizeChange={size => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* ── Add Ticket Modal ── */}
      <AnimatePresence>
        {isAddOpen && (
          <Modal isOpen={isAddOpen} onClose={resetAddModal}>
            {isAddSuccess ? (
              <div className="mt-success-content">
                <h2 className="mt-success-title">Ticket Submitted<br />Successfully</h2>
                <div className="mt-success-icon"><Check size={44} strokeWidth={3} /></div>
                <button className="mt-btn-back" onClick={resetAddModal}>Back to Tickets</button>
              </div>
            ) : (
              <div className="mt-add-content">
                <div className="mt-add-header">
                  <Ticket size={20} className="mt-add-icon-head" />
                  <div>
                    <h2 className="mt-add-title">New Support Ticket</h2>
                    <p className="mt-add-subtitle">Describe your issue and we'll get back to you</p>
                  </div>
                </div>
                <form onSubmit={handleAddSubmit} className="mt-add-form">
                  <div className="mt-form-field">
                    <label>SUBJECT</label>
                    <input type="text" name="subject" placeholder="Brief description of the issue" value={form.subject} onChange={handleFormChange} required />
                  </div>
                  <div className="mt-form-field">
                    <label>CATEGORY</label>
                    <select name="category" value={form.category} onChange={handleFormChange} required>
                      <option value="" disabled>Select a category</option>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="mt-form-field">
                    <label>DESCRIPTION</label>
                    <textarea name="description" rows={5} placeholder="Provide as much detail as possible..." value={form.description} onChange={handleFormChange} required />
                  </div>
                  <div className="mt-form-field">
                    <label>ATTACHMENT (Optional)</label>
                    <label className="mt-upload-label">
                      <input type="file" name="attachment" onChange={handleFormChange} style={{ display: 'none' }} />
                      <Upload size={18} />
                      {form.attachment ? form.attachment.name : 'Click to upload file'}
                    </label>
                  </div>
                  <div className="mt-form-actions">
                    <button type="submit" className="mt-btn-submit">Submit Ticket</button>
                    <button type="button" className="mt-btn-cancel" onClick={resetAddModal}>Cancel</button>
                  </div>
                </form>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation Modal ── */}
      <AnimatePresence>
        {deleteTicket && (
          <Modal isOpen={!!deleteTicket} onClose={() => setDeleteTicket(null)}>
            <div className="mt-delete-content">
              <div className="mt-delete-icon"><Trash2 size={36} /></div>
              <h3>Delete Ticket?</h3>
              <p>Are you sure you want to delete <strong>{deleteTicket.subject}</strong>? This action cannot be undone.</p>
              <div className="mt-delete-actions">
                <button className="mt-btn-delete-confirm" onClick={handleDelete}>Yes, Delete</button>
                <button className="mt-btn-cancel" onClick={() => setDeleteTicket(null)}>Cancel</button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        /* Modal base */
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; padding: 1rem;
        }
        .modal-container {
          background: white; width: 100%; max-width: 680px;
          border-radius: 40px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15);
          position: relative;
        }
        .modal-header-simple { position: absolute; top: 1.5rem; right: 1.5rem; z-index: 100; }
        .btn-close-circle {
          background: white; border: 1px solid #e2e8f0; border-radius: 50%;
          width: 44px; height: 44px; display: flex; align-items: center;
          justify-content: center; cursor: pointer; color: #1e293b;
        }
        .modal-body-p-0 { padding: 0; max-height: 85vh; overflow-y: auto; border-radius: 40px; }
        .modal-body-p-0::-webkit-scrollbar { width: 6px; }
        .modal-body-p-0::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }

        /* Page */
        .mt-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .mt-page-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; }

        /* Top row */
        .mt-top-row { display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }

        /* Summary badges */
        .mt-summary-badges { display: flex; gap: 0.625rem; flex-wrap: wrap; }
        .mt-summary-badge {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 12px; border-radius: 20px;
          font-size: 0.75rem; font-weight: 700;
        }
        .mt-summary-label {}
        .mt-summary-count {
          background: rgba(0,0,0,0.12); border-radius: 10px;
          padding: 1px 7px; font-size: 0.6875rem; font-weight: 800;
        }

        .mt-btn-add {
          background: #0d2331; color: white; padding: 0.75rem 1.25rem;
          border-radius: 8px; border: none; font-weight: 700; font-size: 0.875rem;
          display: flex; align-items: center; gap: 0.5rem; cursor: pointer;
          white-space: nowrap; transition: opacity 0.2s;
        }
        .mt-btn-add:hover { opacity: 0.9; }

        /* Table card */
        .mt-table-card { background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 1.5rem; }
        .mt-table-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem; }
        .mt-table-title { font-size: 1.125rem; font-weight: 800; color: #1e293b; }
        .mt-toolbar-actions { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }

        /* Search */
        .mt-search-box { position: relative; width: 220px; }
        .mt-search-icon { position: absolute; left: 0.875rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .mt-search-box input {
          width: 100%; padding: 0.5rem 1rem 0.5rem 2.25rem;
          border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.8125rem;
          background: #f8fafc; outline: none; color: #1e293b;
        }

        /* Status dropdown */
        .mt-status-drop-wrap { position: relative; }
        .mt-status-drop-btn {
          display: flex; align-items: center; gap: 6px;
          background: white; border: 1px solid #e2e8f0; border-radius: 8px;
          padding: 0.5rem 0.875rem; font-size: 0.8125rem; font-weight: 700;
          color: #475569; cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .mt-status-drop-btn .rotated { transform: rotate(180deg); transition: transform 0.2s; }
        .mt-drop-overlay { position: fixed; inset: 0; z-index: 90; }
        .mt-status-dropdown {
          position: absolute; right: 0; top: calc(100% + 6px);
          background: white; border: 1px solid #e2e8f0; border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 100; min-width: 180px; overflow: hidden;
        }
        .mt-status-drop-item {
          display: flex; align-items: center; gap: 8px;
          padding: 0.625rem 1rem; font-size: 0.875rem; font-weight: 600;
          color: #1e293b; background: none; border: none; width: 100%;
          cursor: pointer; text-align: left; transition: background 0.15s;
        }
        .mt-status-drop-item:hover { background: #f8fafc; }
        .mt-status-drop-item.active { background: #f1f5f9; font-weight: 800; }
        .mt-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .mt-drop-count { margin-left: auto; font-size: 0.75rem; color: #94a3b8; font-weight: 700; }

        /* Date filter button */
        .mt-btn-filter {
          background: white; border: 1px solid #e2e8f0; border-radius: 8px;
          padding: 0.5rem 0.875rem; font-size: 0.8125rem; font-weight: 600;
          color: #475569; display: flex; align-items: center; gap: 0.5rem;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .mt-btn-filter.active, .mt-btn-filter:hover { background: #f1f5f9; color: #0d2331; }

        /* Filter panel */
        .mt-filter-panel { overflow: hidden; margin-bottom: 1rem; }
        .mt-filter-row {
          display: flex; align-items: flex-end; gap: 1rem;
          background: #f8fafc; border: 1px solid #e2e8f0;
          border-radius: 12px; padding: 1rem 1.25rem;
        }
        .mt-filter-field { display: flex; flex-direction: column; gap: 4px; }
        .mt-filter-field label { font-size: 0.6875rem; font-weight: 800; color: #94a3b8; letter-spacing: 0.5px; }
        .mt-input-icon { position: relative; }
        .mt-input-icon input {
          padding: 0.5rem 2rem 0.5rem 0.75rem; border: 1px solid #e2e8f0;
          border-radius: 8px; font-size: 0.8125rem; color: #1e293b;
          background: white; outline: none;
        }
        .mt-field-icon { position: absolute; right: 0.625rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .mt-btn-clear-filter {
          background: none; border: none; font-size: 0.8125rem; font-weight: 700;
          color: #ef4444; cursor: pointer; margin-bottom: 2px; white-space: nowrap;
        }

        /* Table */
        .mt-table { width: 100%; border-collapse: collapse; text-align: left; }
        .mt-table th { padding: 0.875rem 0; font-size: 0.75rem; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9; }
        .mt-th { display: flex; align-items: center; gap: 4px; }
        .mt-sort { color: #cbd5e1; }
        .mt-table td { padding: 1.125rem 0; font-size: 0.875rem; border-bottom: 1px solid #f1f5f9; }
        .mt-id-cell   { font-weight: 700; color: #1e293b; }
        .mt-subject-cell { font-weight: 600; color: #1e293b; max-width: 200px; }
        .mt-text-gray { color: #64748b; }
        .mt-status-pill { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; white-space: nowrap; }

        /* Actions */
        .mt-actions-cell { width: 60px; text-align: right; }
        .mt-dropdown-wrap { position: relative; display: inline-block; }
        .mt-btn-dots {
          background: none; border: none; color: #94a3b8; cursor: pointer;
          padding: 4px; border-radius: 6px; display: flex; align-items: center;
          transition: background 0.2s;
        }
        .mt-btn-dots:hover { background: #f1f5f9; color: #0d2331; }
        .mt-dropdown-overlay { position: fixed; inset: 0; z-index: 90; }
        .mt-dropdown-menu {
          position: absolute; right: 0; top: calc(100% + 6px);
          background: white; border: 1px solid #e2e8f0; border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 100; min-width: 140px; overflow: hidden;
        }
        .mt-dropdown-item {
          display: flex; align-items: center; gap: 0.625rem;
          padding: 0.75rem 1rem; font-size: 0.875rem; font-weight: 600;
          color: #1e293b; background: none; border: none; width: 100%;
          cursor: pointer; text-align: left; transition: background 0.15s;
        }
        .mt-dropdown-item:hover { background: #f8fafc; }
        .mt-dropdown-item.delete { color: #ef4444; }
        .mt-dropdown-item.delete:hover { background: #fef2f2; }

        /* Pagination */
        .mt-pagination {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid #f1f5f9;
        }
        .mt-page-info { font-size: 0.8125rem; color: #94a3b8; font-weight: 500; }
        .mt-page-btns { display: flex; align-items: center; gap: 4px; }
        .mt-page-btn {
          width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0;
          background: white; display: flex; align-items: center; justify-content: center;
          font-size: 0.8125rem; font-weight: 700; color: #64748b; cursor: pointer;
          transition: all 0.2s;
        }
        .mt-page-btn.active { background: #0d2331; color: white; border-color: #0d2331; }

        /* Add modal */
        .mt-add-content { padding: 3rem; }
        .mt-add-header { margin-bottom: 2rem; display: flex; flex-direction: column; }
        .mt-add-icon-head { color: #0d2331; margin-bottom: 0.75rem; }
        .mt-add-title { font-size: 1.5rem; font-weight: 800; color: #0d2331; margin-bottom: 4px; }
        .mt-add-subtitle { font-size: 0.875rem; color: #94a3b8; font-weight: 500; }
        .mt-add-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .mt-form-field { display: flex; flex-direction: column; gap: 0.5rem; }
        .mt-form-field label { font-size: 0.75rem; font-weight: 800; color: #1e293b; letter-spacing: 0.5px; }
        .mt-form-field input, .mt-form-field select, .mt-form-field textarea {
          width: 100%; padding: 0.875rem; border-radius: 10px; border: 1.5px solid #e2e8f0;
          font-size: 0.875rem; color: #1e293b; font-weight: 600; outline: none; background: white;
          font-family: inherit; transition: border-color 0.2s;
        }
        .mt-form-field input:focus, .mt-form-field select:focus, .mt-form-field textarea:focus { border-color: #0d2331; }
        .mt-form-field textarea { resize: vertical; }
        .mt-upload-label {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.875rem 1rem; border: 1.5px dashed #cbd5e1;
          border-radius: 10px; font-size: 0.875rem; font-weight: 600;
          color: #64748b; cursor: pointer; transition: all 0.2s;
        }
        .mt-upload-label:hover { border-color: #0d2331; color: #0d2331; background: #f8fafc; }
        .mt-form-actions { display: flex; gap: 1rem; margin-top: 0.5rem; }
        .mt-btn-submit {
          background: #0d2331; color: white; border: none; padding: 1rem 2rem;
          border-radius: 12px; font-weight: 700; font-size: 0.875rem; cursor: pointer;
        }
        .mt-btn-submit:hover { opacity: 0.9; }
        .mt-btn-cancel {
          background: white; border: 1px solid #e2e8f0; color: #1e293b;
          padding: 1rem 2rem; border-radius: 12px; font-weight: 700;
          font-size: 0.875rem; cursor: pointer;
        }

        /* Success */
        .mt-success-content {
          padding: 3.5rem 2rem; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
        }
        .mt-success-title { font-size: 1.75rem; font-weight: 800; color: #0d2331; line-height: 1.3; }
        .mt-success-icon {
          width: 80px; height: 80px; border-radius: 50%;
          background: #22c55e; color: white;
          display: flex; align-items: center; justify-content: center;
        }
        .mt-btn-back { background: white; border: 1px solid #e2e8f0; color: #0d2331; padding: 0.875rem 2rem; border-radius: 12px; font-weight: 700; cursor: pointer; }

        /* Delete */
        .mt-delete-content {
          padding: 3rem 2.5rem; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
        }
        .mt-delete-icon { width: 72px; height: 72px; border-radius: 50%; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center; }
        @media (max-width: 1024px) {
          .mt-table { width: 100%; min-width: 800px; }
          .mt-table-card { overflow-x: auto; }
        }

        @media (max-width: 768px) {
          .mt-page { padding: 1rem; }
          .mt-page-header h1 { font-size: 1.5rem; }
          .mt-top-row { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
          .mt-summary-badges { width: 100%; overflow-x: auto; padding-bottom: 0.5rem; -webkit-overflow-scrolling: touch; }
          .mt-btn-add { width: 100%; justify-content: center; }
          .mt-toolbar-actions { flex-direction: column; align-items: stretch; width: 100%; }
          .mt-search-box { width: 100%; }
          .mt-status-drop-btn, .mt-btn-filter { width: 100%; justify-content: space-between; }
          .mt-filter-row { flex-direction: column; align-items: stretch; }
          .mt-btn-clear-filter { text-align: center; margin-top: 0.5rem; }
          .mt-add-content { padding: 2rem 1.5rem; }
          .mt-form-actions, .mt-delete-actions { flex-direction: column; }
          .mt-btn-submit, .mt-btn-cancel, .mt-btn-delete-confirm { width: 100%; }
          .modal-container { border-radius: 24px; }
          .modal-body-p-0 { border-radius: 24px; }
        }
      `}</style>
    </div>
  );
};

export default ManageTickets;
