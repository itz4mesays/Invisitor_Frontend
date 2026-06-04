import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, Clock, Info, ShieldAlert, Trash2 } from 'lucide-react';
import Pagination from '../../components/Pagination';

const NOTIFICATIONS_DATA = [
  { id: 1, text: "Your visitor James arrived at the main gate.", time: "2 mins ago", type: "info", unread: true },
  { id: 2, text: "Appointment APT-001 has been confirmed.", time: "1 hour ago", type: "success", unread: true },
  { id: 3, text: "System maintenance scheduled for tonight from 2 AM to 4 AM.", time: "3 hours ago", type: "info", unread: false },
  { id: 4, text: "New message from Support regarding your recent ticket.", time: "5 hours ago", type: "info", unread: false },
  { id: 5, text: "Security alert: Gate B camera is temporarily offline.", time: "1 day ago", type: "alert", unread: false },
  { id: 6, text: "Your profile information was successfully updated.", time: "2 days ago", type: "success", unread: false },
  { id: 7, text: "Monthly security report is ready for download.", time: "2 days ago", type: "info", unread: false },
  { id: 8, text: "Invoice #INV-2041 has been paid successfully.", time: "3 days ago", type: "success", unread: false },
  { id: 9, text: "Welcome to InVisitor! Explore your dashboard to get started.", time: "1 week ago", type: "info", unread: false },
  { id: 10, text: "Please verify your email address to secure your account.", time: "1 week ago", type: "alert", unread: false }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
    setCurrentPage(1);
  };

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return n.unread;
    return true;
  });

  // Reset page when filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const paginatedNotifications = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle size={20} color="#16a34a" />;
      case 'alert': return <ShieldAlert size={20} color="#dc2626" />;
      default: return <Info size={20} color="#3b82f6" />;
    }
  };

  return (
    <div className="notif-page-container">
      <div className="notif-header-section">
        <div>
          <h1>Notifications</h1>
          <p>View and manage all your recent alerts and updates.</p>
        </div>
        <div className="notif-header-actions">
          <button className="btn-mark-read" onClick={handleMarkAllRead}>
            <CheckCircle size={16} /> Mark all read
          </button>
          <button className="btn-clear" onClick={handleClearAll}>
            <Trash2 size={16} /> Clear all
          </button>
        </div>
      </div>

      <div className="notif-filter-tabs">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => handleFilterChange('all')}>All Notifications</button>
        <button className={filter === 'unread' ? 'active' : ''} onClick={() => handleFilterChange('unread')}>Unread</button>
      </div>

      <div className="notif-list-container">
        {paginatedNotifications.length === 0 ? (
          <div className="notif-empty-state">
            <Bell size={48} className="empty-icon" />
            <h3>No notifications</h3>
            <p>You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          paginatedNotifications.map((notif, index) => (
            <motion.div 
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`notif-card ${notif.unread ? 'unread' : ''}`}
            >
              <div className="notif-icon-wrap">
                {getIcon(notif.type)}
              </div>
              <div className="notif-content">
                <p className="notif-text">{notif.text}</p>
                <div className="notif-meta">
                  <Clock size={14} /> <span>{notif.time}</span>
                </div>
              </div>
              {notif.unread && <div className="unread-dot"></div>}
            </motion.div>
          ))
        )}
      </div>

      {filtered.length > 0 && (
        <Pagination
          totalCount={filtered.length}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setCurrentPage(1);
          }}
        />
      )}

      <style jsx>{`
        .notif-page-container {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-bottom: 3rem;
        }

        .notif-header-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .notif-header-section h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.25rem 0;
        }

        .notif-header-section p {
          color: var(--text-tertiary);
          margin: 0;
        }

        .notif-header-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-mark-read, .btn-clear {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-mark-read {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          color: var(--text-primary);
        }

        .btn-mark-read:hover {
          background: var(--bg-subtle);
        }

        .btn-clear {
          background: var(--bg-danger-subtle);
          border: 1px solid #fecaca;
          color: #dc2626;
        }

        .btn-clear:hover {
          background: #fee2e2;
        }

        .notif-filter-tabs {
          display: flex;
          gap: 1rem;
          border-bottom: 1px solid var(--border-default);
          padding-bottom: 0px;
        }

        .notif-filter-tabs button {
          background: none;
          border: none;
          padding: 0.75rem 1rem;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-tertiary);
          cursor: pointer;
          position: relative;
        }

        .notif-filter-tabs button.active {
          color: var(--bg-brand);
        }

        .notif-filter-tabs button.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--bg-brand);
          border-radius: 2px 2px 0 0;
        }

        .notif-list-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .notif-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.2s;
        }

        .notif-card.unread {
          background: var(--bg-subtle);
          border-color: var(--border-heavy);
        }

        .notif-card:hover {
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          transform: translateY(-2px);
        }

        .notif-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--bg-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notif-content {
          flex: 1;
        }

        .notif-text {
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
        }

        .notif-meta {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-quaternary);
        }

        .unread-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #3b82f6;
          flex-shrink: 0;
        }

        .notif-empty-state {
          padding: 4rem 2rem;
          text-align: center;
          background: var(--bg-surface);
          border: 1px dashed var(--border-heavy);
          border-radius: 16px;
        }

        .empty-icon {
          color: var(--border-heavy);
          margin-bottom: 1rem;
        }

        .notif-empty-state h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0 0 0.5rem 0;
        }

        .notif-empty-state p {
          color: var(--text-tertiary);
          margin: 0;
        }

        @media (max-width: 600px) {
          .notif-header-section {
            flex-direction: column;
          }
          .notif-header-actions {
            width: 100%;
          }
          .btn-mark-read, .btn-clear {
            flex: 1;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Notifications;
