import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, CalendarCheck, Clock, CheckCircle } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Dummy data for visitors
const VISITORS_DATA = [
  { id: 1, name: 'John Smith', status: 'completed', date: '2026-01-10', purpose: 'Meeting' },
  { id: 2, name: 'Sarah Johnson', status: 'completed', date: '2026-01-15', purpose: 'Interview' },
  { id: 3, name: 'Emily Davis', status: 'completed', date: '2026-02-12', purpose: 'Maintenance' },
  { id: 4, name: 'David Wilson', status: 'completed', date: '2026-03-20', purpose: 'Meeting' },
  { id: 5, name: 'Michael Eze', status: 'completed', date: '2026-04-15', purpose: 'Personal' },
  { id: 6, name: 'Fatima Bello', status: 'completed', date: '2026-05-01', purpose: 'Delivery' },
  { id: 7, name: 'Chidi Okafor', status: 'arrived', date: '2026-06-04', purpose: 'Meeting' },
  { id: 8, name: 'Alison Ogaga', status: 'expected', date: '2026-06-05', purpose: 'Interview' },
  { id: 9, name: 'James Wilson', status: 'expected', date: '2026-07-02', purpose: 'Maintenance' },
  { id: 10, name: 'Victoria Salisu', status: 'expected', date: '2026-08-15', purpose: 'Meeting' },
  { id: 11, name: 'Brian Scott', status: 'completed', date: '2025-11-10', purpose: 'Meeting' },
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
            style={{ width: '100%', background: 'linear-gradient(180deg, var(--accent-primary), var(--bg-brand))', borderRadius: '4px 4px 0 0', minHeight: d.count > 0 ? 4 : 0 }}
          />
          <span style={{ fontSize: '0.6rem', color: 'var(--text-quaternary)', fontWeight: 600 }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
};

const VisitorReport = () => {
  const [dateFilter, setDateFilter] = useState('2026'); // YYYY format or 'all'
  
  // Filter data based on selected year
  const filteredVisitors = useMemo(() => {
    if (dateFilter === 'all') return VISITORS_DATA;
    return VISITORS_DATA.filter(v => v.date.startsWith(dateFilter));
  }, [dateFilter]);

  const stats = {
    total: filteredVisitors.length,
    expected: filteredVisitors.filter(v => v.status === 'expected').length,
    arrived: filteredVisitors.filter(v => v.status === 'arrived').length,
    completed: filteredVisitors.filter(v => v.status === 'completed').length,
  };

  const monthlyVisitors = MONTHS.map(label => {
    return {
      label,
      count: filteredVisitors.filter(v => {
        return MONTHS[new Date(v.date).getMonth()] === label;
      }).length
    };
  });

  // Sort latest first for the table
  const sortedVisitors = [...filteredVisitors].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="vr-page">
      <div className="vr-header">
        <div>
          <h1>Visitor Report</h1>
          <p>Analyze visitor volume and historical trends.</p>
        </div>
        <div className="vr-filter">
          <label>Filter by Year:</label>
          <select value={dateFilter} onChange={e => setDateFilter(e.target.value)}>
            <option value="all">All Time</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="vr-stats-grid">
        <motion.div className="vr-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="vr-stat-icon" style={{ background: 'var(--bg-subtle)', color: 'var(--brand-primary)' }}>
            <Users size={20} />
          </div>
          <div>
            <span className="vr-stat-label">Total Visitors</span>
            <span className="vr-stat-value">{stats.total}</span>
          </div>
        </motion.div>
        
        <motion.div className="vr-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="vr-stat-icon" style={{ background: 'var(--bg-warning-subtle)', color: 'var(--text-warning)' }}>
            <Clock size={20} />
          </div>
          <div>
            <span className="vr-stat-label">Expected</span>
            <span className="vr-stat-value">{stats.expected}</span>
          </div>
        </motion.div>
        
        <motion.div className="vr-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="vr-stat-icon" style={{ background: 'var(--bg-success-subtle)', color: 'var(--text-success)' }}>
            <CalendarCheck size={20} />
          </div>
          <div>
            <span className="vr-stat-label">Arrived</span>
            <span className="vr-stat-value">{stats.arrived}</span>
          </div>
        </motion.div>

        <motion.div className="vr-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="vr-stat-icon" style={{ background: 'var(--bg-brand-hover)', color: 'var(--text-inverse)' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <span className="vr-stat-label">Completed</span>
            <span className="vr-stat-value">{stats.completed}</span>
          </div>
        </motion.div>
      </div>

      {/* Bar Chart */}
      <div className="vr-chart-card">
        <div className="vr-chart-header">
          <div>
            <h3>Total Visitors Timeline</h3>
            <p>Visitors grouped by month ({dateFilter === 'all' ? 'All Time' : dateFilter})</p>
          </div>
        </div>
        <BarChart data={monthlyVisitors} height={250} />
      </div>

      {/* Recent Visitors Table */}
      <div className="vr-table-card">
        <h3>Last 10 Visitors</h3>
        <div className="vr-table-container">
          <table className="vr-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Visit Date</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {sortedVisitors.slice(0, 10).map((v) => (
                <tr key={v.id}>
                  <td><strong>{v.name}</strong></td>
                  <td>
                    <span className={`vr-badge ${v.status === 'completed' ? 'success' : v.status === 'arrived' ? 'info' : 'warning'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td>{v.date || '-'}</td>
                  <td>{v.purpose || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .vr-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .vr-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; }
        .vr-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
        .vr-header p { color: var(--text-tertiary); margin: 0; }
        
        .vr-filter { display: flex; align-items: center; gap: 0.75rem; }
        .vr-filter label { font-size: 0.875rem; color: var(--text-secondary); font-weight: 600; margin: 0; }
        .vr-filter select { padding: 0.5rem 1rem; border: 1px solid var(--border-default); border-radius: 8px; background: var(--bg-surface); color: var(--text-primary); font-weight: 600; outline: none; }
        
        .vr-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .vr-stat-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 16px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .vr-stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .vr-stat-label { display: block; font-size: 0.75rem; color: var(--text-quaternary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
        .vr-stat-value { display: block; font-size: 1.875rem; font-weight: 800; color: var(--text-primary); line-height: 1; }
        
        .vr-chart-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .vr-chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem; }
        .vr-chart-header h3 { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
        .vr-chart-header p { font-size: 0.875rem; color: var(--text-quaternary); margin: 0; }
        
        .vr-table-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .vr-table-card h3 { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin: 0 0 1.25rem 0; }
        .vr-table-container { overflow-x: auto; }
        .vr-table { width: 100%; border-collapse: collapse; text-align: left; }
        .vr-table th { padding: 1rem; border-bottom: 1px solid var(--border-default); color: var(--text-tertiary); font-weight: 600; font-size: 0.875rem; white-space: nowrap; }
        .vr-table td { padding: 1rem; border-bottom: 1px solid var(--border-default); color: var(--text-primary); font-size: 0.9375rem; }
        .vr-table tr:last-child td { border-bottom: none; }
        .vr-badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; text-transform: capitalize; display: inline-block; }
        .vr-badge.success { background: var(--bg-success-subtle); color: var(--text-success); }
        .vr-badge.warning { background: var(--bg-warning-subtle); color: var(--text-warning); }
        .vr-badge.info { background: #e0f2fe; color: #0369a1; }
        
        @media (max-width: 1024px) {
          .vr-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .vr-stats-grid { grid-template-columns: 1fr; }
          .vr-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
};

export default VisitorReport;
