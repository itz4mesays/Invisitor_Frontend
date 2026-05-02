import React, { useMemo, useState } from 'react';
import Pagination from '../../components/Pagination';
import { Calendar, Search, Filter, Clock } from 'lucide-react';

const ACTIVITY_LOGS = [
  { id: '1', date: '2026-04-17', time: '09:12 AM', user: 'David Fayemi', role: 'Host', action: 'Checked in visitor', detail: 'Guest: Elizabeth Ateli', type: 'Check-in' },
  { id: '2', date: '2026-04-17', time: '09:45 AM', user: 'Maria Ade', role: 'FrontDesk', action: 'Updated visitor profile', detail: 'Visitor: John Gambo', type: 'Update' },
  { id: '3', date: '2026-04-16', time: '08:32 AM', user: 'Sarah Host', role: 'Host', action: 'Created appointment', detail: 'Appointment with Margaret Ogunleye', type: 'Appointment' },
  { id: '4', date: '2026-04-16', time: '10:20 AM', user: 'David FrontDesk', role: 'FrontDesk', action: 'Resolved ticket', detail: 'Ticket #TK-004', type: 'Support' },
  { id: '5', date: '2026-04-15', time: '12:10 PM', user: 'Alice Manager', role: 'Manager', action: 'Approved payment', detail: 'Transaction #TX-1092', type: 'Payment' },
  { id: '6', date: '2026-04-15', time: '02:55 PM', user: 'Bob Visitor', role: 'Visitor', action: 'Submitted feedback', detail: 'Cleanliness feedback', type: 'Feedback' },
  { id: '7', date: '2026-04-14', time: '11:05 AM', user: 'John Resident', role: 'Resident', action: 'Added guest', detail: 'Guest: Jane Doe', type: 'Guest' },
  { id: '8', date: '2026-04-14', time: '01:35 PM', user: 'Sarah Host', role: 'Host', action: 'Sent invitation link', detail: 'Visitor: Victoria Salisu', type: 'Invite' },
  { id: '9', date: '2026-04-13', time: '09:25 AM', user: 'David FrontDesk', role: 'FrontDesk', action: 'Checked out visitor', detail: 'Guest: Michael Okujagu', type: 'Check-out' },
  { id: '10', date: '2026-04-13', time: '03:45 PM', user: 'Alice Manager', role: 'Manager', action: 'Generated report', detail: 'April finance report', type: 'Report' },
  { id: '11', date: '2026-04-12', time: '10:40 AM', user: 'Bob Visitor', role: 'Visitor', action: 'Requested support', detail: 'Issue with gate access', type: 'Support' },
  { id: '12', date: '2026-04-12', time: '11:55 AM', user: 'John Resident', role: 'Resident', action: 'Updated profile', detail: 'Changed phone number', type: 'Update' },
  { id: '13', date: '2026-04-11', time: '08:20 AM', user: 'David FrontDesk', role: 'FrontDesk', action: 'Created visitor pass', detail: 'Visitor: Margaret Ogunleye', type: 'Pass' },
  { id: '14', date: '2026-04-11', time: '04:05 PM', user: 'Sarah Host', role: 'Host', action: 'Cancelled appointment', detail: 'Appointment with Elizabeth Ateli', type: 'Appointment' },
  { id: '15', date: '2026-04-10', time: '09:00 AM', user: 'Alice Manager', role: 'Manager', action: 'Reviewed activity logs', detail: 'System overview', type: 'Review' },
];

const ActivityLog = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filterByDate = (activityDate) => {
    if (!startDate && !endDate) return true;
    const activity = new Date(activityDate);
    if (startDate && activity < new Date(startDate)) return false;
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      if (activity > end) return false;
    }
    return true;
  };

  const filteredActivities = useMemo(() => {
    return ACTIVITY_LOGS.filter((activity) => {
      const matchesDate = filterByDate(activity.date);
      const query = searchTerm.toLowerCase();
      const matchesSearch =
        activity.user.toLowerCase().includes(query) ||
        activity.role.toLowerCase().includes(query) ||
        activity.action.toLowerCase().includes(query) ||
        activity.detail.toLowerCase().includes(query) ||
        activity.type.toLowerCase().includes(query);
      return matchesDate && matchesSearch;
    });
  }, [startDate, endDate, searchTerm]);

  const currentTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredActivities.slice(startIndex, endIndex);
  }, [filteredActivities, currentPage, pageSize]);

  const totalLogs = ACTIVITY_LOGS.length;
  const uniqueUsers = new Set(ACTIVITY_LOGS.map((item) => item.user)).size;
  const totalTypes = new Set(ACTIVITY_LOGS.map((item) => item.type)).size;
  const filteredCount = filteredActivities.length;

  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div className="activity-log-page">
      <div className="page-header-simple">
        <div>
          <h1>Activity Log</h1>
          <p>Overview of user actions and a searchable, date-filtered activity audit trail.</p>
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <span>Total Logs</span>
          <strong>{totalLogs}</strong>
        </div>
        <div className="summary-card">
          <span>Activity Types</span>
          <strong>{totalTypes}</strong>
        </div>
      </div>

      <div className="filter-panel">
        <div className="filter-group">
          <label>From</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="filter-group">
          <label>To</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="filter-group search-group">
          <label>Search</label>
          <div className="search-input-wrapper">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search users, actions, or details"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <button className="btn-filter-clear" type="button" onClick={handleClearFilters}>
          <Filter size={16} /> Clear Filters
        </button>
      </div>

      <div className="activity-table-card">
        <div className="table-header-row">
          <div>
            <h2>Activity Timeline</h2>
            <p>{filteredCount} entries found</p>
          </div>
          <div className="table-header-tag">
            <Clock size={18} />
            <span>Audit Trail</span>
          </div>
        </div>

        <div className="table-responsive">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>User</th>
                <th>Role</th>
                <th>Action</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {currentTableData.length > 0 ? (
                currentTableData.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.date}</td>
                    <td>{activity.time}</td>
                    <td>{activity.user}</td>
                    <td>{activity.role}</td>
                    <td>{activity.action}</td>
                    <td>{activity.detail}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem 1rem', color: '#64748b' }}>
                    No activity found for the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalCount={filteredCount}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>

      <style jsx="true">{`
        .activity-log-page {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .page-header-simple h1 {
          font-size: 1.9rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.35rem;
        }

        .page-header-simple p {
          color: #475569;
          max-width: 680px;
          line-height: 1.6;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
        }

        .summary-card {
          background: white;
          padding: 1.25rem 1.5rem;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-height: 108px;
        }

        .summary-card span {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #64748b;
        }

        .summary-card strong {
          font-size: 1.75rem;
          color: #0f172a;
        }

        .filter-panel {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
          align-items: end;
          background: white;
          padding: 1.5rem;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-group label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #475569;
        }

        .filter-group input {
          padding: 0.9rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #f8fafc;
          color: #0f172a;
          outline: none;
        }

        .search-group {
          grid-column: span 2;
        }

        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 1rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }

        .search-input-wrapper input {
          border: none;
          background: transparent;
          width: 100%;
          outline: none;
          color: #0f172a;
        }

        .btn-filter-clear {
          background: white;
          border: 1px solid #e2e8f0;
          color: #475569;
          padding: 0.9rem 1rem;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: center;
          font-weight: 700;
        }

        .activity-table-card {
          background: white;
          padding: 1.5rem;
          border-radius: 18px;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .table-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .table-header-row h2 {
          margin: 0;
          font-size: 1.25rem;
          color: #0f172a;
        }

        .table-header-row p {
          margin: 0.35rem 0 0;
          color: #64748b;
        }

        .table-header-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #eef2ff;
          color: #3730a3;
          padding: 0.65rem 1rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: 0.875rem;
        }

        .table-responsive {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .activity-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .activity-table th {
          text-align: left;
          padding: 0.75rem 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          border-bottom: 1px solid #f1f5f9;
        }

        .activity-table td {
          padding: 1rem;
          font-size: 0.875rem;
          color: #1e293b;
          border-bottom: 1px solid #f8fafc;
        }

        .activity-table tbody tr:hover td {
          background: #f8fafc;
        }

        @media (max-width: 1024px) {
          .summary-grid { grid-template-columns: repeat(2, 1fr); }
          .filter-panel { grid-template-columns: repeat(2, 1fr); }
          .search-group { grid-column: span 2; }
        }

        @media (max-width: 768px) {
          .summary-grid { grid-template-columns: 1fr; }
          .filter-panel { grid-template-columns: 1fr; }
          .search-group { grid-column: span 1; }
          .table-header-row { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .page-header-simple h1 { font-size: 1.5rem; }
          .activity-log-page { padding: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default ActivityLog;
