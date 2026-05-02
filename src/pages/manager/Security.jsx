import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Eye, Trash2, Shield, Clock, Mail, Phone, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from '../../components/Pagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const filtered = officers.filter(o => {
    if (filterType !== 'all' && o.type !== filterType) return false;
    const q = search.toLowerCase();
    if (q && !o.name.toLowerCase().includes(q) && !o.badge.toLowerCase().includes(q)) return false;
    return true;
  });

  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="sec-page">
      <div className="sec-header">
        <div>
          <h1>Security Management</h1>
          <p>Manage your security and front desk officers.</p>
        </div>
        <button className="sec-btn-add" onClick={() => navigate('/manager/security/add')}>
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

      <div className="sec-grid">
        {paginated.map((o, i) => (
          <motion.div key={o.id} className="sec-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="sec-card-header">
              <img src={o.avatar} alt={o.name} className="sec-avatar" />
              <div className="sec-card-info">
                <h3>{o.name}</h3>
                <span className={`sec-status-badge ${o.status}`}>{o.status.charAt(0).toUpperCase() + o.status.slice(1)}</span>
              </div>
              <span className="sec-type-badge">{o.type}</span>
            </div>
            <div className="sec-card-details">
              <div className="sec-detail"><Mail size={14} /><span>{o.email}</span></div>
              <div className="sec-detail"><Phone size={14} /><span>{o.phone}</span></div>
              <div className="sec-detail"><Clock size={14} /><span>{o.shift}</span></div>
              <div className="sec-detail"><Key size={14} /><span>Badge: {o.badge}</span></div>
            </div>
            <div className="sec-card-actions">
              <button className="sec-btn-view" onClick={() => navigate(`/manager/security/${o.id}`)}><Eye size={15} /> View</button>
              <button className="sec-btn-delete" onClick={() => setDeleteId(o.id)}><Trash2 size={15} /></button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>No officers found.</div>
      )}

      {filtered.length > 0 && (
        <Pagination
          totalCount={filtered.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      )}

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
        
        .sec-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .sec-card { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .sec-card-header { display: flex; align-items: center; gap: 1rem; }
        .sec-avatar { width: 56px; height: 56px; border-radius: 50%; border: 3px solid #f1f5f9; flex-shrink: 0; }
        .sec-card-info { flex: 1; }
        .sec-card-info h3 { font-size: 1rem; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
        .sec-status-badge { padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: capitalize; }
        .sec-status-badge.active { background: #dcfce7; color: #15803d; }
        .sec-status-badge.inactive { background: #fee2e2; color: #dc2626; }
        .sec-type-badge { background: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; white-space: nowrap; }
        .sec-card-details { display: flex; flex-direction: column; gap: 0.5rem; }
        .sec-detail { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: #64748b; }
        .sec-detail span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .sec-card-actions { display: flex; gap: 0.75rem; align-items: center; }
        .sec-btn-view { flex: 1; background: #0d2331; color: white; border: none; padding: 0.625rem; border-radius: 10px; font-weight: 700; font-size: 0.8125rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.4rem; }
        .sec-btn-delete { background: #fef2f2; color: #ef4444; border: none; padding: 0.625rem; border-radius: 10px; cursor: pointer; display: flex; align-items: center; }

        .sec-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
        .sec-modal { background: white; border-radius: 20px; padding: 2.5rem; max-width: 400px; width: 100%; text-align: center; }
        .sec-modal-icon { width: 64px; height: 64px; border-radius: 50%; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
        .sec-modal h3 { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin-bottom: 0.75rem; }
        .sec-modal p { font-size: 0.875rem; color: #64748b; margin-bottom: 1.5rem; }
        .sec-modal-actions { display: flex; gap: 0.75rem; }
        .btn-confirm { flex: 1; background: #ef4444; color: white; border: none; padding: 0.875rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .btn-cancel { flex: 1; background: white; border: 1px solid #e2e8f0; color: #1e293b; padding: 0.875rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        
        @media (max-width: 1024px) {
          .sec-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .sec-header { flex-direction: column; }
          .sec-btn-add { width: 100%; justify-content: center; }
          .sec-controls { flex-direction: column; }
          .sec-search { width: 100%; }
          .sec-select { width: 100%; }
          .sec-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Security;
