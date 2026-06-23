import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
  Wallet as WalletIcon,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Search,
  MoreVertical,
  X,
  CreditCard,
  MessageSquare,
  Smartphone,
  ChevronDown,
  Eye
} from 'lucide-react';
import Pagination from '../../components/Pagination';

const MOCK_YEARLY_DATA = [
  { month: 'Jan', credit: 50000, debit: 20000 },
  { month: 'Feb', credit: 45000, debit: 35000 },
  { month: 'Mar', credit: 60000, debit: 45000 },
  { month: 'Apr', credit: 75000, debit: 40000 },
  { month: 'May', credit: 80000, debit: 65000 },
  { month: 'Jun', credit: 55000, debit: 45000 },
  { month: 'Jul', credit: 90000, debit: 55000 },
  { month: 'Aug', credit: 85000, debit: 60000 },
  { month: 'Sep', credit: 100000, debit: 75000 },
  { month: 'Oct', credit: 95000, debit: 80000 },
  { month: 'Nov', credit: 110000, debit: 85000 },
  { month: 'Dec', credit: 120000, debit: 90000 },
];

const MOCK_WALLET = {
  balance: 12500.00,
  low_balance_threshold: 500.00,
  is_low_balance: false,
  currency: 'NGN',
};

const MOCK_TRANSACTIONS = [
  { id: 1, type: 'credit', channel: 'paystack', amount: 5000.00, balance_before: 7500.00, balance_after: 12500.00, reference: 'WF-abc123', description: 'Wallet funded via Paystack', initiated_by: 'Oyedele Olufemi', created_at: '2026-06-22T14:30:00Z' },
  { id: 2, type: 'debit', channel: 'system', amount: 10.00, balance_before: 12510.00, balance_after: 12500.00, reference: 'DEB-xyz456', description: 'WhatsApp notification to +2348012345678', initiated_by: 'System (Auto)', created_at: '2026-06-22T13:15:00Z' },
  { id: 3, type: 'debit', channel: 'system', amount: 5.00, balance_before: 12515.00, balance_after: 12510.00, reference: 'DEB-def789', description: 'SMS notification to +2348098765432', initiated_by: 'System (Auto)', created_at: '2026-06-22T12:00:00Z' },
  { id: 4, type: 'credit', channel: 'paystack', amount: 10000.00, balance_before: 2515.00, balance_after: 12515.00, reference: 'WF-ghi012', description: 'Wallet funded via Paystack', initiated_by: 'Finance Admin', created_at: '2026-06-21T10:00:00Z' },
  { id: 5, type: 'credit', channel: 'refund', amount: 10.00, balance_before: 2505.00, balance_after: 2515.00, reference: 'REF-jkl345', description: 'Refund: Failed WhatsApp to +2348055555555', initiated_by: 'System (Refund)', created_at: '2026-06-21T09:30:00Z' },
  { id: 6, type: 'debit', channel: 'system', amount: 10.00, balance_before: 2515.00, balance_after: 2505.00, reference: 'DEB-mno678', description: 'WhatsApp notification to +2348055555555', initiated_by: 'System (Auto)', created_at: '2026-06-21T09:25:00Z' },
  { id: 7, type: 'debit', channel: 'system', amount: 5.00, balance_before: 2520.00, balance_after: 2515.00, reference: 'DEB-pqr901', description: 'SMS notification to +2348011111111', initiated_by: 'John Doe (Host)', created_at: '2026-06-20T16:45:00Z' },
  { id: 8, type: 'credit', channel: 'paystack', amount: 2500.00, balance_before: 20.00, balance_after: 2520.00, reference: 'WF-stu234', description: 'Wallet funded via Paystack', initiated_by: 'Oyedele Olufemi', created_at: '2026-06-20T08:00:00Z' },
];

const QUICK_FUND_AMOUNTS = [1000, 2500, 5000, 10000, 25000];

const TYPE_CONFIG = {
  credit: { icon: <ArrowDownLeft size={16} />, color: '#10b981', bg: '#ecfdf5', label: 'Credit' },
  debit: { icon: <ArrowUpRight size={16} />, color: '#ef4444', bg: '#fef2f2', label: 'Debit' },
};

const CHANNEL_CONFIG = {
  paystack: { label: 'Paystack', color: '#3b82f6' },
  system: { label: 'System', color: '#6b7280' },
  refund: { label: 'Refund', color: '#8b5cf6' },
  manual: { label: 'Manual', color: '#f59e0b' },
};

const WalletPage = () => {
  const location = useLocation();
  const role = location.pathname.split('/')[1];

  const [wallet] = useState(MOCK_WALLET);
  const [transactions] = useState(MOCK_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  const [fundingMethod, setFundingMethod] = useState('paystack');
  const [fundingType, setFundingType] = useState('credit');
  const [selectedUser, setSelectedUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      if (typeFilter !== 'all' && t.type !== typeFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !t.description.toLowerCase().includes(q) &&
          !t.reference.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [transactions, searchQuery, typeFilter]);

  const totalItems = filteredTransactions.length;
  const currentTableData = useMemo(() => {
    const first = (currentPage - 1) * pageSize;
    return filteredTransactions.slice(first, first + pageSize);
  }, [currentPage, filteredTransactions, pageSize]);

  const stats = useMemo(() => {
    const totalFunded = transactions.filter(t => t.type === 'credit' && t.channel !== 'refund').reduce((s, t) => s + t.amount, 0);
    const totalSpent = transactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);
    const totalRefunded = transactions.filter(t => t.channel === 'refund').reduce((s, t) => s + t.amount, 0);
    return { totalFunded, totalSpent, totalRefunded };
  }, [transactions]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-NG', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });
  };

  const handleFundWallet = () => {
    if (!fundAmount || parseFloat(fundAmount) < 100) return;
    setIsLoading(true);
    // TODO: Call POST /api/wallet/fund, redirect to Paystack
    setTimeout(() => {
      setIsLoading(false);
      setIsFundModalOpen(false);
      setFundAmount('');
    }, 1500);
  };

  return (
    <div className="wlt-page">
      <div className="wlt-page-header">
        <h1>Notification Wallet</h1>
        <button className="wlt-fund-btn" onClick={() => setIsFundModalOpen(true)}>
          <Plus size={18} />
          Fund Wallet
        </button>
      </div>

      {/* Low Balance Alert */}
      {wallet.is_low_balance && (
        <motion.div
          className="wlt-alert"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertTriangle size={20} />
          <div className="wlt-alert-text">
            <strong>Low Balance Warning</strong>
            <span>Your wallet balance is below ₦{wallet.low_balance_threshold.toLocaleString()}. Top up to continue sending notifications.</span>
          </div>
          <button className="wlt-alert-action" onClick={() => setIsFundModalOpen(true)}>
            Top Up Now
          </button>
        </motion.div>
      )}

      {/* Balance & Stats Cards */}
      <div className="wlt-stats-grid">
        <motion.div
          className="wlt-balance-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="wlt-balance-icon">
            <WalletIcon size={28} />
          </div>
          <div className="wlt-balance-info">
            <span className="wlt-balance-label">Available Balance</span>
            <span className="wlt-balance-amount">₦{wallet.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
            <span className="wlt-balance-sub">
              <CheckCircle size={14} />
              {wallet.is_low_balance ? 'Low balance' : 'Sufficient balance'}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="wlt-stat-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="wlt-stat-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
            <TrendingUp size={20} />
          </div>
          <div className="wlt-stat-body">
            <span className="wlt-stat-label">Total Funded</span>
            <span className="wlt-stat-value">₦{stats.totalFunded.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
          </div>
        </motion.div>

        <motion.div
          className="wlt-stat-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="wlt-stat-icon" style={{ background: '#fef2f2', color: '#ef4444' }}>
            <ArrowUpRight size={20} />
          </div>
          <div className="wlt-stat-body">
            <span className="wlt-stat-label">Total Spent</span>
            <span className="wlt-stat-value">₦{stats.totalSpent.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
          </div>
        </motion.div>

        <motion.div
          className="wlt-stat-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="wlt-stat-icon" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
            <RefreshCw size={20} />
          </div>
          <div className="wlt-stat-body">
            <span className="wlt-stat-label">Total Refunded</span>
            <span className="wlt-stat-value">₦{stats.totalRefunded.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</span>
          </div>
        </motion.div>
      </div>

      {/* Finance & Admin Specific Chart */}
      {['finance', 'admin'].includes(role) && (
        <div className="wlt-chart-card">
          <div className="wlt-table-toolbar">
            <h2 className="wlt-table-title">Yearly Wallet Activity</h2>
          </div>
          <div className="wlt-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={MOCK_YEARLY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--bg-muted)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-quaternary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-quaternary)' }} tickFormatter={(value) => `₦${(value/1000)}k`} />
                <Tooltip 
                  cursor={{ fill: 'var(--bg-subtle)' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                  formatter={(value) => [`₦${value.toLocaleString()}`, '']}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '1rem', fontSize: '14px', fontWeight: 600 }} />
                <Bar dataKey="credit" name="Total Credit" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="debit" name="Total Debit" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="wlt-table-card">
        <div className="wlt-table-toolbar">
          <h2 className="wlt-table-title">Transaction History</h2>
          <div className="wlt-table-actions">
            <div className="wlt-filter-pills">
              {['all', 'credit', 'debit'].map(f => (
                <button
                  key={f}
                  className={`wlt-filter-pill ${typeFilter === f ? 'active' : ''}`}
                  onClick={() => { setTypeFilter(f); setCurrentPage(1); }}
                >
                  {f === 'all' ? 'All' : f === 'credit' ? 'Credits' : 'Debits'}
                </button>
              ))}
            </div>
            <div className="wlt-search-box">
              <Search size={16} className="wlt-search-icon" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
          </div>
        </div>

        <table className="wlt-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Balance After</th>
              <th>Initiated By</th>
              <th>Reference</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.length > 0 ? currentTableData.map(txn => {
              const tc = TYPE_CONFIG[txn.type];
              const cc = CHANNEL_CONFIG[txn.channel];
              return (
                <tr key={txn.id}>
                  <td>
                    <span className="wlt-type-badge" style={{ background: tc.bg, color: tc.color }}>
                      {tc.icon} {tc.label}
                    </span>
                  </td>
                  <td className="wlt-desc-cell">
                    <div className="wlt-txn-desc">
                      <span className="wlt-desc-text">{txn.description}</span>
                      <span className="wlt-channel-badge" style={{ color: cc.color }}>{cc.label}</span>
                    </div>
                  </td>
                  <td className={`wlt-txn-amount ${txn.type}`} style={{ color: tc.color }}>
                    {txn.type === 'credit' ? '+' : '-'}₦{txn.amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="wlt-txn-balance">
                    ₦{txn.balance_after.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </td>
                  <td>
                    <span className="wlt-txn-initiator">{txn.initiated_by}</span>
                  </td>
                  <td>
                    <code className="wlt-txn-ref">{txn.reference}</code>
                  </td>
                  <td className="wlt-date-cell">
                    <span>{formatDate(txn.created_at)}</span>
                    <span className="wlt-time">{formatTime(txn.created_at)}</span>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-quaternary)' }}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalCount={totalItems}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
          onPageSizeChange={size => { setPageSize(size); setCurrentPage(1); }}
        />
      </div>

      {/* Fund Wallet Modal */}
      <AnimatePresence>
        {isFundModalOpen && (
          <div className="wlt-modal-overlay" onClick={() => setIsFundModalOpen(false)}>
            <motion.div
              className="wlt-modal-container"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="wlt-modal-close" onClick={() => setIsFundModalOpen(false)}>
                <X size={20} />
              </button>

              <div className="wlt-fund-header">
                <div className="wlt-fund-icon">
                  <CreditCard size={28} />
                </div>
                <h2>Fund Your Wallet</h2>
                <p>Add funds to send SMS & WhatsApp notifications</p>
              </div>

              <div className="wlt-fund-body">
                <div className="wlt-fund-current">
                  <span>Current Balance</span>
                  <strong>₦{wallet.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>
                </div>

                <div className="wlt-fund-quick">
                  <label>Quick Amount</label>
                  <div className="wlt-quick-amounts">
                    {QUICK_FUND_AMOUNTS.map(amt => (
                      <button
                        key={amt}
                        className={`wlt-quick-btn ${fundAmount === String(amt) ? 'active' : ''}`}
                        onClick={() => setFundAmount(String(amt))}
                      >
                        ₦{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="wlt-fund-input-group">
                  <label>Or enter custom amount</label>
                  <div className="wlt-fund-input-wrap">
                    <span className="wlt-currency">₦</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={fundAmount}
                      onChange={e => setFundAmount(e.target.value)}
                      min="100"
                      max="1000000"
                    />
                  </div>
                  <span className="wlt-fund-hint">Min: ₦100 · Max: ₦1,000,000</span>
                </div>

                {['finance', 'admin'].includes(role) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                    <div className="wlt-fund-input-group">
                      <label>Funding Method</label>
                      <select 
                        value={fundingMethod} 
                        onChange={e => {
                          setFundingMethod(e.target.value);
                          if (e.target.value !== 'manual') setFundingType('credit');
                        }}
                        style={{ width: '100%', padding: '0.875rem', borderRadius: '10px', border: '1.5px solid var(--border-default)', fontSize: '0.875rem', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                      >
                        <option value="paystack">Paystack</option>
                        <option value="manual">Manual Funding</option>
                      </select>
                    </div>

                    {fundingMethod === 'manual' && (
                      <>
                        <div className="wlt-fund-input-group">
                          <label>Username</label>
                          <input 
                            list="users-list" 
                            placeholder="Search or select a user..."
                            value={selectedUser} 
                            onChange={e => setSelectedUser(e.target.value)}
                            style={{ width: '100%', padding: '0.875rem', borderRadius: '10px', border: '1.5px solid var(--border-default)', fontSize: '0.875rem', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                          />
                          <datalist id="users-list">
                            <option value="Oyedele Olufemi (Finance)" />
                            <option value="David Fayemi (Manager)" />
                            <option value="John Doe (Host)" />
                            <option value="Sarah Johnson (Resident)" />
                          </datalist>
                        </div>
                        
                        <div className="wlt-fund-input-group">
                          <label>Transaction Type</label>
                          <select 
                            value={fundingType} 
                            onChange={e => setFundingType(e.target.value)}
                            style={{ width: '100%', padding: '0.875rem', borderRadius: '10px', border: '1.5px solid var(--border-default)', fontSize: '0.875rem', outline: 'none', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                          >
                            <option value="credit">Credit (Add Funds)</option>
                            <option value="debit">Debit (Deduct Funds)</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="wlt-modal-footer">
                <button
                  className="wlt-pay-btn"
                  onClick={handleFundWallet}
                  disabled={!fundAmount || parseFloat(fundAmount) < 100 || isLoading || (fundingMethod === 'manual' && !selectedUser)}
                >
                  {isLoading ? (
                    <><RefreshCw size={16} className="spinning" /> Processing...</>
                  ) : (
                    <>{fundingMethod === 'manual' ? (fundingType === 'credit' ? 'Manually Credit' : 'Manually Debit') : 'Pay with Paystack'} · ₦{fundAmount ? parseFloat(fundAmount).toLocaleString() : '0'}</>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        .wlt-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-bottom: 3rem;
        }

        .wlt-page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .wlt-page-header h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .wlt-fund-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-brand);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 10px 20px;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .wlt-fund-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        /* Alert */
        .wlt-alert {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 14px;
          padding: 14px 20px;
          color: #92400e;
        }

        .wlt-alert-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .wlt-alert-text strong { font-size: 0.875rem; }
        .wlt-alert-text span { font-size: 0.8125rem; opacity: 0.8; }

        .wlt-alert-action {
          background: #f59e0b;
          color: white;
          border: none;
          border-radius: 10px;
          padding: 8px 16px;
          font-size: 0.8125rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        /* Stats Grid */
        .wlt-stats-grid {
          display: grid;
          grid-template-columns: 1.5fr repeat(3, 1fr);
          gap: 1rem;
        }

        .wlt-balance-card {
          background: linear-gradient(135deg, var(--bg-brand) 0%, #1e40af 100%);
          border-radius: 18px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          color: white;
        }

        .wlt-balance-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .wlt-balance-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .wlt-balance-label {
          font-size: 0.8125rem;
          font-weight: 600;
          opacity: 0.85;
        }

        .wlt-balance-amount {
          font-size: 1.75rem;
          font-weight: 900;
          line-height: 1.1;
        }

        .wlt-balance-sub {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          opacity: 0.8;
        }

        .wlt-stat-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .wlt-stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .wlt-stat-body {
          display: flex;
          flex-direction: column;
        }

        .wlt-stat-label {
          font-size: 0.75rem;
          color: var(--text-quaternary);
          font-weight: 700;
        }

        .wlt-stat-value {
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        /* Chart */
        .wlt-chart-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 16px;
          padding: 1.5rem;
        }

        .wlt-chart-container {
          margin-top: 1.5rem;
        }

        /* Table */
        .wlt-table-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 16px;
          padding: 1.5rem;
        }
        .wlt-table-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .wlt-table-title {
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
        }

        .wlt-table-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .wlt-filter-pills {
          display: flex;
          gap: 4px;
          background: var(--bg-subtle);
          border-radius: 10px;
          padding: 3px;
        }

        .wlt-filter-pill {
          padding: 6px 14px;
          border: none;
          background: none;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-tertiary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .wlt-filter-pill.active {
          background: var(--bg-surface);
          color: var(--bg-brand);
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }

        .wlt-search-box {
          position: relative;
          width: 220px;
        }

        .wlt-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-quaternary);
        }

        .wlt-search-box input {
          width: 100%;
          padding: 10px 14px 10px 36px;
          border: 1px solid var(--border-default);
          border-radius: 10px;
          font-size: 0.8125rem;
          outline: none;
          background: var(--bg-subtle);
        }

        .wlt-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .wlt-table th {
          padding: 14px 0;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-tertiary);
          border-bottom: 1px solid var(--bg-muted);
        }

        .wlt-table td {
          padding: 16px 0;
          font-size: 0.875rem;
          border-bottom: 1px solid var(--bg-muted);
        }

        .wlt-type-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .wlt-desc-cell {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .wlt-desc-text {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.8125rem;
        }

        .wlt-channel-badge {
          font-size: 0.6875rem;
          font-weight: 700;
          background: var(--bg-subtle);
          padding: 2px 8px;
          border-radius: 6px;
        }

        .wlt-txn-initiator {
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: var(--bg-subtle);
          padding: 4px 8px;
          border-radius: 6px;
          display: inline-block;
          white-space: nowrap;
        }

        .wlt-txn-amount {
          font-weight: 800;
        }

        .wlt-txn-balance {
          font-weight: 600;
          color: var(--text-secondary);
        }
        .wlt-ref-cell {
          font-family: monospace;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .wlt-date-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
        }

        .wlt-time {
          font-size: 0.75rem;
          color: var(--text-quaternary);
        }

        /* Fund Modal */
        .wlt-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .wlt-modal-container {
          background: var(--bg-surface);
          border-radius: 20px;
          width: 100%;
          max-width: 480px;
          position: relative;
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }

        .wlt-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--bg-subtle);
          border: none;
          border-radius: 10px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
          cursor: pointer;
        }

        .wlt-fund-header {
          text-align: center;
          padding: 2rem 2rem 1rem;
        }

        .wlt-fund-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--bg-brand), #3b82f6);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          color: white;
        }

        .wlt-fund-header h2 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 4px;
        }

        .wlt-fund-header p {
          font-size: 0.8125rem;
          color: var(--text-quaternary);
          margin: 0;
        }

        .wlt-fund-body {
          padding: 0 2rem;
        }

        .wlt-fund-current {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg-subtle);
          border-radius: 12px;
          padding: 14px 18px;
          margin-bottom: 1.5rem;
        }

        .wlt-fund-current span {
          font-size: 0.8125rem;
          color: var(--text-tertiary);
          font-weight: 600;
        }

        .wlt-fund-current strong {
          font-size: 1.125rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .wlt-fund-quick label,
        .wlt-fund-input-group label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .wlt-quick-amounts {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 1.25rem;
        }

        .wlt-quick-btn {
          padding: 8px 16px;
          border: 1.5px solid var(--border-default);
          border-radius: 10px;
          background: var(--bg-surface);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.15s;
        }

        .wlt-quick-btn:hover {
          border-color: var(--bg-brand);
          color: var(--bg-brand);
        }

        .wlt-quick-btn.active {
          background: var(--bg-brand);
          border-color: var(--bg-brand);
          color: white;
        }

        .wlt-fund-input-wrap {
          display: flex;
          align-items: center;
          border: 1.5px solid var(--border-default);
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.2s;
        }

        .wlt-fund-input-wrap:focus-within {
          border-color: var(--bg-brand);
        }

        .wlt-currency {
          padding: 12px 14px;
          background: var(--bg-subtle);
          font-weight: 800;
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .wlt-fund-input-wrap input {
          flex: 1;
          padding: 12px 14px;
          border: none;
          outline: none;
          font-size: 1rem;
          font-weight: 700;
          background: transparent;
          color: var(--text-primary);
        }

        .wlt-fund-hint {
          display: block;
          font-size: 0.75rem;
          color: var(--text-quaternary);
          margin-top: 6px;
        }

        .wlt-modal-footer {
          padding: 1.5rem 2rem 2rem;
        }

        .wlt-pay-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 0.9375rem;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .wlt-pay-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .wlt-pay-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinning { animation: spin 1s linear infinite; }

        @media (max-width: 900px) {
          .wlt-stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          .wlt-balance-card {
            grid-column: 1 / -1;
          }
          .wlt-table-toolbar {
            flex-direction: column;
            align-items: flex-start;
          }
          .wlt-table-actions {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 600px) {
          .wlt-stats-grid {
            grid-template-columns: 1fr;
          }
          .wlt-table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default WalletPage;
