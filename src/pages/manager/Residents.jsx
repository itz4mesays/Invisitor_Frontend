import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, Eye, Trash2, Home, Phone, Mail } from 'lucide-react';

const RESIDENTS = [
  { id: 'R001', name: 'John Smith', email: 'john@email.com', phone: '+234 801 234 5678', unit: 'Block A, Apt 101', type: 'Tenant', status: 'occupying', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: 'R002', name: 'Sarah Johnson', email: 'sarah@email.com', phone: '+234 802 345 6789', unit: 'Block B, Apt 205', type: 'Property Owner', status: 'occupying', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 'R003', name: 'Michael Brown', email: 'michael@email.com', phone: '+234 803 456 7890', unit: 'Block C, Apt 312', type: 'Tenant', status: 'vacant', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  { id: 'R004', name: 'Emily Davis', email: 'emily@email.com', phone: '+234 804 567 8901', unit: 'Block D, Apt 415', type: 'Tenant', status: 'occupying', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
  { id: 'R005', name: 'David Wilson', email: 'david@email.com', phone: '+234 805 678 9012', unit: 'Block A, Apt 102', type: 'Property Owner', status: 'occupying', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
  { id: 'R006', name: 'Grace Olu', email: 'grace@email.com', phone: '+234 806 789 0123', unit: 'Block B, Apt 206', type: 'Tenant', status: 'vacant', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace' },
];

const Residents = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteId, setDeleteId] = useState(null);
  const [residents, setResidents] = useState(RESIDENTS);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const filtered = residents.filter(r => {
    if (filterType !== 'all' && r.type.toLowerCase().replace(' ', '-') !== filterType) return false;
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    const q = search.toLowerCase();
    if (q && !r.name.toLowerCase().includes(q) && !r.email.toLowerCase().includes(q) && !r.unit.toLowerCase().includes(q)) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="res-page">
      <div className="res-header">
        <div>
          <h1>Residents</h1>
          <p>Manage all estate residents and their unit assignments.</p>
        </div>
        <button className="res-btn-add" onClick={() => navigate('/manager/residents/add')}>
          <Plus size={18} /> Add New Resident
        </button>
      </div>

      <div className="res-controls">
        <div className="res-search">
          <Search size={16} />
          <input type="text" placeholder="Search by name, email or unit..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />
        </div>
        <div className="res-filters">
          <select value={filterType} onChange={e => { setFilterType(e.target.value); setCurrentPage(1); }}>
            <option value="all">All Types</option>
            <option value="tenant">Tenant</option>
            <option value="property-owner">Property Owner</option>
          </select>
          <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
            <option value="all">All Status</option>
            <option value="occupying">Occupying</option>
            <option value="vacant">Vacant</option>
          </select>
        </div>
      </div>

      <div className="res-grid">
        {paginated.map((r, i) => (
          <motion.div key={r.id} className="res-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="res-card-header">
              <img src={r.avatar} alt={r.name} className="res-avatar" />
              <div className="res-card-info">
                <h3>{r.name}</h3>
                <span className={`res-status-badge ${r.status}`}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
              </div>
              <span className="res-type-badge">{r.type}</span>
            </div>
            <div className="res-card-details">
              <div className="res-detail"><Home size={14} /><span>{r.unit}</span></div>
              <div className="res-detail"><Mail size={14} /><span>{r.email}</span></div>
              <div className="res-detail"><Phone size={14} /><span>{r.phone}</span></div>
            </div>
            <div className="res-card-actions">
              <button className="res-btn-view" onClick={() => navigate(`/manager/residents/${r.id}`)}><Eye size={15} /> View</button>
              <button className="res-btn-delete" onClick={() => setDeleteId(r.id)}><Trash2 size={15} /></button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-quaternary)' }}>No residents found.</div>
      )}

      {totalPages > 1 && (
        <div className="res-pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </div>
      )}

      {deleteId && (
        <div className="res-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="res-modal" onClick={e => e.stopPropagation()}>
            <div className="res-modal-icon"><Trash2 size={32} /></div>
            <h3>Delete Resident?</h3>
            <p>This action cannot be undone.</p>
            <div className="res-modal-actions">
              <button className="res-btn-confirm-delete" onClick={() => { setResidents(p => p.filter(r => r.id !== deleteId)); setDeleteId(null); }}>Yes, Delete</button>
              <button className="res-btn-cancel-modal" onClick={() => setDeleteId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .res-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .res-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
        .res-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
        .res-header p { color: var(--text-tertiary); font-size: 0.9375rem; }
        .res-btn-add { background: var(--bg-brand); color: var(--text-inverse); border: none; padding: 0.875rem 1.5rem; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; }
        .res-controls { display: flex; gap: 1rem; flex-wrap: wrap; }
        .res-search { flex: 1; min-width: 200px; display: flex; align-items: center; gap: 0.75rem; background: var(--bg-surface); padding: 0.75rem 1rem; border: 1px solid var(--border-default); border-radius: 10px; color: var(--text-quaternary); }
        .res-search input { flex: 1; border: none; outline: none; background: none; font-size: 0.875rem; color: var(--text-primary); }
        .res-filters { display: flex; gap: 0.75rem; flex-wrap: wrap; }
        .res-filters select { background: var(--bg-surface); border: 1px solid var(--border-default); padding: 0.75rem 1rem; border-radius: 10px; font-size: 0.875rem; cursor: pointer; outline: none; }
        .res-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .res-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; }
        .res-card-header { display: flex; align-items: center; gap: 1rem; }
        .res-avatar { width: 56px; height: 56px; border-radius: 50%; border: 3px solid var(--bg-muted); flex-shrink: 0; }
        .res-card-info { flex: 1; }
        .res-card-info h3 { font-size: 1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
        .res-status-badge { padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: capitalize; }
        .res-status-badge.occupying { background: var(--bg-success-subtle); color: var(--text-success); }
        .res-status-badge.vacant { background: #fef3c7; color: #d97706; }
        .res-type-badge { background: var(--bg-muted); color: var(--text-secondary); padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; white-space: nowrap; }
        .res-card-details { display: flex; flex-direction: column; gap: 0.5rem; }
        .res-detail { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--text-tertiary); }
        .res-detail span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .res-card-actions { display: flex; gap: 0.75rem; align-items: center; }
        .res-btn-view { flex: 1; background: var(--bg-brand); color: var(--text-inverse); border: none; padding: 0.625rem; border-radius: 10px; font-weight: 700; font-size: 0.8125rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.4rem; }
        .res-btn-delete { background: var(--bg-danger-subtle); color: var(--text-danger); border: none; padding: 0.625rem; border-radius: 10px; cursor: pointer; display: flex; align-items: center; }
        .res-pagination { display: flex; align-items: center; justify-content: center; gap: 1rem; padding-top: 1rem; }
        .res-pagination button { background: var(--bg-surface); border: 1px solid var(--border-default); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.875rem; }
        .res-pagination button:disabled { opacity: 0.4; cursor: not-allowed; }
        .res-pagination span { font-size: 0.875rem; color: var(--text-tertiary); }
        .res-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
        .res-modal { background: var(--bg-surface); border-radius: 20px; padding: 2.5rem; max-width: 400px; width: 100%; text-align: center; }
        .res-modal-icon { width: 64px; height: 64px; border-radius: 50%; background: var(--bg-danger-subtle); color: var(--text-danger); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
        .res-modal h3 { font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.75rem; }
        .res-modal p { font-size: 0.875rem; color: var(--text-tertiary); margin-bottom: 1.5rem; }
        .res-modal-actions { display: flex; gap: 0.75rem; }
        .res-btn-confirm-delete { flex: 1; background: var(--text-danger); color: var(--text-inverse); border: none; padding: 0.875rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .res-btn-cancel-modal { flex: 1; background: var(--bg-surface); border: 1px solid var(--border-default); color: var(--text-primary); padding: 0.875rem; border-radius: 12px; font-weight: 700; cursor: pointer; }
        @media (max-width: 1024px) { .res-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .res-header { flex-direction: column; }
          .res-btn-add { width: 100%; justify-content: center; }
          .res-controls { flex-direction: column; }
          .res-search, .res-filters { width: 100%; }
          .res-filters select { flex: 1; }
          .res-grid { grid-template-columns: 1fr; }
          .res-pagination { flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
};

export default Residents;
