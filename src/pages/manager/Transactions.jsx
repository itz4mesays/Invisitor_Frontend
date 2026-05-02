import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, Download, Search, Filter } from 'lucide-react';
import Pagination from '../../components/Pagination';

const TRANSACTIONS = [
  { id: 'TXN-001', plan: 'Enterprise', amount: '₦250,000', date: '2026-04-01', method: 'Card', status: 'successful' },
  { id: 'TXN-002', plan: 'Standard', amount: '₦120,000', date: '2026-03-01', method: 'Transfer', status: 'successful' },
  { id: 'TXN-003', plan: 'Enterprise', amount: '₦250,000', date: '2026-02-01', method: 'Card', status: 'successful' },
  { id: 'TXN-004', plan: 'Standard', amount: '₦120,000', date: '2026-01-01', method: 'Transfer', status: 'failed' },
  { id: 'TXN-005', plan: 'Enterprise', amount: '₦250,000', date: '2025-12-01', method: 'Card', status: 'successful' },
  { id: 'TXN-006', plan: 'Standard', amount: '₦120,000', date: '2025-11-01', method: 'Transfer', status: 'successful' },
];

const STATUS_COLORS = {
  successful: { bg: '#f0fdf4', color: '#16a34a' },
  failed: { bg: '#fef2f2', color: '#dc2626' },
  pending: { bg: '#fffbeb', color: '#d97706' },
};

const ManagerTransactions = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filtered = TRANSACTIONS.filter(t => {
    const q = search.toLowerCase();
    if (q && !t.id.toLowerCase().includes(q) && !t.plan.toLowerCase().includes(q) && !t.method.toLowerCase().includes(q)) return false;
    return true;
  });

  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const stats = [
    { label: 'Total Payments', value: '₦1,110,000', icon: <CreditCard size={20} />, color: '#6366f1', bg: '#eef2ff' },
    { label: 'Successful', value: '5', icon: <TrendingUp size={20} />, color: '#22c55e', bg: '#f0fdf4' },
    { label: 'Current Plan', value: 'Enterprise', icon: <CreditCard size={20} />, color: '#f59e0b', bg: '#fffbeb' },
    { label: 'Next Renewal', value: 'May 1, 2027', icon: <Filter size={20} />, color: '#0d2331', bg: '#f1f5f9' },
  ];

  return (
    <div className="mtx-page">
      <div className="mtx-header">
        <div><h1>Subscription Transactions</h1><p>History of your Invisitor platform subscription payments.</p></div>
        <button className="mtx-btn-export"><Download size={18} /> Export</button>
      </div>

      <div className="mtx-stats">
        {stats.map((s, i) => (
          <motion.div key={i} className="mtx-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="mtx-stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div>
              <span className="mtx-stat-label">{s.label}</span>
              <span className="mtx-stat-value">{s.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mtx-table-card">
        <div className="mtx-toolbar">
          <h2>Payment History</h2>
          <div className="mtx-search">
            <Search size={15} />
            <input placeholder="Search transactions..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="mtx-table">
            <thead>
              <tr><th>Transaction ID</th><th>Plan</th><th>Amount</th><th>Date</th><th>Method</th><th>Status</th></tr>
            </thead>
            <tbody>
              {paginated.map(t => {
                const sc = STATUS_COLORS[t.status] || {};
                return (
                  <tr key={t.id}>
                    <td><code style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: 6, fontWeight: 700 }}>{t.id}</code></td>
                    <td style={{ fontWeight: 600 }}>{t.plan}</td>
                    <td style={{ fontWeight: 700, color: '#0d2331' }}>{t.amount}</td>
                    <td style={{ color: '#64748b' }}>{t.date}</td>
                    <td style={{ color: '#64748b' }}>{t.method}</td>
                    <td><span style={{ background: sc.bg, color: sc.color, padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700 }}>{t.status.charAt(0).toUpperCase() + t.status.slice(1)}</span></td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>No transactions found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination currentPage={currentPage} totalCount={filtered.length} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={() => {}} />
      </div>

      <style jsx>{`
        .mtx-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .mtx-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
        .mtx-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin-bottom: 0.25rem; }
        .mtx-header p { color: #64748b; }
        .mtx-btn-export { background: white; border: 1px solid #e2e8f0; padding: 0.75rem 1.25rem; border-radius: 12px; font-weight: 700; color: #0d2331; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
        .mtx-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .mtx-stat-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; }
        .mtx-stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .mtx-stat-label { display: block; font-size: 0.75rem; color: #94a3b8; font-weight: 600; }
        .mtx-stat-value { display: block; font-size: 1.25rem; font-weight: 800; color: #1e293b; }
        .mtx-table-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.5rem; }
        .mtx-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem; }
        .mtx-toolbar h2 { font-size: 1.125rem; font-weight: 800; color: #1e293b; }
        .mtx-search { display: flex; align-items: center; gap: 0.5rem; background: #f8fafc; border: 1px solid #e2e8f0; padding: 0.5rem 1rem; border-radius: 8px; color: #94a3b8; }
        .mtx-search input { border: none; background: none; outline: none; font-size: 0.8125rem; width: 200px; color: #1e293b; }
        .mtx-table { width: 100%; border-collapse: collapse; min-width: 580px; }
        .mtx-table th { padding: 0.875rem 0; font-size: 0.75rem; font-weight: 600; color: #94a3b8; border-bottom: 1px solid #f1f5f9; text-align: left; }
        .mtx-table td { padding: 1rem 0; font-size: 0.875rem; border-bottom: 1px solid #f8fafc; }
        .mtx-table tbody tr:last-child td { border-bottom: none; }
        @media (max-width: 1100px) { .mtx-stats { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) {
          .mtx-header { flex-direction: column; }
          .mtx-btn-export { width: 100%; justify-content: center; }
          .mtx-stats { grid-template-columns: 1fr; }
          .mtx-toolbar { flex-direction: column; align-items: flex-start; }
          .mtx-search { width: 100%; }
          .mtx-search input { width: 100%; }
          .mtx-table-card { padding: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default ManagerTransactions;
