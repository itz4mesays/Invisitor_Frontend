import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Users, 
  Calendar, 
  ShieldCheck, 
  BarChart2, 
  Settings, 
  LogOut, 
  Search, 
  Bell,
  Menu,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Cleanup on unmount to prevent leaks
    return () => document.body.classList.remove('dark-mode');
  }, [isDarkMode]);
  
  // Get active role from URL
  const role = location.pathname.split('/')[1];
  
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: `/${role}/dashboard` },
    { icon: <Users size={20} />, label: 'Visitors', path: `/${role}/visitors` },
    { icon: <Calendar size={20} />, label: 'Appointments', path: `/${role}/appointments` },
    { icon: <ShieldCheck size={20} />, label: 'Front-Desk Officers', path: `/${role}/front-desk` },
    { icon: <BarChart2 size={20} />, label: 'Reports', path: `/${role}/reports` },
  ];

  const handleLogout = () => {
    // Basic logout simulation
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="25" r="18" fill="var(--accent-blue)" />
              <path d="M20 55C20 49.5 24.5 45 30 45H70C75.5 45 80 49.5 80 55V60H20V55Z" fill="var(--accent-blue)" />
              <path d="M20 65H80V75C80 80.5 75.5 85 70 85H30C24.5 85 20 80.5 20 75V65Z" fill="var(--accent-blue)" />
            </svg>
            <span className="logo-text">InVisitor</span>
          </div>
          <button className="sidebar-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link 
                  to={item.path} 
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <Link to={`/${role}/settings`} className="nav-link">
            <span className="nav-icon"><Settings size={20} /></span>
            <span className="nav-label">Settings</span>
          </Link>
          
          <div className="user-profile-mini">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} 
              alt="User" 
              className="user-avatar"
            />
            <div className="user-info">
              <span className="user-name">David Fayemi</span>
              <span className="user-email">david@rayna.ui</span>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search here..." />
          </div>
          <div className="header-actions">
            <span className="header-user-name" style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1e293b' }}>David Fayemi</span>
            <button className="theme-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="notification-btn">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <div className="user-profile-circle">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} alt="Profile" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="content-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <style jsx="true">{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background-color: #f8fafc;
          color: #1a202c;
        }

        /* Sidebar */
        .sidebar {
          width: 280px;
          background: white;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: sticky;
          top: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 50;
        }

        .sidebar.closed {
          width: 80px;
        }

        .sidebar-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .sidebar-toggle-btn {
          position: absolute;
          right: -14px;
          top: 32px;
          width: 28px;
          height: 28px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          z-index: 100;
          transition: all 0.2s;
        }

        .sidebar-toggle-btn:hover {
          color: #0d2331;
          background: #f8fafc;
          transform: scale(1.1);
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          overflow: hidden;
        }

        .logo-text {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0d2331;
          white-space: nowrap;
        }

        .sidebar.closed .logo-text {
          display: none;
        }

        .sidebar-nav {
          flex: 1;
          padding: 1rem;
        }

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .nav-item {
          margin-bottom: 0.5rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          color: #64748b;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.2s;
          gap: 1rem;
        }

        .nav-link:hover {
          background-color: #f1f5f9;
          color: #0d2331;
        }

        .nav-link.active {
          background-color: #f1f5f9;
          color: #0d2331;
          font-weight: 600;
        }

        .nav-icon {
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
        }

        .sidebar.closed .nav-label {
          display: none;
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid #e2e8f0;
        }

        .user-profile-mini {
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: #f8fafc;
          border-radius: 12px;
          overflow: hidden;
        }

        .sidebar.closed .user-profile-mini {
          padding: 0.5rem;
          justify-content: center;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e2e8f0;
          object-fit: cover;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        .sidebar.closed .user-info {
          display: none;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 700;
          color: #1e293b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-email {
          font-size: 0.75rem;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .logout-btn {
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          font-size: 1.125rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .logout-btn:hover {
          background-color: #fee2e2;
          color: #ef4444;
        }

        .sidebar.closed .logout-btn {
          display: none;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          max-height: 100vh;
          overflow-y: auto;
        }

        .top-header {
          height: 72px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .search-bar {
          background: #f1f5f9;
          display: flex;
          align-items: center;
          padding: 0.625rem 1rem;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          gap: 0.75rem;
        }

        .search-icon {
          color: #94a3b8;
        }

        .search-bar input {
          background: none;
          border: none;
          outline: none;
          width: 100%;
          font-size: 0.875rem;
          color: #1e293b;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .notification-btn {
          background: none;
          border: none;
          font-size: 1.25rem;
          color: #64748b;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
        }

        .notification-dot {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border: 2px solid white;
          border-radius: 50%;
        }

        .user-profile-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #e2e8f0;
          overflow: hidden;
          cursor: pointer;
        }

        .user-profile-circle img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .content-area {
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            left: -280px;
          }
          .sidebar.open {
            left: 0;
          }
          .main-content {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
