import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Search, Filter, Calendar, User, Shield, Download, Eye, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Pagination from '../../components/Pagination';

const STATUS_COLORS = {
  active: { bg: 'var(--bg-success-subtle)', color: 'var(--text-success)' },
  expired: { bg: 'var(--bg-muted)', color: 'var(--text-tertiary)' },
  used: { bg: '#eff6ff', color: 'var(--accent-primary)' },
  revoked: { bg: 'var(--bg-danger-subtle)', color: '#dc2626' },
};

const ALL_QR_CODES = [
  { id: 'QR-001', code: 'INV-7H2A', visitorName: 'Dr. Alison Ogaga', visitorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alison', createdBy: 'David Fayemi', createdByRole: 'Host', createdAt: '2024-11-20', expiresAt: '2024-11-20', purpose: 'Medical Visit', status: 'used' },
  { id: 'QR-002', code: 'INV-3KP9', visitorName: 'Mr. James Wilson', visitorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', createdBy: 'Sarah Johnson', createdByRole: 'Resident', createdAt: '2024-11-18', expiresAt: '2024-11-25', purpose: 'Business Meeting', status: 'active' },
  { id: 'QR-003', code: 'INV-9LM4', visitorName: 'Ms. Sarah Connor', visitorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahC', createdBy: 'David Fayemi', createdByRole: 'Host', createdAt: '2024-11-15', expiresAt: '2024-11-15', purpose: 'Social Visit', status: 'expired' },
  { id: 'QR-004', code: 'INV-2RT7', visitorName: 'Mrs. Grace Olu', visitorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace', createdBy: 'Emily Davis', createdByRole: 'Resident', createdAt: '2024-11-22', expiresAt: '2024-11-30', purpose: 'Family Visit', status: 'active' },
  { id: 'QR-005', code: 'INV-5NB6', visitorName: 'Mr. Victor Salisu', visitorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Victor', createdBy: 'David Fayemi', createdByRole: 'Host', createdAt: '2024-11-24', expiresAt: '2024-11-28', purpose: 'Delivery', status: 'active' },
  { id: 'QR-006', code: 'INV-8XC2', visitorName: 'Elizabeth Ateli', visitorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElizabethA', createdBy: 'Front Desk Officer', createdByRole: 'Front Desk', createdAt: '2024-11-10', expiresAt: '2024-11-12', purpose: 'Contractor', status: 'revoked' },
  { id: 'QR-007', code: 'INV-6PQ1', visitorName: 'John Gambo', visitorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnG', createdBy: 'David Fayemi', createdByRole: 'Host', createdAt: '2024-11-05', expiresAt: '2024-11-08', purpose: 'Maintenance', status: 'expired' },
  { id: 'QR-008', code: 'INV-4WD8', visitorName: 'Margaret Ogunleye', visitorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Margaret', createdBy: 'John Smith', createdByRole: 'Resident', createdAt: '2024-11-26', expiresAt: '2024-12-03', purpose: 'Social Visit', status: 'active' },
  { id: 'QR-009', code: 'INV-1RY5', visitorName: 'Michael Okujagu', visitorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelO', createdBy: 'Sarah Johnson', createdByRole: 'Resident', createdAt: '2024-11-28', expiresAt: '2024-12-05', purpose: 'VIP Visit', status: 'active' },
  { id: 'QR-010', code: 'INV-0KT3', visitorName: 'Rebecca Anigbogu', visitorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rebecca', createdBy: 'David Fayemi', createdByRole: 'Host', createdAt: '2024-11-29', expiresAt: '2024-12-01', purpose: 'Interview', status: 'used' },
  { id: 'QR-011', code: 'INV-7BN9', visitorName: 'Esther Agu', visitorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Esther', createdBy: 'Emily Davis', createdByRole: 'Resident', createdAt: '2024-11-30', expiresAt: '2024-12-07', purpose: 'Business Meeting', status: 'active' },
  { id: 'QR-012', code: 'INV-3TC6', visitorName: 'David Awolowo', visitorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidA', createdBy: 'Front Desk Officer', createdByRole: 'Front Desk', createdAt: '2024-12-01', expiresAt: '2024-12-02', purpose: 'Delivery', status: 'active' },
];

const STATUSES = { all: 'All', active: 'Active', used: 'Used', expired: 'Expired', revoked: 'Revoked' };

const ManageQRCodes = () => {
  const location = useLocation();
  const role = location.pathname.split('/')[1];
  
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [selectedQr, setSelectedQr] = useState(null);

  const filtered = useMemo(() => {
    return ALL_QR_CODES.filter(qr => {
      if (filterStatus !== 'all' && qr.status !== filterStatus) return false;
      const q = search.toLowerCase();
      if (q && !qr.code.toLowerCase().includes(q) && !qr.visitorName.toLowerCase().includes(q) && !qr.createdBy.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, filterStatus]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const summaryStats = {
    total: ALL_QR_CODES.length,
    active: ALL_QR_CODES.filter(q => q.status === 'active').length,
    used: ALL_QR_CODES.filter(q => q.status === 'used').length,
    expired: ALL_QR_CODES.filter(q => q.status === 'expired').length,
  };

  return (
    <div className="qr-page">
      <div className="qr-header">
        <div>
          <h1>Manage QR Codes</h1>
          <p>View and manage all generated QR codes for visitor access.</p>
        </div>
        <button className="qr-btn-export">
          <Download size={16} /> Export
        </button>
      </div>

      <div className="qr-stats-row">
        {[
          { label: 'Total QR Codes', value: summaryStats.total, color: 'var(--bg-brand)', bg: 'var(--bg-subtle)' },
          { label: 'Active', value: summaryStats.active, color: 'var(--text-success)', bg: 'var(--bg-success-subtle)' },
          { label: 'Used', value: summaryStats.used, color: 'var(--accent-primary)', bg: '#eff6ff' },
          { label: 'Expired', value: summaryStats.expired, color: 'var(--text-tertiary)', bg: 'var(--bg-muted)' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="qr-stat-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{ background: stat.bg }}
          >
            <span className="qr-stat-value" style={{ color: stat.color }}>{stat.value}</span>
            <span className="qr-stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="qr-controls">
        <div className="qr-search">
          <Search size={16} />
          <input
            placeholder="Search by code, visitor, or creator..."
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <div className="qr-status-tabs">
          {Object.entries(STATUSES).map(([key, label]) => (
            <button
              key={key}
              className={`qr-tab ${filterStatus === key ? 'active' : ''}`}
              onClick={() => { setFilterStatus(key); setCurrentPage(1); }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="qr-table-container">
        <table className="qr-table">
          <thead>
            <tr>
              <th>QR Code</th>
              <th>Visitor</th>
              <th>Created By</th>
              <th>Purpose</th>
              <th>Created</th>
              <th>Expires</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((qr, i) => {
                const sc = STATUS_COLORS[qr.status] || {};
                return (
                  <motion.tr
                    key={qr.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <td>
                      <div className="qr-code-cell">
                        <div className="qr-icon-box">
                          <QrCode size={24} color="var(--bg-brand)" />
                        </div>
                        <div>
                          <span className="qr-code-text">{qr.code}</span>
                          <span className="qr-id-text">{qr.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="qr-user-cell">
                        <img src={qr.visitorAvatar} alt="" className="qr-avatar" />
                        <span className="qr-user-name">{qr.visitorName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="qr-creator-cell">
                        <div className="qr-creator-avatar">
                          {qr.createdBy.charAt(0)}
                        </div>
                        <div>
                          <span className="qr-creator-name">{qr.createdBy}</span>
                          <span className="qr-creator-role">{qr.createdByRole}</span>
                        </div>
                      </div>
                    </td>
                    <td className="qr-purpose">{qr.purpose}</td>
                    <td className="qr-date">{qr.createdAt}</td>
                    <td className="qr-date">{qr.expiresAt}</td>
                    <td>
                      <span
                        className="qr-status-badge"
                        style={{ background: sc.bg, color: sc.color }}
                      >
                        {qr.status.charAt(0).toUpperCase() + qr.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="qr-btn-view" 
                        onClick={() => setSelectedQr(qr)}
                      >
                        <Eye size={16} /> View
                      </button>
                    </td>
                  </motion.tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="qr-empty">No QR codes found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalCount={filtered.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(s) => { setPageSize(s); setCurrentPage(1); }}
        />
      )}

      {/* QR Code Detail Modal */}
      {selectedQr && (
        <div className="qr-modal-overlay" onClick={() => setSelectedQr(null)}>
          <motion.div 
            className="qr-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="qr-modal-close" onClick={() => setSelectedQr(null)}>
              <X size={20} />
            </button>
            <div className="qr-modal-content">
              <h3>{selectedQr.visitorName}</h3>
              <p className="qr-modal-subtitle">Entry Code: <strong>{selectedQr.code}</strong></p>
              
              <div className="qr-modal-image">
                <QrCode size={120} color="var(--bg-brand)" />
              </div>
              
              <div className="qr-modal-details">
                <div className="qr-modal-row">
                  <span>Purpose:</span>
                  <strong>{selectedQr.purpose}</strong>
                </div>
                <div className="qr-modal-row">
                  <span>Created By:</span>
                  <strong>{selectedQr.createdBy} ({selectedQr.createdByRole})</strong>
                </div>
                <div className="qr-modal-row">
                  <span>Created On:</span>
                  <strong>{selectedQr.createdAt}</strong>
                </div>
                <div className="qr-modal-row">
                  <span>Expires On:</span>
                  <strong>{selectedQr.expiresAt}</strong>
                </div>
                <div className="qr-modal-row">
                  <span>Status:</span>
                  <span className="qr-status-badge" style={{ background: STATUS_COLORS[selectedQr.status]?.bg, color: STATUS_COLORS[selectedQr.status]?.color }}>
                    {selectedQr.status.charAt(0).toUpperCase() + selectedQr.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .qr-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .qr-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
        .qr-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.25rem; }
        .qr-header p { color: var(--text-tertiary); margin: 0; font-size: 0.9375rem; }
        .qr-btn-export { display: flex; align-items: center; gap: 0.5rem; background: var(--bg-surface); border: 1.5px solid var(--border-default); color: var(--bg-brand); padding: 0.75rem 1.25rem; border-radius: 10px; font-weight: 700; font-size: 0.875rem; cursor: pointer; transition: all 0.2s; }
        .qr-btn-export:hover { background: var(--bg-subtle); }

        .qr-stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .qr-stat-card { border-radius: 16px; padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 0.25rem; border: 1px solid rgba(0,0,0,0.06); }
        .qr-stat-value { font-size: 2rem; font-weight: 800; line-height: 1; }
        .qr-stat-label { font-size: 0.8125rem; color: var(--text-tertiary); font-weight: 600; }

        .qr-controls { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
        .qr-search { flex: 1; min-width: 200px; display: flex; align-items: center; gap: 0.75rem; background: var(--bg-surface); padding: 0.75rem 1rem; border: 1px solid var(--border-default); border-radius: 10px; color: var(--text-quaternary); }
        .qr-search input { flex: 1; border: none; outline: none; background: none; font-size: 0.875rem; color: var(--text-primary); }
        .qr-status-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .qr-tab { background: var(--bg-surface); border: 1px solid var(--border-default); padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8125rem; font-weight: 600; color: var(--text-tertiary); cursor: pointer; transition: all 0.2s; }
        .qr-tab.active { background: var(--bg-brand); color: var(--text-inverse); border-color: var(--bg-brand); }

        .qr-table-container { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; overflow: hidden; }
        .qr-table { width: 100%; border-collapse: collapse; }
        .qr-table th { padding: 1rem 1.25rem; font-size: 0.75rem; font-weight: 700; color: var(--text-quaternary); text-transform: uppercase; letter-spacing: 0.05em; background: var(--bg-subtle); border-bottom: 1px solid var(--bg-muted); text-align: left; white-space: nowrap; }
        .qr-table td { padding: 1.125rem 1.25rem; border-bottom: 1px solid var(--bg-subtle); vertical-align: middle; }
        .qr-table tr:last-child td { border-bottom: none; }
        .qr-table tr:hover td { background: #fafbfc; }

        .qr-code-cell { display: flex; align-items: center; gap: 0.75rem; }
        .qr-icon-box { width: 44px; height: 44px; background: var(--bg-muted); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .qr-code-text { display: block; font-weight: 800; color: var(--bg-brand); font-size: 0.9375rem; letter-spacing: 1px; }
        .qr-id-text { display: block; font-size: 0.75rem; color: var(--text-quaternary); font-weight: 500; }

        .qr-user-cell { display: flex; align-items: center; gap: 0.75rem; }
        .qr-avatar { width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--bg-muted); }
        .qr-user-name { font-weight: 700; color: var(--text-primary); font-size: 0.875rem; }

        .qr-creator-cell { display: flex; align-items: center; gap: 0.625rem; }
        .qr-creator-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--bg-brand), var(--bg-brand-hover)); color: var(--text-inverse); display: flex; align-items: center; justify-content: center; font-size: 0.875rem; font-weight: 800; flex-shrink: 0; }
        .qr-creator-name { display: block; font-size: 0.875rem; font-weight: 700; color: var(--text-primary); }
        .qr-creator-role { display: block; font-size: 0.6875rem; color: var(--text-quaternary); font-weight: 600; }

        .qr-purpose { font-size: 0.875rem; color: var(--text-tertiary); font-weight: 500; }
        .qr-date { font-size: 0.8125rem; color: var(--text-tertiary); white-space: nowrap; }
        .qr-status-badge { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; white-space: nowrap; display: inline-block; }
        .qr-empty { text-align: center; padding: 3rem; color: var(--text-quaternary); font-weight: 500; }
        .qr-btn-view { display: flex; align-items: center; gap: 0.4rem; background: transparent; border: 1px solid var(--border-default); color: var(--text-tertiary); padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .qr-btn-view:hover { background: var(--bg-subtle); color: var(--bg-brand); border-color: var(--border-heavy); }

        .qr-modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 1000; padding: 1rem; }
        .qr-modal { background: var(--bg-surface); width: 100%; max-width: 400px; border-radius: 20px; position: relative; padding: 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
        .qr-modal-close { position: absolute; top: 1.25rem; right: 1.25rem; background: var(--bg-muted); border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); cursor: pointer; transition: all 0.2s; }
        .qr-modal-close:hover { background: var(--border-default); color: var(--text-primary); }
        .qr-modal-content { text-align: center; }
        .qr-modal-content h3 { font-size: 1.25rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.25rem; }
        .qr-modal-subtitle { font-size: 0.875rem; color: var(--text-tertiary); margin: 0 0 1.5rem; }
        .qr-modal-image { background: var(--bg-subtle); width: 160px; height: 160px; margin: 0 auto 1.5rem; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .qr-modal-details { display: flex; flex-direction: column; gap: 0.75rem; text-align: left; background: var(--bg-subtle); padding: 1.25rem; border-radius: 12px; }
        .qr-modal-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.8125rem; }
        .qr-modal-row span:first-child { color: var(--text-tertiary); }
        .qr-modal-row strong { color: var(--text-primary); font-weight: 700; }

        @media (max-width: 1024px) {
          .qr-stats-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .qr-stats-row { grid-template-columns: 1fr 1fr; }
          .qr-controls { flex-direction: column; align-items: stretch; }
          .qr-table-container { overflow-x: auto; }
          .qr-table { min-width: 700px; }
        }
        @media (max-width: 480px) {
          .qr-stats-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default ManageQRCodes;
