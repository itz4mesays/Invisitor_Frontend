import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Clock, 
  RefreshCw, 
  AlertCircle,
  FileText,
  Download,
  Search,
  Filter,
  MoreVertical,
  X,
  ChevronDown
} from 'lucide-react';
import Pagination from '../../components/Pagination';

// Pure SVG Pie Chart
const PieChart = ({ segments, size = 200 }) => {
  const r = 80;
  const cx = size / 2;
  const cy = size / 2;
  const total = segments.reduce((s, seg) => s + seg.value, 0);

  if (total === 0) {
    return (
      <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
        <circle cx={cx} cy={cy} r={r} fill="#f1f5f9" />
      </svg>
    );
  }

  let cumulAngle = -Math.PI / 2;
  const arcs = segments.map((seg) => {
    const angle = (seg.value / total) * Math.PI * 2;
    const x1 = cx + r * Math.cos(cumulAngle);
    const y1 = cy + r * Math.sin(cumulAngle);
    cumulAngle += angle;
    const x2 = cx + r * Math.cos(cumulAngle);
    const y2 = cy + r * Math.sin(cumulAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
    return { d, color: seg.color };
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
      {arcs.map((arc, i) => (
        <path key={i} d={arc.d} fill={arc.color} stroke="white" strokeWidth={2} />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.45} fill="white" />
    </svg>
  );
};

// Pure SVG Bar Chart
const BarChart = ({ data, width = 400, height = 200 }) => {
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width, height }}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map(ratio => {
        const y = padding + chartHeight * (1 - ratio);
        return (
          <g key={ratio}>
            <line
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth={1}
            />
            <text
              x={padding - 10}
              y={y + 4}
              textAnchor="end"
              fontSize="12"
              fill="#64748b"
            >
              ₦{(maxValue * ratio).toFixed(0)}
            </text>
          </g>
        );
      })}

      {/* Bars */}
      {data.map((item, i) => {
        const barWidth = chartWidth / data.length * 0.8;
        const barHeight = (item.value / maxValue) * chartHeight;
        const x = padding + (chartWidth / data.length) * i + (chartWidth / data.length - barWidth) / 2;
        const y = padding + chartHeight - barHeight;

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#00a3ff"
              rx={4}
            />
            <text
              x={x + barWidth / 2}
              y={y - 8}
              textAnchor="middle"
              fontSize="12"
              fill="#1e293b"
              fontWeight="600"
            >
              ₦{item.value.toFixed(0)}
            </text>
            <text
              x={x + barWidth / 2}
              y={height - 10}
              textAnchor="middle"
              fontSize="12"
              fill="#64748b"
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const STATUS_CONFIG = {
  Completed: { icon: <CheckCircle size={20} />, bg: '#f0fdf4', color: '#16a34a' },
  Pending: { icon: <Clock size={20} />, bg: '#fffbeb', color: '#d97706' },
  Processing: { icon: <RefreshCw size={20} />, bg: '#eff6ff', color: '#2563eb' },
  Failed: { icon: <AlertCircle size={20} />, bg: '#fef2f2', color: '#dc2626' },
  Cancelled: { icon: <XCircle size={20} />, bg: '#f8fafc', color: '#64748b' }
};

const MOCK_TRANSACTIONS = [
  { id: 'TXN-001', date: '2026-04-15', description: 'Subscription Renewal', amount: 150.00, status: 'Completed', ref: 'REF-83294' },
  { id: 'TXN-002', date: '2026-04-14', description: 'SMS Credit Top-up', amount: 25.00, status: 'Processing', ref: 'REF-72134' },
  { id: 'TXN-003', date: '2026-04-12', description: 'Additional Staff Account', amount: 15.00, status: 'Pending', ref: 'REF-92831' },
  { id: 'TXN-004', date: '2026-04-10', description: 'Enterprise Upgrade', amount: 499.00, status: 'Failed', ref: 'REF-11203' },
  { id: 'TXN-005', date: '2026-04-08', description: 'Domain Registration', amount: 12.00, status: 'Completed', ref: 'REF-58321' },
  { id: 'TXN-006', date: '2026-04-05', description: 'Maintenance Fee', amount: 45.00, status: 'Cancelled', ref: 'REF-84322' },
  { id: 'TXN-007', date: '2026-04-01', description: 'Subscription Renewal', amount: 150.00, status: 'Completed', ref: 'REF-39121' },
];

const Transactions = () => {
  const [selectedYear, setSelectedYear] = useState('2026');
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Receipt Modal State
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const years = ['2024', '2025', '2026'];

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(t => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!t.description.toLowerCase().includes(q) && !t.id.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery]);

  // Pagination Logic
  const totalItems = filteredTransactions.length;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return filteredTransactions.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredTransactions, pageSize]);

  // Metrics Logic for Cards
  const metrics = useMemo(() => {
    const counts = { Completed: 0, Pending: 0, Processing: 0, Failed: 0, Cancelled: 0 };
    filteredTransactions.forEach(t => {
      if (counts[t.status] !== undefined) counts[t.status]++;
    });
    return counts;
  }, [filteredTransactions]);

  const pieSegments = [
    { label: 'Completed', value: metrics.Completed, color: STATUS_CONFIG.Completed.color },
    { label: 'Pending', value: metrics.Pending, color: STATUS_CONFIG.Pending.color },
    { label: 'Processing', value: metrics.Processing, color: STATUS_CONFIG.Processing.color },
    { label: 'Failed', value: metrics.Failed, color: STATUS_CONFIG.Failed.color },
    { label: 'Cancelled', value: metrics.Cancelled, color: STATUS_CONFIG.Cancelled.color },
  ].filter(seg => seg.value > 0);

  // Bar chart data: transactions by month
  const barChartData = useMemo(() => {
    const monthlyData = {};
    filteredTransactions.forEach(txn => {
      const month = txn.date.substring(5, 7); // Extract MM from YYYY-MM-DD
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthLabel = monthNames[parseInt(month) - 1];
      if (!monthlyData[monthLabel]) {
        monthlyData[monthLabel] = 0;
      }
      monthlyData[monthLabel] += txn.amount;
    });
    return Object.entries(monthlyData).map(([label, value]) => ({ label, value }));
  }, [filteredTransactions]);

  const handleViewReceipt = (txn) => {
    setSelectedReceipt(txn);
    setIsReceiptOpen(true);
    setActiveDropdown(null);
  };

  const closeModal = () => {
    setIsReceiptOpen(false);
    setTimeout(() => setSelectedReceipt(null), 300);
  };

  return (
    <div className="tx-page">
      <div className="tx-page-header">
        <h1>Transactions</h1>
        
        {/* Year Filter for Charts/Cards */}
        <div className="tx-year-picker-wrap">
          <button 
            className="tx-year-picker-btn" 
            onClick={() => setYearDropdownOpen(!yearDropdownOpen)}
          >
            <span>{selectedYear}</span>
            <ChevronDown size={14} className={yearDropdownOpen ? 'rotated' : ''} />
          </button>
          
          <AnimatePresence>
            {yearDropdownOpen && (
              <>
                <div className="tx-filter-overlay" onClick={() => setYearDropdownOpen(false)}></div>
                <motion.div 
                  className="tx-year-dropdown"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {years.map(yr => (
                    <button 
                      key={yr} 
                      className={`tx-year-item ${selectedYear === yr ? 'active' : ''}`}
                      onClick={() => { setSelectedYear(yr); setYearDropdownOpen(false); }}
                    >
                      {yr}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="tx-stats-grid">
        {Object.entries(metrics).map(([status, count], i) => {
          const config = STATUS_CONFIG[status];
          return (
            <motion.div 
              key={status} 
              className="tx-stat-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="tx-stat-icon" style={{ background: config.bg, color: config.color }}>
                {config.icon}
              </div>
              <div className="tx-stat-body">
                <span className="tx-stat-label">{status}</span>
                <span className="tx-stat-value">{count}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="tx-charts-and-table">
        {/* Left Side: Bar Chart */}
        <div className="tx-bar-chart-card">
          <div className="tx-chart-header">
            <h3>Transaction Trends</h3>
            <p>Monthly transaction amounts for {selectedYear}</p>
          </div>
          
          <div className="tx-bar-wrap">
            <BarChart data={barChartData} width={400} height={200} />
          </div>
        </div>

        {/* Right Side: Pie Chart */}
        <div className="tx-chart-card">
          <div className="tx-chart-header">
            <h3>Status Overview</h3>
            <p>For the year {selectedYear}</p>
          </div>
          
          <div className="tx-pie-wrap">
            <PieChart segments={pieSegments} size={220} />
            <div className="tx-pie-center-text">
              <span className="tx-pie-total">{filteredTransactions.length}</span>
              <span className="tx-pie-label-sm">Total</span>
            </div>
          </div>

          <div className="tx-legend">
            {pieSegments.map((seg, i) => (
              <div key={i} className="tx-legend-item">
                <span className="tx-legend-dot" style={{ background: seg.color }} />
                <span className="tx-legend-name">{seg.label}</span>
                <span className="tx-legend-val">{seg.value} ({((seg.value / filteredTransactions.length) * 100).toFixed(0)}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Transactions List */}
      <div className="tx-all-transactions">
        <div className="tx-table-card">
          <div className="tx-table-toolbar">
            <h2 className="tx-table-title">All Transactions</h2>
            <div className="tx-search-box">
              <Search size={16} className="tx-search-icon" />
              <input 
                type="text" 
                placeholder="Search transactions..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on search
                }}
              />
            </div>
          </div>

          <table className="tx-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.length > 0 ? currentTableData.map(txn => {
                const sc = STATUS_CONFIG[txn.status];
                return (
                  <tr key={txn.id}>
                    <td className="tx-id-cell">{txn.id}</td>
                    <td className="tx-text-gray">{txn.date}</td>
                    <td className="tx-subject-cell">{txn.description}</td>
                    <td className="tx-amount-cell">₦{txn.amount.toFixed(2)}</td>
                    <td>
                      <span className="tx-status-pill" style={{ background: sc.bg, color: sc.color }}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="tx-actions-cell">
                      <div className="tx-dropdown-wrap">
                        <button 
                          className="tx-btn-dots" 
                          onClick={() => setActiveDropdown(activeDropdown === txn.id ? null : txn.id)}
                        >
                          <MoreVertical size={18} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === txn.id && (
                            <>
                              <div className="tx-dropdown-overlay" onClick={() => setActiveDropdown(null)} />
                              <motion.div 
                                className="tx-dropdown-menu"
                                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                              >
                                <button className="tx-dropdown-item" onClick={() => handleViewReceipt(txn)}>
                                  <FileText size={15} /> View Receipt
                                </button>
                                <button className="tx-dropdown-item" onClick={() => setActiveDropdown(null)}>
                                  <Download size={15} /> Download Receipt
                                </button>
                              </motion.div>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                    No transactions found.
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
      </div>

      {/* View Receipt Modal */}
      <AnimatePresence>
        {isReceiptOpen && selectedReceipt && (
          <div className="tx-modal-overlay" onClick={closeModal}>
            <motion.div 
              className="tx-modal-container"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="tx-modal-close" onClick={closeModal}><X size={20} /></button>
              
              <div className="tx-receipt-header">
                <div className="tx-receipt-icon">
                  <CreditCard size={28} />
                </div>
                <h2>Payment Receipt</h2>
                <p className="tx-receipt-id">Receipt #{selectedReceipt.id}</p>
              </div>

              <div className="tx-receipt-body">
                <div className="tx-receipt-row">
                  <span>Date Paid</span>
                  <strong>{selectedReceipt.date}</strong>
                </div>
                <div className="tx-receipt-row">
                  <span>Reference</span>
                  <strong>{selectedReceipt.ref}</strong>
                </div>
                <div className="tx-receipt-row">
                  <span>Status</span>
                  <span className="tx-status-pill inline" style={{ 
                    background: STATUS_CONFIG[selectedReceipt.status].bg, 
                    color: STATUS_CONFIG[selectedReceipt.status].color 
                  }}>
                    {selectedReceipt.status}
                  </span>
                </div>

                <div className="tx-receipt-divider" />

                <div className="tx-receipt-row">
                  <span>Description</span>
                  <strong>{selectedReceipt.description}</strong>
                </div>
                
                <div className="tx-receipt-divider" />

                <div className="tx-receipt-total">
                  <span>Total Amount</span>
                  <strong>₦{selectedReceipt.amount.toFixed(2)}</strong>
                </div>
              </div>

              <div className="tx-modal-footer">
                <button className="tx-btn-download">
                  <Download size={16} /> Download PDF
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        .tx-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-bottom: 3rem;
        }

        .tx-page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tx-page-header h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0;
        }

        .tx-year-picker-wrap {
          position: relative;
        }

        .tx-year-picker-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 8px 14px;
          font-size: 0.875rem;
          font-weight: 700;
          color: #1e293b;
          cursor: pointer;
          transition: border-color 0.2s;
        }

        .tx-year-picker-btn:hover {
          border-color: #cbd5e1;
        }

        .tx-year-picker-btn .rotated {
          transform: rotate(180deg);
        }

        .tx-filter-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
        }

        .tx-year-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          z-index: 110;
          min-width: 120px;
          overflow: hidden;
        }

        .tx-year-item {
          width: 100%;
          text-align: left;
          padding: 10px 16px;
          background: none;
          border: none;
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
        }

        .tx-year-item:hover {
          background: #f8fafc;
        }

        .tx-year-item.active {
          background: #f1f5f9;
          color: #0d2331;
          font-weight: 800;
        }

        .tx-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .tx-stat-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .tx-stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tx-stat-body {
          display: flex;
          flex-direction: column;
        }

        .tx-stat-label {
          font-size: 0.75rem;
          color: #94a3b8;
          font-weight: 700;
        }

        .tx-stat-value {
          font-size: 1.375rem;
          font-weight: 800;
          color: #1e293b;
        }

        .tx-charts-and-table {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.5rem;
        }

        .tx-table-card, .tx-chart-card, .tx-bar-chart-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
        }

        .tx-bar-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2rem 0;
        }

        .tx-all-transactions {
          margin-top: 2rem;
        }

        .tx-table-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .tx-table-title {
          font-size: 1.125rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0;
        }

        .tx-search-box {
          position: relative;
          width: 250px;
        }

        .tx-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }

        .tx-search-box input {
          width: 100%;
          padding: 10px 14px 10px 36px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.8125rem;
          outline: none;
          background: #f8fafc;
        }

        .tx-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .tx-table th {
          padding: 14px 0;
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          border-bottom: 1px solid #f1f5f9;
        }

        .tx-table td {
          padding: 18px 0;
          font-size: 0.875rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .tx-id-cell { font-weight: 700; color: #1e293b; }
        .tx-text-gray { color: #64748b; font-weight: 500; }
        .tx-subject-cell { font-weight: 600; color: #1e293b; }
        .tx-amount-cell { font-weight: 800; color: #1e293b; }

        .tx-status-pill {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          display: inline-block;
        }

        .tx-dropdown-wrap { position: relative; }
        
        .tx-btn-dots {
          background: none; border: none; color: #94a3b8;
          cursor: pointer; padding: 4px; border-radius: 6px;
          display: flex; align-items: center; transition: background 0.2s;
        }
        
        .tx-btn-dots:hover { background: #f1f5f9; color: #0d2331; }
        
        .tx-dropdown-overlay { position: fixed; inset: 0; z-index: 90; }
        
        .tx-dropdown-menu {
          position: absolute; right: 0; top: calc(100% + 4px);
          background: white; border: 1px solid #e2e8f0; border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1); z-index: 100; min-width: 160px;
          overflow: hidden;
        }

        .tx-dropdown-item {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 16px; font-size: 0.875rem; font-weight: 600;
          color: #1e293b; background: none; border: none; width: 100%;
          cursor: pointer; text-align: left;
        }

        .tx-dropdown-item:hover { background: #f8fafc; }

        /* Right Side Chart */
        .tx-chart-header h3 {
          font-size: 1rem;
          font-weight: 800;
          color: #1e293b;
          margin: 0 0 4px 0;
        }

        .tx-chart-header p {
          font-size: 0.75rem;
          color: #94a3b8;
          font-weight: 500;
          margin: 0;
        }

        .tx-pie-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2rem 0;
        }

        .tx-pie-center-text {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .tx-pie-total {
          font-size: 2rem;
          font-weight: 800;
          color: #1e293b;
          line-height: 1;
        }

        .tx-pie-label-sm {
          font-size: 0.75rem;
          color: #94a3b8;
          font-weight: 600;
          margin-top: 4px;
        }

        .tx-legend {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tx-legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tx-legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .tx-legend-name {
          font-size: 0.8125rem;
          color: #475569;
          font-weight: 600;
          flex: 1;
        }

        .tx-legend-val {
          font-size: 0.875rem;
          font-weight: 800;
          color: #1e293b;
        }

        /* Modal styling */
        .tx-modal-overlay {
          position: fixed; inset: 0;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000; padding: 1rem;
        }

        .tx-modal-container {
          background: white; width: 100%; max-width: 440px;
          border-radius: 24px; position: relative;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
          overflow: hidden;
        }

        .tx-modal-close {
          position: absolute; top: 16px; right: 16px;
          background: #f1f5f9; border: none; border-radius: 50%;
          width: 36px; height: 36px; display: flex; align-items: center;
          justify-content: center; cursor: pointer; color: #64748b;
          transition: all 0.2s;
        }

        .tx-modal-close:hover { background: #e2e8f0; color: #1e293b; }

        .tx-receipt-header {
          padding: 2.5rem 2rem 1.5rem;
          text-align: center;
          background: #f8fafc;
          border-bottom: 1px dashed #e2e8f0;
        }

        .tx-receipt-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: white; border: 2px solid #e2e8f0;
          color: #0d2331; display: flex; align-items: center;
          justify-content: center; margin: 0 auto 1rem;
        }

        .tx-receipt-header h2 {
          font-size: 1.25rem; font-weight: 800; color: #1e293b; margin: 0 0 8px 0;
        }

        .tx-receipt-id {
          font-size: 0.875rem; color: #64748b; font-weight: 600; margin: 0;
        }

        .tx-receipt-body {
          padding: 2rem;
          display: flex; flex-direction: column; gap: 1rem;
        }

        .tx-receipt-row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.875rem;
        }

        .tx-receipt-row span { color: #64748b; font-weight: 500; }
        .tx-receipt-row strong { color: #1e293b; font-weight: 700; }

        .tx-receipt-divider {
          height: 1px; background: dashed 1px #e2e8f0;
          margin: 0.5rem 0;
        }

        .tx-receipt-total {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 0.5rem;
        }

        .tx-receipt-total span { font-size: 1rem; font-weight: 700; color: #1e293b; }
        .tx-receipt-total strong { font-size: 1.5rem; font-weight: 800; color: #0d2331; }

        .tx-modal-footer {
          padding: 1.5rem 2rem;
          background: #f8fafc;
          display: flex; justify-content: center;
        }

        .tx-btn-download {
          display: flex; align-items: center; gap: 8px;
          background: #0d2331; color: white; border: none;
          padding: 12px 24px; border-radius: 12px;
          font-size: 0.875rem; font-weight: 700;
          cursor: pointer; width: 100%; justify-content: center;
        }

        @media (max-width: 1024px) {
          .tx-charts-and-table { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Transactions;
