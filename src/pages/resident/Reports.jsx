import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, Download, TrendingUp, CheckCircle, Clock, XCircle, Search } from 'lucide-react';

const APPOINTMENTS = [
  { id: 'APT-001', visitor: 'Dr. Alison Ogaga', purpose: 'Medical Visit', date: '2026-04-01', time: '09:00 AM', status: 'completed' },
  { id: 'APT-002', visitor: 'Mr. James Wilson', purpose: 'Business Meeting', date: '2026-04-05', time: '02:00 PM', status: 'completed' },
  { id: 'APT-003', visitor: 'Ms. Sarah Connor', purpose: 'Social Visit', date: '2026-04-10', time: '11:00 AM', status: 'cancelled' },
  { id: 'APT-004', visitor: 'Mrs. Grace Olu', purpose: 'Family Visit', date: '2026-04-15', time: '03:00 PM', status: 'completed' },
  { id: 'APT-005', visitor: 'Mr. Victor Salisu', purpose: 'Package Delivery', date: '2026-04-18', time: '10:30 AM', status: 'scheduled' },
  { id: 'APT-006', visitor: 'Dr. Michael Eze', purpose: 'Medical Visit', date: '2026-04-20', time: '01:00 PM', status: 'completed' },
  { id: 'APT-007', visitor: 'Ms. Fatima Bello', purpose: 'Official Visit', date: '2026-04-22', time: '04:00 PM', status: 'scheduled' },
  { id: 'APT-008', visitor: 'Mr. Chidi Okafor', purpose: 'Social Visit', date: '2026-04-25', time: '12:00 PM', status: 'cancelled' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const BarChart = ({ data, height = 200 }) => {
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: `${height}px`, padding: '0 8px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.count / max) * 80}%` }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            style={{ width: '100%', background: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)', borderRadius: '4px 4px 0 0', minHeight: d.count > 0 ? '4px' : '0' }}
          />
          <span style={{ fontSize: '0.6rem', color: 'var(--text-quaternary)', fontWeight: 600 }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
};

const PieChart = ({ segments, size = 140 }) => {
  const r = 55;
  const cx = size / 2;
  const cy = size / 2;
  const total = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  let cumulAngle = -Math.PI / 2;
  const arcs = segments.map((seg) => {
    const angle = (seg.value / total) * Math.PI * 2;
    const x1 = cx + r * Math.cos(cumulAngle);
    const y1 = cy + r * Math.sin(cumulAngle);
    cumulAngle += angle;
    const x2 = cx + r * Math.cos(cumulAngle);
    const y2 = cy + r * Math.sin(cumulAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    return { d: `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`, color: seg.color };
  });
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: size, height: size }}>
      {arcs.map((arc, i) => <path key={i} d={arc.d} fill={arc.color} stroke="white" strokeWidth={2} />)}
      <circle cx={cx} cy={cy} r={r * 0.45} fill="white" />
    </svg>
  );
};

const STATUS_COLORS = {
  completed: { bg: '#f0fdf4', color: '#16a34a' },
  scheduled: { bg: '#eff6ff', color: 'var(--accent-primary)' },
  cancelled: { bg: 'var(--bg-danger-subtle)', color: '#dc2626' },
};

const ResidentReports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredAppointments = useMemo(() => {
    return APPOINTMENTS.filter(appt => {
      if (startDate && appt.date < startDate) return false;
      if (endDate && appt.date > endDate) return false;
      const q = search.toLowerCase();
      if (q && !appt.visitor.toLowerCase().includes(q) && !appt.purpose.toLowerCase().includes(q) && !appt.id.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [startDate, endDate, search]);

  const totalPages = Math.ceil(filteredAppointments.length / pageSize);
  const paginated = filteredAppointments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const stats = {
    total: APPOINTMENTS.length,
    completed: APPOINTMENTS.filter(a => a.status === 'completed').length,
    scheduled: APPOINTMENTS.filter(a => a.status === 'scheduled').length,
    cancelled: APPOINTMENTS.filter(a => a.status === 'cancelled').length,
  };

  const monthlyData = MONTHS.map(label => ({
    label,
    count: APPOINTMENTS.filter(a => {
      const m = new Date(a.date).getMonth();
      return MONTHS[m] === label;
    }).length,
  }));

  const pieSegments = [
    { label: 'Completed', value: stats.completed, color: 'var(--text-success)' },
    { label: 'Scheduled', value: stats.scheduled, color: '#3b82f6' },
    { label: 'Cancelled', value: stats.cancelled, color: 'var(--text-danger)' },
  ];

  return (
    <div className="rr-page">
      <div className="rr-header">
        <h1>Reports</h1>
        <p>Overview of your appointments and activity for the current year.</p>
      </div>

      {/* Stat Cards */}
      <div className="rr-stats-grid">
        {[
          { label: 'Total Appointments', value: stats.total, icon: <Calendar size={20} />, color: '#6366f1', bg: '#eef2ff' },
          { label: 'Completed', value: stats.completed, icon: <CheckCircle size={20} />, color: 'var(--text-success)', bg: '#f0fdf4' },
          { label: 'Scheduled', value: stats.scheduled, icon: <Clock size={20} />, color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Cancelled', value: stats.cancelled, icon: <XCircle size={20} />, color: 'var(--text-danger)', bg: 'var(--bg-danger-subtle)' },
        ].map((s, i) => (
          <motion.div key={i} className="rr-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="rr-stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div>
              <span className="rr-stat-label">{s.label}</span>
              <span className="rr-stat-value">{s.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="rr-charts-row">
        <div className="rr-chart-card">
          <h3>Appointments Overview — 2026</h3>
          <p>Monthly breakdown of all appointments</p>
          <BarChart data={monthlyData} height={180} />
        </div>
        <div className="rr-chart-card rr-pie-card">
          <h3>Status Distribution</h3>
          <div className="rr-pie-wrap">
            <PieChart segments={pieSegments} size={140} />
          </div>
          <div className="rr-pie-legend">
            {pieSegments.map((seg, i) => (
              <div key={i} className="rr-legend-item">
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: seg.color, display: 'inline-block' }} />
                <span>{seg.label}</span>
                <span style={{ marginLeft: 'auto', fontWeight: 700 }}>{seg.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rr-table-card">
        <div className="rr-toolbar">
          <div>
            <h3>Appointment Records</h3>
            <p>{filteredAppointments.length} records found</p>
          </div>
          <div className="rr-filters">
            <div className="rr-search-box">
              <Search size={15} />
              <input type="text" placeholder="Search..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />
            </div>
            <div className="rr-date-filters">
              <input type="date" value={startDate} onChange={e => { setStartDate(e.target.value); setCurrentPage(1); }} />
              <span>to</span>
              <input type="date" value={endDate} onChange={e => { setEndDate(e.target.value); setCurrentPage(1); }} />
              {(startDate || endDate || search) && (
                <button className="rr-clear-btn" onClick={() => { setStartDate(''); setEndDate(''); setSearch(''); setCurrentPage(1); }}>Clear</button>
              )}
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="rr-table">
            <thead>
              <tr>
                <th>ID</th><th>Visitor</th><th>Purpose</th><th>Date</th><th>Time</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length > 0 ? paginated.map(appt => {
                const sc = STATUS_COLORS[appt.status] || {};
                return (
                  <tr key={appt.id}>
                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{appt.id}</td>
                    <td style={{ fontWeight: 600 }}>{appt.visitor}</td>
                    <td style={{ color: 'var(--text-tertiary)' }}>{appt.purpose}</td>
                    <td style={{ color: 'var(--text-tertiary)' }}>{appt.date}</td>
                    <td style={{ color: 'var(--text-tertiary)' }}>{appt.time}</td>
                    <td><span className="rr-status-pill" style={{ background: sc.bg, color: sc.color }}>{appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}</span></td>
                  </tr>
                );
              }) : (
                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-quaternary)' }}>No appointments found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="rr-pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
          </div>
        )}
      </div>

      <style jsx="true">{`
        .rr-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .rr-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
        .rr-header p { color: var(--text-tertiary); font-size: 0.9375rem; }

        .rr-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .rr-stat-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 16px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; }
        .rr-stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .rr-stat-label { display: block; font-size: 0.75rem; color: var(--text-quaternary); font-weight: 600; }
        .rr-stat-value { display: block; font-size: 1.75rem; font-weight: 800; color: var(--text-primary); line-height: 1; }

        .rr-charts-row { display: grid; grid-template-columns: 1fr 280px; gap: 1.25rem; }
        .rr-chart-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; }
        .rr-chart-card h3 { font-size: 1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
        .rr-chart-card p { font-size: 0.75rem; color: var(--text-quaternary); margin-bottom: 1rem; }
        .rr-pie-wrap { display: flex; justify-content: center; margin: 1rem 0; }
        .rr-pie-legend { display: flex; flex-direction: column; gap: 0.625rem; }
        .rr-legend-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; color: var(--text-secondary); }

        .rr-table-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; }
        .rr-toolbar { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem; }
        .rr-toolbar h3 { font-size: 1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 2px; }
        .rr-toolbar p { font-size: 0.75rem; color: var(--text-quaternary); }
        .rr-filters { display: flex; flex-direction: column; gap: 0.75rem; align-items: flex-end; }
        .rr-search-box { display: flex; align-items: center; gap: 0.5rem; background: var(--bg-subtle); border: 1px solid var(--border-default); border-radius: 8px; padding: 0.5rem 0.875rem; }
        .rr-search-box input { border: none; background: none; outline: none; font-size: 0.8125rem; width: 200px; }
        .rr-date-filters { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
        .rr-date-filters input { padding: 0.5rem 0.75rem; border: 1px solid var(--border-default); border-radius: 8px; font-size: 0.8125rem; outline: none; }
        .rr-date-filters span { font-size: 0.8125rem; color: var(--text-tertiary); }
        .rr-clear-btn { background: none; border: none; color: var(--text-danger); font-weight: 700; font-size: 0.8125rem; cursor: pointer; }

        .rr-table { width: 100%; border-collapse: collapse; text-align: left; min-width: 550px; }
        .rr-table th { padding: 0.75rem 0; font-size: 0.75rem; font-weight: 600; color: var(--text-quaternary); border-bottom: 1px solid var(--bg-muted); }
        .rr-table td { padding: 1rem 0; font-size: 0.875rem; border-bottom: 1px solid var(--bg-muted); }
        .rr-table tbody tr:last-child td { border-bottom: none; }
        .rr-status-pill { padding: 3px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; }

        .rr-pagination { display: flex; align-items: center; justify-content: center; gap: 1rem; padding-top: 1.25rem; border-top: 1px solid var(--bg-muted); margin-top: 1rem; }
        .rr-pagination button { background: var(--bg-surface); border: 1px solid var(--border-default); padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.875rem; }
        .rr-pagination button:disabled { opacity: 0.4; cursor: not-allowed; }
        .rr-pagination span { font-size: 0.875rem; color: var(--text-tertiary); }

        @media (max-width: 1100px) {
          .rr-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .rr-charts-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .rr-page { padding: 1rem; }
          .rr-header h1 { font-size: 1.4rem; }
          .rr-stats-grid { grid-template-columns: 1fr; }
          .rr-toolbar { flex-direction: column; }
          .rr-filters { align-items: stretch; width: 100%; }
          .rr-search-box { width: 100%; }
          .rr-search-box input { width: 100%; }
          .rr-date-filters { flex-direction: column; align-items: stretch; }
          .rr-date-filters input { width: 100%; }
          .rr-table-card { padding: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default ResidentReports;
