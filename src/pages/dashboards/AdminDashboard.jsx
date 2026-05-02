import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Visitors', value: '1,250', change: '+5%', color: '#22c55e', icon: <Users size={20} /> },
    { label: 'Front Desk Officer', value: '50', change: '+5%', color: '#00a3ff', icon: <UserCheck size={20} /> },
    { label: 'Appointments', value: '50', change: '+5%', color: '#f59e0b', icon: <Calendar size={20} /> },
  ];

  const quickActions = [
    { title: 'Create an Appointment', desc: 'Schedule an appointment for a visitor', icon: <Calendar size={20} /> },
    { title: 'Add a Visitor', desc: 'Create a Visitor account', icon: <Users size={20} /> },
    { title: 'Add a Front Desk Officer', desc: 'Create a Front Desk Officer Account', icon: <ShieldCheck size={20} /> },
  ];

  const upcomingAppointments = [
    { name: 'Dr. Alison Ogaga', role: 'General Practitioner', time: 'Today 12:00 PM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alison' },
    { name: 'Dr. Jennifer Johnson', role: 'Primary Care Physician', time: '11/15/2024 12:00 PM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer' },
    { name: 'Dr. Anish Patel', role: 'General Practitioner', time: '11/16/2024 12:00 PM', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anish' },
  ];

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Welcome Admin,</h1>
        <div className="date-display">
          <Calendar size={16} />
          <span>Today's Date: <strong>1st July, 2023</strong></span>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* Main Section */}
        <div className="main-stats">
          <div className="stats-row">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="stat-card"
              >
                <div className="stat-info">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-change" style={{ color: stat.color }}>
                    <TrendingUp size={12} style={{ marginRight: '4px' }} /> {stat.change} This Month
                  </span>
                </div>
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  {stat.icon}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="subscription-card">
            <h3>Your Subscription</h3>
            <div className="sub-content">
              <div className="sub-main">
                <div className="sub-icon">
                  <ShieldCheck size={20} />
                </div>
                <div className="sub-info">
                  <h4>Current Subscription</h4>
                  <p>Annual</p>
                </div>
              </div>
              <div className="sub-details">
                <div className="detail-item">
                  <span className="detail-label">Max Number Of Users</span>
                  <span className="detail-value">1500</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Max Number Of Co-Host</span>
                  <span className="detail-value">25</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Start Date</span>
                  <span className="detail-value">24-07-2024</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Expiry Day</span>
                  <span className="detail-value">24-07-2025 (365)</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className="status-badge">Active</span>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-actions-section">
            <div className="section-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="actions-list">
              {quickActions.map((action, idx) => (
                <div key={idx} className="action-item">
                  <div className="action-icon">
                    {action.icon}
                  </div>
                  <div className="action-info">
                    <h4>{action.title}</h4>
                    <p>{action.desc}</p>
                  </div>
                  <ArrowRight size={18} className="action-arrow" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="secondary-content">
          <div className="appointment-focus-card">
            <h3>Next Appointment</h3>
            <div className="focus-date">
              <h4>Friday, 6 July</h4>
              <div className="focus-time">
                <Calendar size={14} style={{ marginRight: '6px' }} /> 11:30 - 12:00 (30 min)
              </div>
              <div className="focus-attendee">
                <Users size={14} style={{ marginRight: '6px' }} /> Mr. Collis Makanju
              </div>
            </div>
            <div className="invite-card">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alison" alt="User" />
              <div className="invite-info">
                <h4>Dr. Alison Ogaga</h4>
                <p>General Visitor</p>
              </div>
            </div>
            <div className="focus-actions">
              <button className="btn-reschedule">Reschedule</button>
              <button className="btn-confirm">Confirm appointment</button>
            </div>
          </div>

          <div className="upcoming-appointments-card">
            <div className="section-header">
              <h3>Upcoming Appointments</h3>
              <button className="see-all">See all <ArrowRight size={14} style={{ marginLeft: '4px' }} /></button>
            </div>
            <div className="appointments-list">
              {upcomingAppointments.map((appt, idx) => (
                <div key={idx} className="appointment-item">
                  <img src={appt.avatar} alt={appt.name} />
                  <div className="appt-info">
                    <h4>{appt.name}</h4>
                    <p>{appt.role}</p>
                    <span className="appt-time">{appt.time}</span>
                  </div>
                  <button className="btn-small-reschedule">Reschedule</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .admin-dashboard {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dashboard-header h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0d2331;
        }

        .date-display {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: white;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          font-size: 0.875rem;
          color: #64748b;
        }

        .date-display strong {
          color: #1e293b;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .main-stats {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0d2331;
        }

        .stat-change {
          font-size: 0.75rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .subscription-card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }

        .subscription-card h3 {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #0d2331;
        }

        .sub-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 2rem;
        }

        .sub-main {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 12px;
        }

        .sub-icon {
          width: 40px;
          height: 40px;
          background: #0d2331;
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sub-info h4 {
          font-size: 0.875rem;
          font-weight: 700;
          color: #0d2331;
        }

        .sub-info p {
          font-size: 0.75rem;
          color: #64748b;
        }

        .sub-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-label {
          font-size: 0.625rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .detail-value {
          font-size: 0.875rem;
          font-weight: 700;
          color: #0d2331;
        }

        .status-badge {
          background: #dcfce7;
          color: #15803d;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          width: fit-content;
        }

        .quick-actions-section {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }

        .actions-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }

        .action-item {
          display: flex;
          align-items: center;
          padding: 1.25rem;
          background: #f8fafc;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          gap: 1rem;
        }

        .action-item:hover {
          background: #f1f5f9;
          transform: translateX(4px);
        }

        .action-icon {
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0d2331;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .action-info {
          flex: 1;
        }

        .action-info h4 {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #0d2331;
        }

        .action-info p {
          font-size: 0.8125rem;
          color: #64748b;
        }

        .action-arrow {
          color: #cbd5e1;
        }

        .secondary-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .appointment-focus-card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }

        .appointment-focus-card h3 {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #0d2331;
        }

        .focus-date h4 {
          font-size: 1rem;
          font-weight: 700;
          color: #0d2331;
          margin-bottom: 0.75rem;
        }

        .focus-time, .focus-attendee {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .invite-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.5rem 0;
          padding: 1rem;
          background: #eff6ff;
          border-radius: 12px;
        }

        .invite-card img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .invite-info h4 {
          font-size: 0.875rem;
          font-weight: 700;
          color: #1e40af;
        }

        .invite-info p {
          font-size: 0.75rem;
          color: #3b82f6;
        }

        .focus-actions {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 0.75rem;
        }

        .btn-reschedule {
          padding: 0.625rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: white;
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          cursor: pointer;
        }

        .btn-confirm {
          padding: 0.625rem;
          border-radius: 8px;
          border: none;
          background: #0d2331;
          font-size: 0.75rem;
          font-weight: 700;
          color: white;
          cursor: pointer;
        }

        .upcoming-appointments-card {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .section-header h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #0d2331;
        }

        .see-all {
          background: none;
          border: none;
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
        }

        .appointments-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .appointment-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .appointment-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .appointment-item img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }

        .appt-info {
          flex: 1;
        }

        .appt-info h4 {
          font-size: 0.875rem;
          font-weight: 700;
          color: #1e293b;
        }

        .appt-info p {
          font-size: 0.75rem;
          color: #64748b;
        }

        .appt-time {
          font-size: 0.6875rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .btn-small-reschedule {
          padding: 0.375rem 0.75rem;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          background: white;
          font-size: 0.6875rem;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
        }

        @media (max-width: 1024px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
          .sub-content { grid-template-columns: 1fr; }
          .sub-details { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .admin-dashboard { padding: 1rem; gap: 1.5rem; }
          .dashboard-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .dashboard-header h1 { font-size: 1.4rem; }
          .stats-row { grid-template-columns: 1fr; }
          .sub-details { grid-template-columns: 1fr; }
          .focus-actions { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
