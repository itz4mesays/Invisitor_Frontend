import React, { useState, useMemo } from 'react';
import { ShieldAlert, CheckCircle, Video, Lock, Download, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const SECURITY_LOGS = [
  { id: 1, time: '2026-06-11T08:45:00', location: 'Main Gate', eventType: 'Invalid QR Code Scan', status: 'investigating' },
  { id: 2, time: '2026-06-10T23:20:00', location: 'Block B Entrance', eventType: 'Door propped open', status: 'resolved' },
  { id: 3, time: '2026-06-10T18:15:00', location: 'Visitor Parking', eventType: 'Unauthorized vehicle', status: 'resolved' },
  { id: 4, time: '2026-06-09T14:30:00', location: 'Pool Area', eventType: 'Noise complaint', status: 'resolved' },
  { id: 5, time: '2026-06-08T09:10:00', location: 'Main Gate', eventType: 'Tailgating attempt', status: 'resolved' },
  { id: 6, time: '2026-06-08T02:05:00', location: 'Perimeter Fence South', eventType: 'Motion detected', status: 'investigating' },
  { id: 7, time: '2026-06-07T11:45:00', location: 'Block A Elevator', eventType: 'Emergency button pressed', status: 'resolved' },
  { id: 8, time: '2026-06-06T16:20:00', location: 'Service Gate', eventType: 'Delivery without notice', status: 'resolved' },
  { id: 9, time: '2026-06-05T03:30:00', location: 'Block C Lobby', eventType: 'Suspicious individual', status: 'investigating' },
  { id: 10, time: '2026-06-04T10:00:00', location: 'Main Gate', eventType: 'System offline', status: 'resolved' },
];

const SecurityReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const filteredLogs = useMemo(() => {
    return SECURITY_LOGS.filter(log => {
      const matchSearch = log.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.eventType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || log.status === statusFilter;
      const matchStart = startDate ? new Date(log.time) >= new Date(startDate) : true;
      const matchEnd = endDate ? new Date(log.time) <= new Date(endDate) : true;
      return matchSearch && matchStatus && matchStart && matchEnd;
    });
  }, [searchTerm, statusFilter, startDate, endDate]);

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE) || 1;
  const currentData = filteredLogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const stats = {
    active: SECURITY_LOGS.filter(l => l.status === 'investigating').length,
    resolved: SECURITY_LOGS.filter(l => l.status === 'resolved').length,
    denied: SECURITY_LOGS.filter(l => l.eventType.includes('Invalid') || l.eventType.includes('Unauthorized')).length,
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Time', 'Location', 'Event Type', 'Status'];
    const rows = filteredLogs.map(l => [l.id, l.time, l.location, l.eventType, l.status]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Security_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="sr-page">
      <div className="sr-header">
        <div>
          <h1>Security Report</h1>
          <p>Overview of estate security logs and incidents.</p>
        </div>
        <div className="sr-header-actions">
          <div className="sr-date-filters">
            <input type="date" value={startDate} onChange={e => { setStartDate(e.target.value); setCurrentPage(1); }} className="sr-input" />
            <span>to</span>
            <input type="date" value={endDate} onChange={e => { setEndDate(e.target.value); setCurrentPage(1); }} className="sr-input" />
          </div>
          <button className="sr-export-btn" onClick={handleExportCSV}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="sr-stats-grid">
        <div className="sr-stat-card">
          <div className="sr-stat-icon" style={{ background: 'var(--bg-danger-subtle)', color: 'var(--text-danger)' }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <span className="sr-stat-label">Active Incidents</span>
            <span className="sr-stat-value">{stats.active}</span>
          </div>
        </div>
        
        <div className="sr-stat-card">
          <div className="sr-stat-icon" style={{ background: 'var(--bg-success-subtle)', color: 'var(--text-success)' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <span className="sr-stat-label">Resolved (Total)</span>
            <span className="sr-stat-value">{stats.resolved}</span>
          </div>
        </div>

        <div className="sr-stat-card">
          <div className="sr-stat-icon" style={{ background: 'var(--bg-subtle)', color: 'var(--brand-primary)' }}>
            <Video size={20} />
          </div>
          <div>
            <span className="sr-stat-label">CCTV Status</span>
            <span className="sr-stat-value" style={{ fontSize: '1.25rem', color: 'var(--text-success)' }}>All Online</span>
          </div>
        </div>
        
        <div className="sr-stat-card">
          <div className="sr-stat-icon" style={{ background: 'var(--bg-subtle)', color: 'var(--text-secondary)' }}>
            <Lock size={20} />
          </div>
          <div>
            <span className="sr-stat-label">Access Denials</span>
            <span className="sr-stat-value">{stats.denied}</span>
          </div>
        </div>
      </div>

      <div className="sr-logs-card">
        <div className="sr-table-header-row">
          <h3>Security Logs</h3>
          <div className="sr-table-filters">
            <div className="sr-search-box">
              <Search size={16} color="var(--text-quaternary)" />
              <input 
                type="text" 
                placeholder="Search event or location..." 
                value={searchTerm} 
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} 
              />
            </div>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="sr-input">
              <option value="all">All Statuses</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="sr-table-container">
          <table className="sr-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Location</th>
                <th>Event Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? currentData.map((log) => (
                <tr key={log.id}>
                  <td>{formatDate(log.time)}</td>
                  <td><strong>{log.location}</strong></td>
                  <td>{log.eventType}</td>
                  <td>
                    <span className={`sr-badge ${log.status === 'resolved' ? 'success' : 'danger'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-tertiary)' }}>
                    No logs found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="sr-pagination">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="sr-page-btn"
            >
              <ChevronLeft size={16} /> Prev
            </button>
            <span className="sr-page-info">Page {currentPage} of {totalPages}</span>
            <button 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="sr-page-btn"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .sr-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .sr-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
        .sr-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
        .sr-header p { color: var(--text-tertiary); margin: 0; }
        
        .sr-header-actions { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .sr-date-filters { display: flex; align-items: center; gap: 0.5rem; background: var(--bg-surface); border: 1px solid var(--border-default); padding: 0.25rem 0.5rem; border-radius: 8px; }
        .sr-date-filters span { font-size: 0.8rem; color: var(--text-tertiary); font-weight: 500; }
        
        .sr-input { border: none; background: transparent; font-size: 0.875rem; color: var(--text-primary); outline: none; padding: 0.25rem; cursor: pointer; }
        select.sr-input { border: 1px solid var(--border-default); border-radius: 6px; padding: 0.5rem; background: var(--bg-surface); }
        
        .sr-export-btn { display: flex; align-items: center; gap: 0.5rem; background: var(--text-primary); color: var(--bg-surface); border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: opacity 0.2s; }
        .sr-export-btn:hover { opacity: 0.9; }

        .sr-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .sr-stat-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 16px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .sr-stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .sr-stat-label { display: block; font-size: 0.75rem; color: var(--text-quaternary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
        .sr-stat-value { display: block; font-size: 1.875rem; font-weight: 800; color: var(--text-primary); line-height: 1; }
        
        .sr-logs-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02); }
        .sr-table-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
        .sr-table-header-row h3 { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin: 0; }
        .sr-table-filters { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }
        
        .sr-search-box { display: flex; align-items: center; gap: 0.5rem; background: var(--bg-subtle); border: 1px solid var(--border-default); padding: 0.5rem 0.75rem; border-radius: 8px; }
        .sr-search-box input { border: none; background: transparent; outline: none; font-size: 0.875rem; color: var(--text-primary); width: 220px; }
        .sr-search-box input::placeholder { color: var(--text-quaternary); }

        .sr-table-container { overflow-x: auto; }
        .sr-table { width: 100%; border-collapse: collapse; text-align: left; }
        .sr-table th { padding: 1rem; border-bottom: 1px solid var(--border-default); color: var(--text-tertiary); font-weight: 600; font-size: 0.875rem; white-space: nowrap; }
        .sr-table td { padding: 1rem; border-bottom: 1px solid var(--border-default); color: var(--text-primary); font-size: 0.9375rem; }
        .sr-table tr:last-child td { border-bottom: none; }
        
        .sr-badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; text-transform: capitalize; display: inline-block; }
        .sr-badge.success { background: var(--bg-success-subtle); color: var(--text-success); }
        .sr-badge.danger { background: var(--bg-danger-subtle); color: var(--text-danger); }
        
        .sr-pagination { display: flex; justify-content: flex-end; align-items: center; gap: 1rem; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-default); }
        .sr-page-btn { display: flex; align-items: center; gap: 0.25rem; background: var(--bg-surface); border: 1px solid var(--border-default); padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.875rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
        .sr-page-btn:hover:not(:disabled) { background: var(--bg-subtle); color: var(--text-primary); }
        .sr-page-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .sr-page-info { font-size: 0.875rem; color: var(--text-tertiary); font-weight: 500; }

        @media (max-width: 1024px) {
          .sr-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .sr-stats-grid { grid-template-columns: 1fr; }
          .sr-header { flex-direction: column; align-items: flex-start; }
          .sr-table-header-row { flex-direction: column; align-items: flex-start; }
          .sr-search-box { width: 100%; }
          .sr-search-box input { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SecurityReport;
