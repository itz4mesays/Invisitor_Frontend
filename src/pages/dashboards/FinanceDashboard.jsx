import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DollarSign,
  TrendingUp,
  FileText,
  CreditCard,
  ChevronDown,
  ArrowRight,
  TrendingDown,
  Download,
  Filter
} from 'lucide-react';

const generateRevenueData = () => {
  return Array.from({ length: 14 }).map((_, i) => {
    const revenue = 10000 + Math.random() * 15000;
    const expenses = 4000 + Math.random() * 8000;
    return {
      label: `${i + 1}`,
      revenue,
      expenses,
    };
  });
};

const generateUserGrowthData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let currentHosts = 100;
  let currentManagers = 20;
  
  return months.map(m => {
    currentHosts += Math.floor(Math.random() * 50) + 10;
    currentManagers += Math.floor(Math.random() * 10) + 2;
    return {
      label: m,
      hosts: currentHosts,
      managers: currentManagers
    };
  });
};

const generateMonthlyRevenueData = (year) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map(m => {
    return {
      label: m,
      value: 20000 + Math.random() * 40000,
    };
  });
};

const generateInvoiceStatusData = (year) => {
  return [
    { label: 'Paid', value: 150000 + Math.random() * 50000, color: '#10b981' },
    { label: 'Due', value: 40000 + Math.random() * 20000, color: '#3b82f6' },
    { label: 'Overdue', value: 10000 + Math.random() * 15000, color: '#ef4444' },
  ];
};

const GroupedBarChart = ({ data, height = 300 }) => {
  const W = 560;
  const H = height;
  const padL = 36;
  const padR = 12;
  const padT = 12;
  const padB = 24;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = Math.max(...data.flatMap((d) => [d.revenue, d.expenses]), 1);
  const groupW = chartW / data.length;
  const barPad = groupW * 0.18;
  const barW = (groupW - barPad * 2) / 2 - 2;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: padT + chartH * (1 - t),
    label: `₦${Math.round((maxVal * t) / 1000)}k`,
  }));

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      {yTicks.map((t, i) => (
        <g key={`y-${i}`}>
          <line x1={padL} y1={t.y} x2={W - padR} y2={t.y} stroke="var(--border-default)" strokeDasharray="4 4" opacity={0.6} />
          <text x={padL - 8} y={t.y + 4} textAnchor="end" fontSize={10} fill="var(--text-quaternary)" fontFamily="inherit">{t.label}</text>
        </g>
      ))}
      {data.map((d, i) => {
        const groupX = padL + i * groupW + barPad;
        const revH = (d.revenue / maxVal) * chartH;
        const expH = (d.expenses / maxVal) * chartH;
        return (
          <g key={i}>
            <rect x={groupX} y={padT + chartH - revH} width={barW} height={revH} fill="#10b981" rx={2} />
            <rect x={groupX + barW + 2} y={padT + chartH - expH} width={barW} height={expH} fill="#ef4444" rx={2} opacity={0.8} />
            {(i % Math.ceil(data.length / 7) === 0 || i === data.length - 1) && (
              <text x={groupX + groupW / 2 - barPad} y={H - 6} textAnchor="middle" fontSize={9} fill="var(--text-quaternary)" fontFamily="inherit">Day {d.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

const LineChart = ({ data, height = 300 }) => {
  const W = 800;
  const H = height;
  const padL = 40;
  const padR = 20;
  const padT = 20;
  const padB = 30;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = Math.max(...data.flatMap(d => [d.hosts, d.managers]), 1);
  const stepX = chartW / Math.max(data.length - 1, 1);

  const getPoints = (key) => data.map((d, i) => `${padL + i * stepX},${padT + chartH - (d[key] / maxVal) * chartH}`).join(' ');

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: padT + chartH * (1 - t),
    label: Math.round(maxVal * t),
  }));

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      {yTicks.map((t, i) => (
        <g key={`y-${i}`}>
          <line x1={padL} y1={t.y} x2={W - padR} y2={t.y} stroke="var(--border-default)" strokeDasharray="4 4" opacity={0.6} />
          <text x={padL - 8} y={t.y + 4} textAnchor="end" fontSize={10} fill="var(--text-quaternary)" fontFamily="inherit">{t.label}</text>
        </g>
      ))}
      {data.map((d, i) => (
        <text key={`x-${i}`} x={padL + i * stepX} y={H - 8} textAnchor="middle" fontSize={10} fill="var(--text-quaternary)" fontFamily="inherit">
          {d.label}
        </text>
      ))}
      <polyline fill="none" stroke="#3b82f6" strokeWidth="3" points={getPoints('hosts')} strokeLinejoin="round" />
      <polyline fill="none" stroke="#f59e0b" strokeWidth="3" points={getPoints('managers')} strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={`dots-${i}`}>
          <circle cx={padL + i * stepX} cy={padT + chartH - (d.hosts / maxVal) * chartH} r="4" fill="#3b82f6" stroke="var(--bg-surface)" strokeWidth="2" />
          <circle cx={padL + i * stepX} cy={padT + chartH - (d.managers / maxVal) * chartH} r="4" fill="#f59e0b" stroke="var(--bg-surface)" strokeWidth="2" />
        </g>
      ))}
    </svg>
  );
};

const SingleBarChart = ({ data, height = 300 }) => {
  const W = 800;
  const H = height;
  const padL = 40;
  const padR = 20;
  const padT = 20;
  const padB = 30;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const barW = (chartW / data.length) * 0.6;
  const stepX = chartW / data.length;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: padT + chartH * (1 - t),
    label: `₦${Math.round((maxVal * t) / 1000)}k`,
  }));

  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      {yTicks.map((t, i) => (
        <g key={`y-${i}`}>
          <line x1={padL} y1={t.y} x2={W - padR} y2={t.y} stroke="var(--border-default)" strokeDasharray="4 4" opacity={0.6} />
          <text x={padL - 8} y={t.y + 4} textAnchor="end" fontSize={10} fill="var(--text-quaternary)" fontFamily="inherit">{t.label}</text>
        </g>
      ))}
      {data.map((d, i) => {
        const x = padL + i * stepX + (stepX - barW) / 2;
        const barH = (d.value / maxVal) * chartH;
        return (
          <g key={i}>
            <rect x={x} y={padT + chartH - barH} width={barW} height={barH} fill={d.color || "#10b981"} rx={4} />
            <text x={padL + i * stepX + stepX / 2} y={H - 8} textAnchor="middle" fontSize={10} fill="var(--text-quaternary)" fontFamily="inherit">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const PieChart = ({ segments, size = 160 }) => {
  const r = 60;
  const cx = size / 2;
  const cy = size / 2;
  let currentAngle = -Math.PI / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((seg, i) => {
        const angle = (seg.value / 100) * 2 * Math.PI;
        const x1 = cx + r * Math.cos(currentAngle);
        const y1 = cy + r * Math.sin(currentAngle);
        const nextAngle = currentAngle + angle;
        const x2 = cx + r * Math.cos(nextAngle);
        const y2 = cy + r * Math.sin(nextAngle);
        const largeArc = angle > Math.PI ? 1 : 0;
        const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
        currentAngle = nextAngle;
        return <path key={i} d={d} fill={seg.color} stroke="var(--bg-surface)" strokeWidth={2} />;
      })}
      <circle cx={cx} cy={cy} r={42} fill="var(--bg-surface)" />
    </svg>
  );
};

const FinanceDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.pathname.split('/')[1] || 'finance';
  const [selectedMonth, setSelectedMonth] = useState('Oct');
  const [monthOpen, setMonthOpen] = useState(false);
  
  // Date Range filter state for Platform Growth Chart
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-12-31');

  // Yearly filter state for Monthly Revenue Chart
  const [revenueYear, setRevenueYear] = useState('2026');

  // Yearly filter state for Invoice Status Chart
  const [statusYear, setStatusYear] = useState('2026');

  const chartData = useMemo(() => generateRevenueData(), [selectedMonth]);
  const growthData = useMemo(() => generateUserGrowthData(), [startDate, endDate]);
  const monthlyRevenueData = useMemo(() => generateMonthlyRevenueData(revenueYear), [revenueYear]);
  const statusData = useMemo(() => generateInvoiceStatusData(statusYear), [statusYear]);

  const stats = [
    { label: 'Total Revenue', value: '₦245.5k', trend: '+12.5%', icon: <DollarSign size={20} />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', isPositive: true },
    { label: 'MRR', value: '₦45.2k', trend: '+5.2%', icon: <TrendingUp size={20} />, color: '#6366f1', bg: '#eef2ff', isPositive: true },
    { label: 'Pending Invoices', value: '₦12.4k', trend: '-2.1%', icon: <FileText size={20} />, color: '#f59e0b', bg: '#fffbeb', isPositive: false },
    { label: 'Active Plans', value: '1,204', trend: '+8.4%', icon: <CreditCard size={20} />, color: '#3b82f6', bg: '#eff6ff', isPositive: true },
  ];

  const pieSegments = [
    { label: 'Enterprise', value: 55, color: '#6366f1' },
    { label: 'Pro', value: 30, color: '#8b5cf6' },
    { label: 'Basic', value: 15, color: '#c4b5fd' },
  ];

  const recentTransactions = [
    { id: 'TRX-1092', user: 'Acme Corp', amount: '₦4,500.00', status: 'Completed', date: 'Oct 24, 2026', type: 'Enterprise Plan' },
    { id: 'TRX-1091', user: 'Globex Inc', amount: '₦1,200.00', status: 'Pending', date: 'Oct 23, 2026', type: 'Pro Plan' },
    { id: 'TRX-1090', user: 'Stark Ind', amount: '₦4,500.00', status: 'Completed', date: 'Oct 23, 2026', type: 'Enterprise Plan' },
    { id: 'TRX-1089', user: 'Wayne Tech', amount: '₦450.00', status: 'Failed', date: 'Oct 22, 2026', type: 'Basic Plan' },
  ];

  const unpaidInvoices = [
    { id: 'INV-2041', user: 'Global Dynamics', amount: '₦4,500.00', dueDate: 'Oct 20, 2026', status: 'Overdue', daysOverdue: 4 },
    { id: 'INV-2045', user: 'TechFlow Solutions', amount: '₦1,200.00', dueDate: 'Oct 25, 2026', status: 'Unpaid', daysOverdue: 0 },
    { id: 'INV-2048', user: 'Apex Industries', amount: '₦4,500.00', dueDate: 'Oct 28, 2026', status: 'Unpaid', daysOverdue: 0 },
  ];

  return (
    <div className="fin-dashboard">
      <div className="fin-page-header">
        <div>
          <h1>Finance Dashboard</h1>
          <p>Financial overview and revenue metrics for your platform.</p>
        </div>
        <div className="fin-header-actions">
          <button className="fin-btn-secondary"><Filter size={16} /> Filter</button>
          <button className="fin-btn-primary"><Download size={16} /> Export Report</button>
        </div>
      </div>

      <div className="fin-stats-grid">
        {stats.map((s, i) => (
          <motion.div key={i} className="fin-stat-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="fin-stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div className="fin-stat-info">
              <span className="fin-stat-label">{s.label}</span>
              <span className="fin-stat-value">{s.value}</span>
            </div>
            <div className="fin-trend" style={{ color: s.isPositive ? '#10b981' : '#ef4444' }}>
              {s.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span>{s.trend}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="fin-charts-row">
        <div className="fin-chart-card fin-bar-card">
          <div className="fin-chart-header">
            <div>
              <h3>Revenue vs Expenses</h3>
              <p>Daily cash flow — {selectedMonth} 2026</p>
            </div>
            <div className="fin-chart-controls">
              <div className="fin-bar-legend">
                <span className="fin-legend-dot" style={{ background: '#10b981' }} /> <span className="fin-legend-tag">Revenue</span>
                <span className="fin-legend-dot" style={{ background: '#ef4444' }} /> <span className="fin-legend-tag">Expenses</span>
              </div>
              <div className="fin-month-picker" onClick={() => setMonthOpen(!monthOpen)}>
                {selectedMonth} <ChevronDown size={14} />
                <AnimatePresence>
                  {monthOpen && (
                    <motion.div className="fin-month-dropdown" initial={{ opacity: 0, y: 4, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.95 }}>
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                        <button key={m} className={m === selectedMonth ? 'active' : ''} onClick={(e) => { e.stopPropagation(); setSelectedMonth(m); setMonthOpen(false); }}>{m}</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="fin-bar-chart-wrap"><GroupedBarChart data={chartData} height={300} /></div>
        </div>

        <div className="fin-chart-card fin-pie-card">
          <div className="fin-chart-header">
            <div><h3>Revenue Breakdown</h3><p>By subscription plan</p></div>
          </div>
          <div className="fin-pie-wrap">
            <PieChart segments={pieSegments} size={180} />
            <div className="fin-pie-center-text">
              <span className="fin-pie-total">₦45.2k</span>
              <span className="fin-pie-label-sm">MRR</span>
            </div>
          </div>
          <div className="fin-pie-legend">
            {pieSegments.map(s => (
              <div key={s.label} className="fin-pie-legend-item">
                <div className="fin-pie-legend-color" style={{ background: s.color }} />
                <span className="fin-pie-legend-name">{s.label}</span>
                <span className="fin-pie-legend-val">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fin-chart-card" style={{ marginBottom: '1.5rem' }}>
        <div className="fin-chart-header">
          <div>
            <h3>Platform Growth</h3>
            <p>Total registered Hosts and Estate Managers across the platform</p>
          </div>
          <div className="fin-chart-controls">
            <div className="fin-bar-legend" style={{ marginRight: '1rem' }}>
              <span className="fin-legend-dot" style={{ background: '#3b82f6' }} /> <span className="fin-legend-tag">Hosts</span>
              <span className="fin-legend-dot" style={{ background: '#f59e0b' }} /> <span className="fin-legend-tag">Estate Managers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input 
                type="date" 
                className="fin-date-input" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
              />
              <span style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem' }}>to</span>
              <input 
                type="date" 
                className="fin-date-input" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
              />
            </div>
          </div>
        </div>
        <div className="fin-line-chart-wrap" style={{ marginTop: '1rem' }}>
          <LineChart data={growthData} height={320} />
        </div>
      </div>

      <div className="fin-charts-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="fin-chart-card" style={{ marginBottom: '1.5rem' }}>
          <div className="fin-chart-header">
            <div>
              <h3>Monthly Revenue Overview</h3>
              <p>Total revenue collected per month in {revenueYear}</p>
            </div>
            <div className="fin-chart-controls">
              <select 
                className="fin-date-input"
                value={revenueYear}
                onChange={(e) => setRevenueYear(e.target.value)}
                style={{ padding: '6px 12px', minWidth: '100px' }}
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>
          <div className="fin-bar-chart-wrap" style={{ marginTop: '1rem' }}>
            <SingleBarChart data={monthlyRevenueData} height={320} />
          </div>
        </div>

        <div className="fin-chart-card" style={{ marginBottom: '1.5rem' }}>
          <div className="fin-chart-header">
            <div>
              <h3>Invoice Status Breakdown</h3>
              <p>Total amount per invoice status in {statusYear}</p>
            </div>
            <div className="fin-chart-controls">
              <select 
                className="fin-date-input"
                value={statusYear}
                onChange={(e) => setStatusYear(e.target.value)}
                style={{ padding: '6px 12px', minWidth: '100px' }}
              >
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>
          <div className="fin-bar-chart-wrap" style={{ marginTop: '1rem' }}>
            <SingleBarChart data={statusData} height={320} />
          </div>
        </div>
      </div>

      <div className="fin-chart-card fin-recent-card">
        <div className="fin-chart-header" style={{ marginBottom: '1.5rem' }}>
          <div><h3>Recent Transactions</h3><p>Latest payment activity across the platform</p></div>
          <button className="fin-btn-text">View All <ArrowRight size={16} /></button>
        </div>
        <div className="fin-table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>User / Company</th>
                <th>Plan Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((trx, i) => (
                <tr key={i} className="fin-tr-clickable" onClick={() => navigate(`/${role}/invoices/${trx.id}`)}>
                  <td className="fin-td-id">{trx.id}</td>
                  <td className="fin-td-user">{trx.user}</td>
                  <td className="fin-td-type">{trx.type}</td>
                  <td className="fin-td-amount">{trx.amount}</td>
                  <td className="fin-td-date">{trx.date}</td>
                  <td>
                    <span className={`fin-badge fin-badge-${trx.status.toLowerCase()}`}>
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="fin-chart-card fin-recent-card" style={{ marginTop: '1.5rem' }}>
        <div className="fin-chart-header" style={{ marginBottom: '1.5rem' }}>
          <div><h3>Unpaid Invoices</h3><p>Invoices currently pending payment or overdue</p></div>
          <button className="fin-btn-text">View All <ArrowRight size={16} /></button>
        </div>
        <div className="fin-table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Company</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {unpaidInvoices.map((inv, i) => (
                <tr key={i} className="fin-tr-clickable" onClick={() => navigate(`/${role}/invoices/${inv.id}`)}>
                  <td className="fin-td-id">{inv.id}</td>
                  <td className="fin-td-user">{inv.user}</td>
                  <td className="fin-td-amount">{inv.amount}</td>
                  <td className="fin-td-date" style={{ color: inv.status === 'Overdue' ? 'var(--text-error)' : 'inherit' }}>{inv.dueDate}</td>
                  <td>
                    <span className={`fin-badge fin-badge-${inv.status.toLowerCase()}`}>
                      {inv.status} {inv.status === 'Overdue' ? `(${inv.daysOverdue}d)` : ''}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .fin-dashboard { padding: 2rem; height: 100%; overflow-y: auto; background: var(--bg-default); }
        .fin-page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .fin-page-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
        .fin-page-header p { color: var(--text-secondary); font-size: 0.875rem; }
        .fin-header-actions { display: flex; gap: 0.75rem; }
        .fin-btn-primary { background: var(--bg-brand); color: var(--text-inverse); padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.875rem; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
        .fin-btn-secondary { background: var(--bg-surface); color: var(--text-primary); padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.875rem; border: 1px solid var(--border-default); cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
        .fin-btn-text { background: none; border: none; color: var(--bg-brand); font-weight: 600; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.25rem; }
        
        .fin-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem; }
        .fin-stat-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; display: flex; align-items: center; gap: 1rem; position: relative; }
        .fin-stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .fin-stat-info { display: flex; flex-direction: column; }
        .fin-stat-label { font-size: 0.75rem; color: var(--text-quaternary); font-weight: 600; margin-bottom: 0.25rem; }
        .fin-stat-value { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); line-height: 1; }
        .fin-trend { position: absolute; top: 1.25rem; right: 1.25rem; display: flex; align-items: center; gap: 4px; font-size: 0.75rem; font-weight: 700; background: var(--bg-subtle); padding: 4px 8px; border-radius: 12px; }

        .fin-charts-row { display: grid; grid-template-columns: 1fr 340px; gap: 1.25rem; margin-bottom: 1.5rem; }
        .fin-chart-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; }
        .fin-chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem; }
        .fin-chart-header h3 { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin-bottom: 2px; }
        .fin-chart-header p { font-size: 0.75rem; color: var(--text-quaternary); font-weight: 500; }
        .fin-chart-controls { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .fin-bar-legend { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); }
        .fin-legend-dot { width: 8px; height: 8px; border-radius: 2px; display: inline-block; }
        .fin-legend-tag { margin-right: 8px; }
        
        .fin-month-picker { position: relative; display: flex; align-items: center; gap: 6px; background: var(--bg-subtle); border: 1px solid var(--border-default); border-radius: 8px; padding: 6px 12px; font-size: 0.75rem; font-weight: 700; color: var(--text-primary); cursor: pointer; user-select: none; }
        .fin-month-dropdown { position: absolute; top: 100%; right: 0; margin-top: 4px; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 12px; padding: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; z-index: 10; min-width: 180px; }
        .fin-month-dropdown button { background: none; border: none; padding: 6px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; color: var(--text-tertiary); cursor: pointer; text-align: center; }
        .fin-month-dropdown button:hover { background: var(--bg-subtle); color: var(--bg-brand); }
        .fin-month-dropdown button.active { background: var(--bg-brand); color: var(--text-inverse); }
        
        .fin-date-input { background: var(--bg-subtle); border: 1px solid var(--border-default); border-radius: 8px; padding: 6px 12px; font-size: 0.75rem; font-family: inherit; font-weight: 600; color: var(--text-primary); outline: none; }
        .fin-date-input:focus { border-color: var(--bg-brand); }

        .fin-bar-chart-wrap, .fin-line-chart-wrap { width: 100%; overflow: hidden; }
        .fin-pie-wrap { position: relative; display: flex; justify-content: center; align-items: center; margin: 1rem 0 2rem; }
        .fin-pie-center-text { position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; }
        .fin-pie-total { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); line-height: 1; }
        .fin-pie-label-sm { font-size: 0.75rem; color: var(--text-quaternary); font-weight: 600; margin-top: 2px; }
        .fin-pie-legend { display: flex; flex-direction: column; gap: 0.75rem; }
        .fin-pie-legend-item { display: flex; align-items: center; gap: 0.75rem; }
        .fin-pie-legend-color { width: 12px; height: 12px; border-radius: 4px; }
        .fin-pie-legend-name { font-size: 0.875rem; color: var(--text-secondary); font-weight: 600; flex: 1; }
        .fin-pie-legend-val { font-size: 0.875rem; color: var(--text-primary); font-weight: 800; }

        .fin-table-wrap { overflow-x: auto; }
        .fin-table { width: 100%; border-collapse: collapse; text-align: left; }
        .fin-table th { padding: 1rem; border-bottom: 1px solid var(--border-default); font-size: 0.75rem; font-weight: 700; color: var(--text-quaternary); text-transform: uppercase; letter-spacing: 0.05em; }
        .fin-table td { padding: 1rem; border-bottom: 1px solid var(--border-subtle); font-size: 0.875rem; }
        .fin-tr-clickable { cursor: pointer; transition: background 0.15s ease; }
        .fin-tr-clickable:hover { background: var(--bg-subtle); }
        .fin-table tr:last-child td { border-bottom: none; }
        .fin-td-id { font-weight: 700; color: var(--bg-brand); font-family: monospace; font-size: 0.9rem !important; }
        .fin-td-user { font-weight: 700; color: var(--text-primary); }
        .fin-td-type { color: var(--text-secondary); font-weight: 500; }
        .fin-td-amount { font-weight: 800; color: var(--text-primary); }
        .fin-td-date { color: var(--text-tertiary); font-size: 0.8rem !important; }
        
        .fin-badge { padding: 4px 10px; border-radius: 20px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.02em; }
        .fin-badge-completed { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .fin-badge-pending, .fin-badge-unpaid { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .fin-badge-failed, .fin-badge-overdue { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        @media (max-width: 1100px) {
          .fin-charts-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .fin-dashboard { padding: 1rem; }
          .fin-chart-header { flex-direction: column; gap: 1rem; }
          .fin-chart-controls { width: 100%; justify-content: space-between; }
        }
      `}</style>
    </div>
  );
};

export default FinanceDashboard;
