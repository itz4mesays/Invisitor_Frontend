import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, CheckCircle, Clock, XCircle, Download, Search, ChevronLeft, ChevronRight } from 'lucide-react';

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
  { id: 9, visitor: 'Mr. John Doe', resident: 'David Wilson', date: '2026-05-10', status: 'completed' },
  { id: 10, visitor: 'Mrs. Jane Doe', resident: 'Emily Davis', date: '2026-05-15', status: 'scheduled' },
  { id: 11, visitor: 'Dr. Strange', resident: 'Sarah Johnson', date: '2026-06-01', status: 'completed' },
  { id: 12, visitor: 'Mr. Bean', resident: 'John Smith', date: '2026-06-05', status: 'cancelled' },
];

const BarChart = ({ data, height = 220 }) => {
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height, padding: '0 8px' }}>
      {data.map((d, i) => (
        <div key={i} className="chart-bar-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 4, position: 'relative' }}>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.count / max) * 80}%` }}
            transition={{ delay: i * 0.04, duration: 0.5 }}
            className="chart-bar"
            style={{ width: '100%', background: 'linear-gradient(180deg, #3b82f6, #1d4ed8)', borderRadius: '4px 4px 0 0', minHeight: d.count > 0 ? 4 : 0 }}
          />
          <div className="chart-tooltip">{d.count} Appts</div>
          <span style={{ fontSize: '0.6rem', color: 'var(--text-quaternary)', fontWeight: 600 }}>{d.label}</span>
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
      {arcs.map((arc, i) => (
        <g key={i} className="pie-segment">
          <path d={arc.d} fill={arc.color} stroke="var(--bg-surface)" strokeWidth={2} style={{ transition: 'all 0.2s' }} />
          <title>{arc.label}: {arc.value}</title>
        </g>
      ))}
      <circle cx={cx} cy={cy} r={r * 0.55} fill="var(--bg-surface)" />
      <text x={cx} y={cy} textAnchor="middle" dy=".3em" fontSize="1.2rem" fontWeight="bold" fill="var(--text-primary)">
        {total}
      </text>
    </svg>
  );
};

const ManagerReports = () => {
  const [filterType, setFilterType] = useState('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Filter Data
  const filteredAppointments = useMemo(() => {
    return APPOINTMENTS.filter(apt => {
      const matchSearch = apt.visitor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          apt.resident.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || apt.status === statusFilter;
      const matchStart = startDate ? new Date(apt.date) >= new Date(startDate) : true;
      const matchEnd = endDate ? new Date(apt.date) <= new Date(endDate) : true;
      return matchSearch && matchStatus && matchStart && matchEnd;
    });
  }, [searchTerm, statusFilter, startDate, endDate]);

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE) || 1;
  const currentData = filteredAppointments.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const stats = {
    total: filteredAppointments.length,
    completed: filteredAppointments.filter(a => a.status === 'completed').length,
    scheduled: filteredAppointments.filter(a => a.status === 'scheduled').length,
    cancelled: filteredAppointments.filter(a => a.status === 'cancelled').length,
  };

  const monthlyData = MONTHS.map(label => ({
    label,
    count: filteredAppointments.filter(a => MONTHS[new Date(a.date).getMonth()] === label).length
  }));

  const pieSegments = [
    { label: 'Completed', value: stats.completed, color: 'var(--text-success)' },
    { label: 'Scheduled', value: stats.scheduled, color: '#3b82f6' },
    { label: 'Cancelled', value: stats.cancelled, color: 'var(--text-danger)' },
  ];

  const checkInCount = stats.completed + stats.scheduled;
  const checkOutCount = stats.completed;

  const handleExportCSV = () => {
    const headers = ['ID', 'Visitor', 'Resident', 'Date', 'Status'];
    const rows = filteredAppointments.map(a => [a.id, a.visitor, a.resident, a.date, a.status]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Appointments_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mr-page">
      <div className="mr-header">
        <div>
          <h1>Appointments Report</h1>
          <p>Estate-wide appointment analytics and activity overview.</p>
        </div>
        <div className="mr-header-actions">
          <div className="mr-date-filters">
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mr-input" />
            <span>to</span>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mr-input" />
          </div>
          <button className="mr-export-btn" onClick={handleExportCSV}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mr-stats-grid">
        {[
          { label: 'Total Appointments', value: stats.total, icon: <Calendar size={20} />, color: '#6366f1', bg: '#eef2ff' },
          { label: 'Completed', value: stats.completed, icon: <CheckCircle size={20} />, color: 'var(--text-success)', bg: '#f0fdf4' },
          { label: 'Scheduled', value: stats.scheduled, icon: <Clock size={20} />, color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Cancelled', value: stats.cancelled, icon: <XCircle size={20} />, color: 'var(--text-danger)', bg: 'var(--bg-danger-subtle)' },
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
              <TrendingUp size={18} style={{ color: 'var(--text-success)' }} />
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
            <PieChart segments={pieSegments} size={160} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {pieSegments.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
                <span style={{ flex: 1, color: 'var(--text-tertiary)' }}>{s.label}</span>
                <strong>{s.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mr-chart-card">
        <div className="mr-chart-header">
          <div><h3>Monthly Appointments</h3><p>Grouped view of all appointments by month</p></div>
        </div>
        <BarChart data={monthlyData} height={220} />
      </div>

      {/* Recent Appointments Table */}
      <div className="mr-table-card">
        <div className="mr-table-header-row">
          <h3>Appointments Details</h3>
          <div className="mr-table-filters">
            <div className="mr-search-box">
              <Search size={16} color="var(--text-quaternary)" />
              <input 
                type="text" 
                placeholder="Search visitor or resident..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="mr-input">
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="scheduled">Scheduled</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="mr-table-container">
          <table className="mr-table">
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Resident</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map((apt) => (
                <tr key={apt.id}>
                  <td><strong>{apt.visitor}</strong></td>
                  <td>{apt.resident}</td>
                  <td>{apt.date}</td>
                  <td>
                    <span className={`mr-badge ${apt.status}`}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-tertiary)' }}>
                    No appointments found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mr-pagination">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="mr-page-btn"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <span className="mr-page-info">Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="mr-page-btn"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .mr-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .mr-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
        .mr-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
        .mr-header p { color: var(--text-tertiary); margin: 0; }
        .mr-header-actions { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        
        .mr-date-filters { display: flex; align-items: center; gap: 0.5rem; background: var(--bg-surface); border: 1px solid var(--border-default); padding: 0.25rem 0.5rem; border-radius: 8px; }
        .mr-date-filters span { font-size: 0.8rem; color: var(--text-tertiary); font-weight: 500; }
        .mr-input { border: none; background: transparent; font-size: 0.875rem; color: var(--text-primary); outline: none; padding: 0.25rem; cursor: pointer; }
        select.mr-input { border: 1px solid var(--border-default); border-radius: 6px; padding: 0.5rem; background: var(--bg-surface); }
        
        .mr-export-btn { display: flex; align-items: center; gap: 0.5rem; background: var(--text-primary); color: var(--bg-surface); border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: opacity 0.2s; }
        .mr-export-btn:hover { opacity: 0.9; }
        
        .mr-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .mr-stat-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 16px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .mr-stat-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .mr-stat-label { display: block; font-size: 0.75rem; color: var(--text-quaternary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
        .mr-stat-value { display: block; font-size: 1.75rem; font-weight: 800; color: var(--text-primary); line-height: 1; }
        
        .mr-dashboard-row { display: grid; grid-template-columns: 1fr 300px; gap: 1.25rem; }
        .mr-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .mr-card h3 { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.5rem; margin-top: 0; }
        .mr-overview-items { display: flex; flex-direction: column; gap: 1.25rem; }
        .mr-overview-item { display: flex; align-items: center; gap: 1rem; background: var(--bg-subtle); padding: 1rem; border-radius: 12px; }
        .mr-overview-item p { font-size: 0.8rem; color: var(--text-tertiary); margin: 0; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; }
        .mr-overview-item strong { font-size: 1.5rem; font-weight: 800; color: var(--text-primary); display: block; }
        
        .mr-chart-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .mr-chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 0.75rem; }
        .mr-chart-header h3 { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin: 0 0 4px 0; }
        .mr-chart-header p { font-size: 0.875rem; color: var(--text-quaternary); margin: 0; }
        
        .chart-bar-group .chart-tooltip { position: absolute; top: -30px; background: var(--text-primary); color: var(--bg-surface); font-size: 0.7rem; padding: 4px 8px; border-radius: 4px; opacity: 0; transition: opacity 0.2s; pointer-events: none; white-space: nowrap; font-weight: 600; }
        .chart-bar-group:hover .chart-tooltip { opacity: 1; }
        .chart-bar { transition: filter 0.2s; }
        .chart-bar-group:hover .chart-bar { filter: brightness(1.2); }
        
        .pie-segment path:hover { filter: brightness(1.1); transform: scale(1.02); transform-origin: center; cursor: pointer; }
        
        .mr-table-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .mr-table-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem; }
        .mr-table-header-row h3 { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin: 0; }
        .mr-table-filters { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        
        .mr-search-box { display: flex; align-items: center; gap: 0.5rem; background: var(--bg-subtle); border: 1px solid var(--border-default); padding: 0.5rem 0.75rem; border-radius: 8px; }
        .mr-search-box input { border: none; background: transparent; outline: none; font-size: 0.875rem; color: var(--text-primary); width: 200px; }
        .mr-search-box input::placeholder { color: var(--text-quaternary); }
        
        .mr-table-container { overflow-x: auto; }
        .mr-table { width: 100%; border-collapse: collapse; text-align: left; }
        .mr-table th { padding: 1rem; border-bottom: 1px solid var(--border-default); color: var(--text-tertiary); font-weight: 600; font-size: 0.875rem; white-space: nowrap; }
        .mr-table td { padding: 1rem; border-bottom: 1px solid var(--border-default); color: var(--text-primary); font-size: 0.9375rem; }
        .mr-table tr:last-child td { border-bottom: none; }
        
        .mr-badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; text-transform: capitalize; display: inline-block; }
        .mr-badge.completed { background: var(--bg-success-subtle); color: var(--text-success); }
        .mr-badge.scheduled { background: #e0f2fe; color: #0369a1; }
        .mr-badge.cancelled { background: var(--bg-danger-subtle); color: var(--text-danger); }
        
        .mr-pagination { display: flex; justify-content: flex-end; align-items: center; gap: 1rem; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-default); }
        .mr-page-btn { display: flex; align-items: center; gap: 0.25rem; background: var(--bg-surface); border: 1px solid var(--border-default); padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
        .mr-page-btn:hover:not(:disabled) { background: var(--bg-subtle); color: var(--text-primary); }
        .mr-page-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .mr-page-info { font-size: 0.875rem; color: var(--text-tertiary); font-weight: 500; }
        
        @media (max-width: 1100px) {
          .mr-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .mr-dashboard-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .mr-page { padding: 1rem; }
          .mr-stats-grid { grid-template-columns: 1fr; }
          .mr-header { flex-direction: column; }
          .mr-table-header-row { flex-direction: column; align-items: flex-start; }
          .mr-search-box { width: 100%; }
          .mr-search-box input { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ManagerReports;
