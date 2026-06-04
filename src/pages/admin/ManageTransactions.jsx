import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, CreditCard, DollarSign, X } from 'lucide-react';

const ManageTransactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showToast, setShowToast] = useState(false);
  
  const transactions = [
    { id: 'TRX-98231', user: 'TechCorp Industries', role: 'Host', type: 'Subscription Payment', amount: '₦499,000.00', date: 'Today, 10:23 AM', status: 'Completed', method: 'Credit Card', ref: 'REF-8389201' },
    { id: 'TRX-98230', user: 'Victoria Garden City', role: 'Estate Manager', type: 'Plan Upgrade', amount: '₦850,000.00', date: 'Yesterday, 02:15 PM', status: 'Completed', method: 'Bank Transfer', ref: 'REF-8389202' },
    { id: 'TRX-98229', user: 'Alice Williams', role: 'Resident', type: 'Service Fee', amount: '₦25,000.00', date: 'Oct 12, 2023', status: 'Pending', method: 'Debit Card', ref: 'REF-8389203' },
    { id: 'TRX-98228', user: 'Global Finance LLC', role: 'Host', type: 'Subscription Payment', amount: '₦299,000.00', date: 'Oct 10, 2023', status: 'Failed', method: 'Credit Card', ref: 'REF-8389204' },
  ];

  const handleDownload = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return { bg: 'var(--bg-success-subtle)', color: 'var(--text-success)' };
      case 'Pending': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' };
      case 'Failed': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      default: return { bg: 'var(--bg-subtle)', color: 'var(--text-secondary)' };
    }
  };

  return (
    <div className="admin-page" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Global Transactions</h1>
          <p style={{ color: 'var(--text-secondary)' }}>View and manage all system-wide payments and invoices.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={18} /> Export Statement
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {[{ label: 'Total Revenue', val: '₦12,450,000.00', icon: <DollarSign size={20}/>, c: 'var(--bg-brand)' },
          { label: 'Pending Payments', val: '₦325,000.00', icon: <CreditCard size={20}/>, c: '#f59e0b' },
          { label: 'Failed Transactions', val: '₦85,000.00', icon: <ArrowDownRight size={20}/>, c: '#ef4444' }].map((stat, idx) => (
          <div key={idx} style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${stat.c}15`, color: stat.c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{stat.label}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stat.val}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search transaction ID or user..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <Filter size={18} /> Filter by Date
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-default)' }}>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>TRANSACTION ID</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>USER / ROLE</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>TYPE & METHOD</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>AMOUNT</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>STATUS</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>DATE</th>
              </tr>
            </thead>
            <tbody>
              {transactions.filter(t => t.id.toLowerCase().includes(searchTerm.toLowerCase()) || t.user.toLowerCase().includes(searchTerm.toLowerCase())).map((trx) => {
                const statusStyles = getStatusColor(trx.status);
                return (
                  <tr key={trx.id} onClick={() => setSelectedTransaction(trx)} style={{ borderBottom: '1px solid var(--border-default)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{trx.id}</td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem' }}>{trx.user}</div>
                      <div style={{ color: 'var(--text-quaternary)', fontSize: '0.8rem' }}>{trx.role}</div>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{trx.type}</div>
                      <div style={{ color: 'var(--text-quaternary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <CreditCard size={12} /> {trx.method}
                      </div>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-primary)', fontWeight: 700, fontSize: '1rem' }}>{trx.amount}</td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <span style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, background: statusStyles.bg, color: statusStyles.color }}>
                        {trx.status}
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{trx.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Single Transaction Slide-over */}
      <AnimatePresence>
        {selectedTransaction && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedTransaction(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000 }} 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px', background: 'var(--bg-surface)', zIndex: 1001, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-subtle)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Transaction Details</h2>
                <button onClick={() => setSelectedTransaction(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem', textAlign: 'center' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-subtle)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <CreditCard size={32} />
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800 }}>{selectedTransaction.amount}</h3>
                  <span style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, ...getStatusColor(selectedTransaction.status) }}>
                    {selectedTransaction.status}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-subtle)', paddingBottom: '1rem' }}>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Transaction ID</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{selectedTransaction.id}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-subtle)', paddingBottom: '1rem' }}>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Reference</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{selectedTransaction.ref}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-subtle)', paddingBottom: '1rem' }}>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Date & Time</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{selectedTransaction.date}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-subtle)', paddingBottom: '1rem' }}>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Billed To</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem', textAlign: 'right' }}>
                      {selectedTransaction.user}<br/><span style={{ color: 'var(--text-quaternary)', fontWeight: 400 }}>{selectedTransaction.role}</span>
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-subtle)', paddingBottom: '1rem' }}>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Payment Method</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{selectedTransaction.method}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Description</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{selectedTransaction.type}</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-default)', background: 'var(--bg-subtle)' }}>
                <button className="btn btn-primary" onClick={handleDownload} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Download size={18} /> Download Receipt
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
            style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: 'var(--bg-success-subtle)', color: 'var(--text-success)', padding: '1rem 1.5rem', borderRadius: '8px', fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 2000 }}
          >
            Receipt downloaded successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageTransactions;
