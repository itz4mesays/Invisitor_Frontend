import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, TrendingUp, CheckCircle, Clock, XCircle, Filter } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const APPOINTMENTS = [
  { id: 1, visitor: 'Dr. Alison Ogaga', resident: 'John Smith', date: '2026-01-10', status: 'completed' },
  { id: 2, visitor: 'Mr. James Wilson', resident: 'Sarah Johnson', date: '2026-02-05', status: 'completed' },
  { id: 3, visitor: 'Ms. Sarah Connor', resident: 'Emily Davis', date: '2026-03-12', status: 'cancelled' },
  { id: 4, visitor: 'Mrs. Grace Olu', resident: 'David Wilson', date: '2026-03-20', status: 'completed' },
  { id: 5, visitor: 'Mr. Victor Salisu', resident: 'John Smith', date: '2026-04-08', status: 'scheduled' },
  { id: 6, visitor: 'Dr. Michael Eze', resident: 'Sarah Johnson', date: '2026-04-15', status: 'completed' },
  { id: 7, visitor: 'Ms. Fatima Bello', resident: 'Emily Davis', date: '2026-04-22', status: 'scheduled' },
  { id: 8, visitor: 'Mr. Chidi Okafor', resident: 'David Wilson', date: '2026-04-28', status: 'cancelled' },
];

const BarChart = ({ data, height = 220 }) => {
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height, padding: '0 8px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 4 }}>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.count / max) * 80}%` }}
            transition={{ delay: i * 0.04, duration: 0.5 }}
            style={{ width: '100%', background: 'linear-gradient(180deg, #3b82f6, #1d4ed8)', borderRadius: '4px 4px 0 0', minHeight: d.count > 0 ? 4 : 0 }}
          />
          <span style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 600 }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
};

const PieChart = ({ segments, size = 150 }) => {
  const r = 60; const cx = size / 2; const cy = size / 2;
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  let ang = -Math.PI / 2;
  const arcs = segments.map(seg => {
    const a = (seg.value / total) * Math.PI * 2;
    const x1 = cx + r * Math.cos(ang); const y1 = cy + r * Math.sin(ang);
    ang += a;
    const x2 = cx + r * Math.cos(ang); const y2 = cy + r * Math.sin(ang);
    return { d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${a > Math.PI ? 1 : 0},1 ${x2},${y2} Z`, color: seg.color, label: seg.label, value: seg.value };
  });
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
      {arcs.map((arc, i) => <path key={i} d={arc.d} fill={arc.color} stroke="white" strokeWidth={2} />)}
      <circle cx={cx} cy={cy} r={r * 0.45} fill="white" />
    </svg>
  );
};

const ManagerReports = () => {
  const [filterType, setFilterType] = useState('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const stats = {
    total: APPOINTMENTS.length,
    completed: APPOINTMENTS.filter(a => a.status === 'completed').length,
    scheduled: APPOINTMENTS.filter(a => a.status === 'scheduled').length,
    cancelled: APPOINTMENTS.filter(a => a.status === 'cancelled').length,
  };

  const monthlyData = MONTHS.map(label => ({
    label,
    count: APPOINTMENTS.filter(a => MONTHS[new Date(a.date).getMonth()] === label).length
  }));

  const pieSegments = [
    { label: 'Completed', value: stats.completed, color: '#22c55e' },
    { label: 'Scheduled', value: stats.scheduled, color: '#3b82f6' },
    { label: 'Cancelled', value: stats.cancelled, color: '#ef4444' },
  ];

  const checkInCount = stats.completed + stats.scheduled;
  const checkOutCount = stats.completed;

  return (
    <div className="mr-page">
      <div className="mr-header">
        <h1>Reports</h1>
        <p>Estate-wide appointment analytics and activity overview.</p>
      </div>

      {/* Summary Stats */}
      <div className="mr-stats-grid">
        {[
          { label: 'Total Appointments', value: stats.total, icon: <Calendar size={20} />, color: '#6366f1', bg: '#eef2ff' },
          { label: 'Completed', value: stats.completed, icon: <CheckCircle size={20} />, color: '#22c55e', bg: '#f0fdf4' },
          { label: 'Scheduled', value: stats.scheduled, icon: <Clock size={20} />, color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Cancelled', value: stats.cancelled, icon: <XCircle size={20} />, color: '#ef4444', bg: '#fef2f2' },
        ].map((s, i) => (
          <motion.div key={i} className="mr-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="mr-stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div>
              <span className="mr-stat-label">{s.label}</span>
              <span className="mr-stat-value">{s.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dashboard overview */}
      <div className="mr-dashboard-row">
        <div className="mr-card">
          <h3>Dashboard Overview</h3>
          <div className="mr-overview-items">
            <div className="mr-overview-item">
              <TrendingUp size={18} style={{ color: '#22c55e' }} />
              <div>
                <p>Total Check-Ins</p>
                <strong>{checkInCount}</strong>
              </div>
            </div>
            <div className="mr-overview-item">
              <TrendingUp size={18} style={{ color: '#3b82f6', transform: 'rotate(180deg)' }} />
              <div>
                <p>Total Check-Outs</p>
                <strong>{checkOutCount}</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="mr-card mr-pie-card">
          <h3>Appointment Status</h3>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
            <PieChart segments={pieSegments} size={150} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {pieSegments.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
                <span style={{ flex: 1, color: '#64748b' }}>{s.label}</span>
                <strong>{s.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mr-chart-card">
        <div className="mr-chart-header">
          <div><h3>Monthly Appointments — 2026</h3><p>Grouped view of all appointments by month</p></div>
          <div className="mr-filter-tabs">
            {['weekly', 'monthly', 'yearly'].map(f => (
              <button key={f} className={`mr-filter-tab ${filterType === f ? 'active' : ''}`} onClick={() => setFilterType(f)}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <BarChart data={monthlyData} height={200} />
      </div>

      <style jsx>{`
        .mr-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .mr-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin-bottom: 0.25rem; }
        .mr-header p { color: #64748b; }
        .mr-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .mr-stat-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; }
        .mr-stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .mr-stat-label { display: block; font-size: 0.75rem; color: #94a3b8; font-weight: 600; }
        .mr-stat-value { display: block; font-size: 1.75rem; font-weight: 800; color: #1e293b; line-height: 1; }
        .mr-dashboard-row { display: grid; grid-template-columns: 1fr 280px; gap: 1.25rem; }
        .mr-card { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; }
        .mr-card h3 { font-size: 1rem; font-weight: 800; color: #1e293b; margin-bottom: 1.5rem; }
        .mr-overview-items { display: flex; flex-direction: column; gap: 1.25rem; }
        .mr-overview-item { display: flex; align-items: center; gap: 1rem; background: #f8fafc; padding: 1rem; border-radius: 12px; }
        .mr-overview-item p { font-size: 0.8rem; color: #64748b; margin: 0; }
        .mr-overview-item strong { font-size: 1.5rem; font-weight: 800; color: #1e293b; display: block; }
        .mr-chart-card { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; }
        .mr-chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.75rem; }
        .mr-chart-header h3 { font-size: 1rem; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
        .mr-chart-header p { font-size: 0.75rem; color: #94a3b8; margin: 0; }
        .mr-filter-tabs { display: flex; gap: 0.5rem; }
        .mr-filter-tab { background: white; border: 1px solid #e2e8f0; padding: 0.4rem 0.875rem; border-radius: 8px; font-size: 0.8125rem; font-weight: 600; color: #64748b; cursor: pointer; }
        .mr-filter-tab.active { background: #0d2331; color: white; border-color: #0d2331; }
        @media (max-width: 1100px) {
          .mr-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .mr-dashboard-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .mr-page { padding: 1rem; }
          .mr-stats-grid { grid-template-columns: 1fr; }
          .mr-chart-header { flex-direction: column; }
          .mr-filter-tabs { width: 100%; justify-content: space-between; }
          .mr-filter-tab { flex: 1; text-align: center; }
        }
      `}</style>
    </div>
  );
};

export default ManagerReports;
