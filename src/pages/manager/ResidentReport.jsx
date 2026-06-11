import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Home, DoorOpen, Building, Download, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Dummy data for residents
const RESIDENTS_DATA = [
  { id: 1, name: 'John Smith', status: 'occupying', moveInDate: '2025-11-10', moveOutDate: null },
  { id: 2, name: 'Sarah Johnson', status: 'occupying', moveInDate: '2026-01-05', moveOutDate: null },
  { id: 3, name: 'Emily Davis', status: 'vacant', moveInDate: '2025-05-10', moveOutDate: '2026-02-12' },
  { id: 4, name: 'David Wilson', status: 'occupying', moveInDate: '2026-03-20', moveOutDate: null },
  { id: 5, name: 'Michael Eze', status: 'vacant', moveInDate: '2025-12-01', moveOutDate: '2026-04-15' },
  { id: 6, name: 'Fatima Bello', status: 'occupying', moveInDate: '2026-05-01', moveOutDate: null },
  { id: 7, name: 'Chidi Okafor', status: 'vacant', moveInDate: '2024-08-11', moveOutDate: '2026-05-28' },
  { id: 8, name: 'Alison Ogaga', status: 'occupying', moveInDate: '2026-06-10', moveOutDate: null },
  { id: 9, name: 'James Wilson', status: 'occupying', moveInDate: '2026-07-02', moveOutDate: null },
  { id: 10, name: 'Victoria Salisu', status: 'occupying', moveInDate: '2026-08-15', moveOutDate: null },
  { id: 11, name: 'Hassan Bello', status: 'vacant', moveInDate: '2025-01-10', moveOutDate: '2026-01-20' },
  { id: 12, name: 'Tosin Alabi', status: 'occupying', moveInDate: '2026-02-02', moveOutDate: null },
];

const TOTAL_UNITS = 15;

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
            style={{ width: '100%', background: 'linear-gradient(180deg, var(--accent-primary), var(--bg-brand))', borderRadius: '4px 4px 0 0', minHeight: d.count > 0 ? 4 : 0 }}
          />
          <div className="chart-tooltip">{d.count} Move-ins</div>
          <span style={{ fontSize: '0.6rem', color: 'var(--text-quaternary)', fontWeight: 600 }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
};

const ResidentReport = () => {
  const [dateFilter, setDateFilter] = useState('2026'); // YYYY format or 'all'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Filter Data
  const filteredResidents = useMemo(() => {
    return RESIDENTS_DATA.filter(r => {
      // Date filter
      let matchDate = true;
      if (dateFilter !== 'all') {
        const dateString = r.status === 'occupying' ? r.moveInDate : r.moveOutDate;
        matchDate = dateString && dateString.startsWith(dateFilter);
      }
      
      // Search filter
      const matchSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchStatus = statusFilter === 'all' || r.status === statusFilter;

      return matchDate && matchSearch && matchStatus;
    });
  }, [dateFilter, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredResidents.length / ITEMS_PER_PAGE) || 1;
  const currentData = filteredResidents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Stats are calculated from all residents to give an overview, not just filtered
  const stats = {
    totalUnits: TOTAL_UNITS,
    occupying: RESIDENTS_DATA.filter(r => r.status === 'occupying').length,
    vacant: TOTAL_UNITS - RESIDENTS_DATA.filter(r => r.status === 'occupying').length,
  };

  const monthlyMoveIns = MONTHS.map(label => {
    return {
      label,
      count: filteredResidents.filter(r => {
        if (r.status !== 'occupying') return false;
        if (!r.moveInDate) return false;
        return MONTHS[new Date(r.moveInDate).getMonth()] === label;
      }).length
    };
  });

  const handleExportCSV = () => {
    const headers = ['ID', 'Name', 'Status', 'Move-In Date', 'Move-Out Date'];
    const rows = filteredResidents.map(r => [r.id, r.name, r.status, r.moveInDate || '-', r.moveOutDate || '-']);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Resident_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rr-page">
      <div className="rr-header">
        <div>
          <h1>Resident Report</h1>
          <p>Analyze resident occupancy and historical trends.</p>
        </div>
        <div className="rr-header-actions">
          <div className="rr-filter">
            <label>Filter by Year:</label>
            <select value={dateFilter} onChange={e => { setDateFilter(e.target.value); setCurrentPage(1); }} className="rr-input">
              <option value="all">All Time</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <button className="rr-export-btn" onClick={handleExportCSV}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="rr-stats-grid">
        <motion.div className="rr-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="rr-stat-icon" style={{ background: 'var(--bg-subtle)', color: 'var(--brand-primary)' }}>
            <Building size={20} />
          </div>
          <div>
            <span className="rr-stat-label">Total Units</span>
            <span className="rr-stat-value">{stats.totalUnits}</span>
          </div>
        </motion.div>
        
        <motion.div className="rr-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="rr-stat-icon" style={{ background: 'var(--bg-success-subtle)', color: 'var(--text-success)' }}>
            <Home size={20} />
          </div>
          <div>
            <span className="rr-stat-label">Occupied</span>
            <span className="rr-stat-value">{stats.occupying}</span>
          </div>
        </motion.div>
        
        <motion.div className="rr-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="rr-stat-icon" style={{ background: 'var(--bg-warning-subtle)', color: 'var(--text-warning)' }}>
            <DoorOpen size={20} />
          </div>
          <div>
            <span className="rr-stat-label">Vacant</span>
            <span className="rr-stat-value">{stats.vacant}</span>
          </div>
        </motion.div>

        <motion.div className="rr-stat-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="rr-stat-icon" style={{ background: 'var(--bg-brand-hover)', color: 'var(--text-inverse)' }}>
            <Users size={20} />
          </div>
          <div>
            <span className="rr-stat-label">Occupancy Rate</span>
            <span className="rr-stat-value">{Math.round((stats.occupying / stats.totalUnits) * 100)}%</span>
          </div>
        </motion.div>
      </div>

      {/* Bar Chart */}
      <div className="rr-chart-card">
        <div className="rr-chart-header">
          <div>
            <h3>Total Residents Timeline</h3>
            <p>Move-ins grouped by month ({dateFilter === 'all' ? 'All Time' : dateFilter})</p>
          </div>
        </div>
        <BarChart data={monthlyMoveIns} height={250} />
      </div>

      {/* Recent Residents Table */}
      <div className="rr-table-card">
        <div className="rr-table-header-row">
          <h3>Resident Directory</h3>
          <div className="rr-table-filters">
            <div className="rr-search-box">
              <Search size={16} color="var(--text-quaternary)" />
              <input 
                type="text" 
                placeholder="Search residents..." 
                value={searchTerm} 
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
              />
            </div>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="rr-input">
              <option value="all">All Statuses</option>
              <option value="occupying">Occupying</option>
              <option value="vacant">Vacant</option>
            </select>
          </div>
        </div>
        
        <div className="rr-table-container">
          <table className="rr-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Move-In Date</th>
                <th>Move-Out Date</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.name}</strong></td>
                  <td>
                    <span className={`rr-badge ${r.status === 'occupying' ? 'success' : 'warning'}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>{r.moveInDate || '-'}</td>
                  <td>{r.moveOutDate || '-'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-tertiary)' }}>
                    No residents found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="rr-pagination">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="rr-page-btn"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <span className="rr-page-info">Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="rr-page-btn"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .rr-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .rr-header { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; }
        .rr-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
        .rr-header p { color: var(--text-tertiary); margin: 0; }
        
        .rr-header-actions { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        
        .rr-filter { display: flex; align-items: center; gap: 0.75rem; background: var(--bg-surface); padding: 0.25rem 0.5rem; border-radius: 8px; border: 1px solid var(--border-default); }
        .rr-filter label { font-size: 0.875rem; color: var(--text-secondary); font-weight: 600; margin: 0; }
        .rr-input { padding: 0.4rem 0.75rem; border: 1px solid var(--border-default); border-radius: 6px; background: var(--bg-surface); color: var(--text-primary); font-weight: 500; font-size: 0.875rem; outline: none; }
        
        .rr-export-btn { display: flex; align-items: center; gap: 0.5rem; background: var(--text-primary); color: var(--bg-surface); border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: opacity 0.2s; }
        .rr-export-btn:hover { opacity: 0.9; }

        .rr-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .rr-stat-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 16px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .rr-stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .rr-stat-label { display: block; font-size: 0.75rem; color: var(--text-quaternary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
        .rr-stat-value { display: block; font-size: 1.875rem; font-weight: 800; color: var(--text-primary); line-height: 1; }
        
        .rr-chart-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .rr-chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.75rem; }
        .rr-chart-header h3 { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
        .rr-chart-header p { font-size: 0.875rem; color: var(--text-quaternary); margin: 0; }
        
        .chart-bar-group .chart-tooltip { position: absolute; top: -30px; background: var(--text-primary); color: var(--bg-surface); font-size: 0.7rem; padding: 4px 8px; border-radius: 4px; opacity: 0; transition: opacity 0.2s; pointer-events: none; white-space: nowrap; font-weight: 600; }
        .chart-bar-group:hover .chart-tooltip { opacity: 1; }
        .chart-bar { transition: filter 0.2s; }
        .chart-bar-group:hover .chart-bar { filter: brightness(1.2); }
        
        .rr-table-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .rr-table-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem; }
        .rr-table-header-row h3 { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin: 0; }
        .rr-table-filters { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        
        .rr-search-box { display: flex; align-items: center; gap: 0.5rem; background: var(--bg-subtle); border: 1px solid var(--border-default); padding: 0.5rem 0.75rem; border-radius: 8px; }
        .rr-search-box input { border: none; background: transparent; outline: none; font-size: 0.875rem; color: var(--text-primary); width: 200px; }
        .rr-search-box input::placeholder { color: var(--text-quaternary); }

        .rr-table-container { overflow-x: auto; }
        .rr-table { width: 100%; border-collapse: collapse; text-align: left; }
        .rr-table th { padding: 1rem; border-bottom: 1px solid var(--border-default); color: var(--text-tertiary); font-weight: 600; font-size: 0.875rem; white-space: nowrap; }
        .rr-table td { padding: 1rem; border-bottom: 1px solid var(--border-default); color: var(--text-primary); font-size: 0.9375rem; }
        .rr-table tr:last-child td { border-bottom: none; }
        
        .rr-badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; text-transform: capitalize; display: inline-block; }
        .rr-badge.success { background: var(--bg-success-subtle); color: var(--text-success); }
        .rr-badge.warning { background: var(--bg-warning-subtle); color: var(--text-warning); }
        
        .rr-pagination { display: flex; justify-content: flex-end; align-items: center; gap: 1rem; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-default); }
        .rr-page-btn { display: flex; align-items: center; gap: 0.25rem; background: var(--bg-surface); border: 1px solid var(--border-default); padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
        .rr-page-btn:hover:not(:disabled) { background: var(--bg-subtle); color: var(--text-primary); }
        .rr-page-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .rr-page-info { font-size: 0.875rem; color: var(--text-tertiary); font-weight: 500; }

        @media (max-width: 1024px) {
          .rr-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .rr-stats-grid { grid-template-columns: 1fr; }
          .rr-header { flex-direction: column; align-items: flex-start; }
          .rr-table-header-row { flex-direction: column; align-items: flex-start; }
          .rr-search-box { width: 100%; }
          .rr-search-box input { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default ResidentReport;
