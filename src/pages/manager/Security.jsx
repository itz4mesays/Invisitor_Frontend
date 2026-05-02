import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MoreVertical, Eye, Trash2, Shield, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OFFICERS = [
  { id: 'O001', name: 'James Wilson', email: 'james@estate.com', phone: '+234 801 234 5678', type: 'Security Officer', shift: 'Morning (6AM - 2PM)', badge: 'SEC001', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { id: 'O002', name: 'Maria Okonkwo', email: 'maria@estate.com', phone: '+234 802 345 6789', type: 'Front Desk Officer', shift: 'Afternoon (2PM - 10PM)', badge: 'FD001', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
  { id: 'O003', name: 'Samuel Benson', email: 'samuel@estate.com', phone: '+234 803 456 7890', type: 'Security Officer', shift: 'Night (10PM - 6AM)', badge: 'SEC002', status: 'inactive', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel' },
  { id: 'O004', name: 'Adaeze Eze', email: 'adaeze@estate.com', phone: '+234 804 567 8901', type: 'Front Desk Officer', shift: 'Morning (6AM - 2PM)', badge: 'FD002', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Adaeze' },
];

const Security = () => {
  const navigate = useNavigate();
  const [officers, setOfficers] = useState(OFFICERS);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = officers.filter(o => {
    if (filterType !== 'all' && o.type !== filterType) return false;
    const q = search.toLowerCase();
    if (q && !o.name.toLowerCase().includes(q) && !o.badge.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="sec-page">
      <div className="sec-header">
        <div>
          <h1>Security Management</h1>
          <p>Manage your security and front desk officers.</p>
        </div>
        <button className="sec-btn-add" onClick={() => navigate('/manager/security/add-officer')}>
          <Plus size={18} /> Add Officer
        </button>
      </div>

      <div className="sec-controls">
        <div className="sec-search">
          <Search size={16} />
          <input placeholder="Search by name or badge..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="sec-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="Security Officer">Security Officer</option>
          <option value="Front Desk Officer">Front Desk Officer</option>
        </select>
      </div>

      <div className="sec-table-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="sec-table">
            <thead>
              <tr><th>Officer</th><th>Type</th><th>Badge</th><th>Shift</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td>
                    <div className="sec-officer-cell">
                      <img src={o.avatar} alt={o.name} />
                      <div><p className="sec-officer-name">{o.name}</p><p className="sec-officer-email">{o.email}</p></div>
                    </div>
                  </td>
                  <td>
                    <div className="sec-type-badge">
                      <Shield size={14} />
                      <span>{o.type}</span>
                    </div>
                  </td>
                  <td><code className="sec-badge">{o.badge}</code></td>
                  <td>
                    <div className="sec-shift-cell"><Clock size={14} /><span>{o.shift}</span></div>
                  </td>
                  <td>
                    <span className={`sec-status ${o.status}`}>{o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span>
                  </td>
                  <td>
                    <div className="sec-action-wrap">
                      <button className="sec-btn-dots" onClick={() => setActiveDropdown(activeDropdown === o.id ? null : o.id)}>
                        <MoreVertical size={18} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === o.id && (
                          <>
                            <div className="sec-drop-overlay" onClick={() => setActiveDropdown(null)} />
                            <motion.div className="sec-dropdown" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                              <button onClick={() => setActiveDropdown(null)}><Eye size={15} /> View Details</button>
                              <button className="delete" onClick={() => { setDeleteId(o.id); setActiveDropdown(null); }}><Trash2 size={15} /> Remove</button>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>No officers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteId && (
        <div className="sec-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="sec-modal" onClick={e => e.stopPropagation()}>
            <div className="sec-modal-icon"><Trash2 size={32} /></div>
            <h3>Remove Officer?</h3>
            <p>This officer will be permanently removed from the system.</p>
            <div className="sec-modal-actions">
              <button className="btn-confirm" onClick={() => { setOfficers(p => p.filter(o => o.id !== deleteId)); setDeleteId(null); }}>Confirm Remove</button>
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .sec-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .sec-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
        .sec-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin-bottom: 0.25rem; }
        .sec-header p { color: #64748b; }
        .sec-btn-add { background: #0d2331; color: white; border: none; padding: 0.875rem 1.5rem; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; }
        .sec-controls { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .sec-search { flex: 1; min-width: 200px; display: flex; align-items: center; gap: 0.75rem; background: white; padding: 0.75rem 1rem; border: 1px solid #e2e8f0; border-radius: 10px; color: #94a3b8; }
        .sec-search input { flex: 1; border: none; outline: none; background: none; font-size: 0.875rem; color: #1e293b; }
        .sec-select { background: white; border: 1px solid #e2e8f0; padding: 0.75rem 1rem; border-radius: 10px; font-size: 0.875rem; cursor: pointer; outline: none; }
        .sec-table-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; }
        .sec-table { width: 100%; border-collapse: collapse; min-width: 600px; }
        .sec-table th { padding: 1rem 1.25rem; font-size: 0.75rem; font-weight: 700; color: #64748b; text-align: left; background: #f8fafc; border-bottom: 1px solid #f1f5f9; }
        .sec-table td { padding: 1.125rem 1.25rem; font-size: 0.875rem; border-bottom: 1px solid #f8fafc; }
        .sec-table tbody tr:last-child td { border-bottom: none; }
        .sec-officer-cell { display: flex; align-items: center; gap: 0.875rem; }
        .sec-officer-cell img { width: 40px; height: 40px; border-radius: 50%; }
        .sec-officer-name { font-weight: 700; color: #1e293b; margin: 0; }
        .sec-officer-email { font-size: 0.75rem; color: #94a3b8; margin: 0; }
        .sec-type-badge { display: flex; align-items: center; gap: 6px; color: #475569; }
        .sec-badge { background: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-size: 0.8125rem; font-weight: 700; }
        .sec-shift-cell { display: flex; align-items: center; gap: 6px; font-size: 0.8125rem; color: #64748b; }
        .sec-status { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }
        .sec-status.active { background: #dcfce7; color: #15803d; }
        .sec-status.inactive { background: #fee2e2; color: #dc2626; }
        .sec-action-wrap { position: relative; display: inline-block; }
        .sec-btn-dots { background: none; border: none; cursor: pointer; color: #94a3b8; display: flex; align-items: center; padding: 4px; border-radius: 6px; }
        .sec-btn-dots:hover { background: #f1f5f9; }
        .sec-drop-overlay { position: fixed; inset: 0; z-index: 90; }
        .sec-dropdown { position: absolute; right: 0; top: calc(100% + 4px); background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); z-index: 100; min-width: 140px; overflow: hidden; }
        .sec-dropdown button { display: flex; align-items: center; gap: 8px; padding: 0.75rem 1rem; font-size: 0.875rem; font-weight: 600; color: #1e293b; background: none; border: none; width: 100%; cursor: pointer; text-align: left; }
        .sec-dropdown button:hover { background: #f8fafc; }
        .sec-dropdown button.delete { color: #ef4444; }
        .sec-dropdown button.delete:hover { background: #fef2f2; }
        .sec-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
        .sec-modal { background: white; border-radius: 20px; padding: 2.5rem; max-width: 400px; width: 100%; text-align: center; }
        .sec-modal-icon { width: 64px; height: 64px; border-radius: 50%; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
        .sec-modal h3 { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin-bottom: 0.75rem; }
        .sec-modal p { font-size: 0.875rem; color: #64748b; margin-bottom: 1.5rem; }
        .sec-modal-actions { display: flex; gap: 0.75rem; }
        .btn-confirm { flex: 1; background: #ef4444; color: white; border: none; padding: 0.875rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .btn-cancel { flex: 1; background: white; border: 1px solid #e2e8f0; color: #1e293b; padding: 0.875rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        @media (max-width: 768px) {
          .sec-header { flex-direction: column; }
          .sec-btn-add { width: 100%; justify-content: center; }
          .sec-controls { flex-direction: column; }
          .sec-search { width: 100%; }
          .sec-select { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Security;
