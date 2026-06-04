import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, FileText, CheckCircle, Clock, X, CreditCard, AlertTriangle } from 'lucide-react';

const ManageInvoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState({ datePaid: '', description: '' });
  const [invoices, setInvoices] = useState([
    { id: 'INV-2023-1001', user: 'TechCorp Industries', role: 'Host', amount: '₦499,000.00', dueDate: 'Nov 01, 2023', status: 'Due', items: [{ desc: 'Enterprise Subscription (Monthly)', amount: '₦499,000.00' }] },
    { id: 'INV-2023-1002', user: 'Victoria Garden City', role: 'Estate Manager', amount: '₦850,000.00', dueDate: 'Oct 15, 2023', status: 'Paid', items: [{ desc: 'Pro Plan (Quarterly)', amount: '₦850,000.00' }] },
    { id: 'INV-2023-1003', user: 'Global Finance LLC', role: 'Host', amount: '₦299,000.00', dueDate: 'Oct 10, 2023', status: 'Unpaid', items: [{ desc: 'Basic Subscription (Monthly)', amount: '₦299,000.00' }] },
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return { bg: 'var(--bg-success-subtle)', color: 'var(--text-success)' };
      case 'Due': return { bg: 'rgba(0, 144, 230, 0.1)', color: 'var(--bg-brand)' };
      case 'Unpaid': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      default: return { bg: 'var(--bg-subtle)', color: 'var(--text-secondary)' };
    }
  };

  const handleMarkAsPaid = (e) => {
    e.preventDefault();
    setInvoices(invoices.map(inv => inv.id === selectedInvoice.id ? { ...inv, status: 'Paid' } : inv));
    setSelectedInvoice(null);
    setShowPaymentForm(false);
    setPaymentForm({ datePaid: '', description: '' });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Manage Invoices</h1>
          <p style={{ color: 'var(--text-secondary)' }}>View and manually process system invoices.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={18} /> Export List
        </button>
      </div>

      <div className="stat-grid">
        {[{ label: 'Total Invoiced', val: '₦1,648,000.00', icon: <FileText size={20}/>, c: 'var(--bg-brand)' },
          { label: 'Unpaid / Overdue', val: '₦299,000.00', icon: <AlertTriangle size={20}/>, c: '#ef4444' },
          { label: 'Collected', val: '₦850,000.00', icon: <CheckCircle size={20}/>, c: 'var(--text-success)' }].map((stat, idx) => (
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
              placeholder="Search invoice ID or user..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <Filter size={18} /> Filter by Status
          </button>
        </div>

        <div className="table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-default)' }}>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>INVOICE #</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>BILLED TO</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>AMOUNT</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>DUE DATE</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {invoices.filter(t => t.id.toLowerCase().includes(searchTerm.toLowerCase()) || t.user.toLowerCase().includes(searchTerm.toLowerCase())).map((inv) => {
                const statusStyles = getStatusColor(inv.status);
                return (
                  <tr key={inv.id} onClick={() => setSelectedInvoice(inv)} style={{ borderBottom: '1px solid var(--border-default)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{inv.id}</td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.95rem' }}>{inv.user}</div>
                      <div style={{ color: 'var(--text-quaternary)', fontSize: '0.8rem' }}>{inv.role}</div>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-primary)', fontWeight: 700, fontSize: '1rem' }}>{inv.amount}</td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{inv.dueDate}</td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <span style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, background: statusStyles.bg, color: statusStyles.color }}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Single Invoice Slide-over */}
      <AnimatePresence>
        {selectedInvoice && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setSelectedInvoice(null); setShowPaymentForm(false); }}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000 }} 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px', background: 'var(--bg-surface)', zIndex: 1001, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-subtle)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {showPaymentForm ? 'Manual Payment' : 'Invoice Details'}
                </h2>
                <button onClick={() => { setSelectedInvoice(null); setShowPaymentForm(false); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem', textAlign: 'center' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-subtle)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <FileText size={32} />
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800 }}>{selectedInvoice.amount}</h3>
                  {!showPaymentForm && (
                    <span style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, ...getStatusColor(selectedInvoice.status) }}>
                      {selectedInvoice.status}
                    </span>
                  )}
                </div>

                {!showPaymentForm ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-subtle)', paddingBottom: '1rem' }}>
                      <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Invoice ID</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{selectedInvoice.id}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-subtle)', paddingBottom: '1rem' }}>
                      <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Due Date</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{selectedInvoice.dueDate}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--bg-subtle)', paddingBottom: '1rem' }}>
                      <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Billed To</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem', textAlign: 'right' }}>
                        {selectedInvoice.user}<br/><span style={{ color: 'var(--text-quaternary)', fontWeight: 400 }}>{selectedInvoice.role}</span>
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', fontWeight: 600 }}>Line Items</span>
                      {selectedInvoice.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
                          <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{item.desc}</span>
                          <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{item.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <form id="payment-form" onSubmit={handleMarkAsPaid} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Date Paid</label>
                      <input 
                        type="date" 
                        required 
                        value={paymentForm.datePaid}
                        onChange={(e) => setPaymentForm({...paymentForm, datePaid: e.target.value})}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }} 
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Description / Reference Note</label>
                      <textarea 
                        required 
                        rows={4}
                        placeholder="e.g. Bank Transfer Ref #123456"
                        value={paymentForm.description}
                        onChange={(e) => setPaymentForm({...paymentForm, description: e.target.value})}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none', resize: 'none' }} 
                      />
                    </div>
                  </form>
                )}
              </div>
              <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-default)', background: 'var(--bg-subtle)' }}>
                {!showPaymentForm ? (
                  <>
                    {selectedInvoice.status !== 'Paid' && (
                      <button className="btn btn-primary" onClick={() => setShowPaymentForm(true)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem', background: '#10b981', borderColor: '#10b981' }}>
                        <CreditCard size={18} /> Make Manual Payment
                      </button>
                    )}
                    <button className="btn btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <Download size={18} /> Download PDF
                    </button>
                  </>
                ) : (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={() => setShowPaymentForm(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                      Cancel
                    </button>
                    <button type="submit" form="payment-form" className="btn btn-primary" style={{ flex: 1, background: '#10b981', borderColor: '#10b981' }}>
                      Pay
                    </button>
                  </div>
                )}
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
            Invoice successfully marked as paid!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageInvoices;
