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
  Moon,
  AlertTriangle,
  FileText
} from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const notifications = [
    { id: 1, text: "Your visitor James arrived.", time: "2m ago", unread: true },
    { id: 2, text: "Appointment APT-001 confirmed.", time: "1h ago", unread: true },
    { id: 3, text: "System maintenance scheduled for tonight.", time: "3h ago", unread: false },
    { id: 4, text: "New message from Support.", time: "5h ago", unread: false },
    { id: 5, text: "Security alert: Gate B offline.", time: "1d ago", unread: false },
    { id: 6, text: "Your profile was updated.", time: "2d ago", unread: false },
    { id: 7, text: "Monthly report is ready.", time: "2d ago", unread: false },
    { id: 8, text: "Invoice #INV-2041 paid.", time: "3d ago", unread: false },
    { id: 9, text: "Welcome to InVisitor!", time: "1w ago", unread: false },
    { id: 10, text: "Please verify your email.", time: "1w ago", unread: false }
  ];

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Cleanup on unmount to prevent leaks
    return () => document.body.classList.remove('dark-mode');
  }, [isDarkMode]);
  
  const role = location.pathname.split('/')[1];
  const getMenuItems = (currentRole) => {
    const baseMenus = [
      { icon: <Home size={20} />, label: 'Dashboard', path: `/${currentRole}/dashboard` },
      { icon: <Calendar size={20} />, label: 'Calendar', path: `/${currentRole}/calendar` }
    ];
    const supportArea = { 
      icon: <ShieldCheck size={20} />, 
      label: 'Support Area', 
      isDropdown: true,
      children: [
        { label: 'Support Dashboard', path: `/${currentRole}/support/dashboard` },
        { label: 'Manage Tickets', path: `/${currentRole}/support/tickets` }
      ]
    };

    switch (currentRole) {
      case 'admin':
        return [
          ...baseMenus,
          { icon: <BarChart2 size={20} />, label: 'Activity Log', path: `/${currentRole}/activity-log` },
        ];
      case 'manager':
        return [
          ...baseMenus,
          { icon: <Users size={20} />, label: 'Residents', path: `/${currentRole}/residents` },
          { icon: <ShieldCheck size={20} />, label: 'Security', path: `/${currentRole}/security` },
          { icon: <Calendar size={20} />, label: 'Appointments', path: `/${currentRole}/appointments` },
          { icon: <FileText size={20} />, label: 'Invoices', path: `/${currentRole}/invoices` },
          { icon: <BarChart2 size={20} />, label: 'Reports', path: `/${currentRole}/reports` },
          { icon: <BarChart2 size={20} />, label: 'Transactions', path: `/${currentRole}/transactions` },
          supportArea,
          { icon: <BarChart2 size={20} />, label: 'Activity Log', path: `/${currentRole}/activity-log` },
        ];
      case 'resident':
        return [
          ...baseMenus,
          { icon: <Calendar size={20} />, label: 'Appointments', path: `/${currentRole}/appointments` },
          { icon: <BarChart2 size={20} />, label: 'Reports', path: `/${currentRole}/reports` },
          supportArea,
          { icon: <BarChart2 size={20} />, label: 'Activity Log', path: `/${currentRole}/activity-log` },
        ];
      case 'host':
        return [
          ...baseMenus,
          { icon: <Users size={20} />, label: 'Visitors', path: `/${currentRole}/visitors` },
          { icon: <Calendar size={20} />, label: 'Appointments', path: `/${currentRole}/appointments` },
          { icon: <ShieldCheck size={20} />, label: 'Front-Desk Officers', path: `/${currentRole}/front-desk` },
          { icon: <FileText size={20} />, label: 'Invoices', path: `/${currentRole}/invoices` },
          { icon: <BarChart2 size={20} />, label: 'Transactions', path: `/${currentRole}/transactions` },
          supportArea,
          { icon: <BarChart2 size={20} />, label: 'Activity Log', path: `/${currentRole}/activity-log` },
        ];
      case 'visitor':
        return [
          ...baseMenus,
          { icon: <Calendar size={20} />, label: 'Appointments', path: `/${currentRole}/appointments` },
          { icon: <BarChart2 size={20} />, label: 'Activity Log', path: `/${currentRole}/activity-log` },
        ];
      case 'frontdesk':
        return [
          ...baseMenus,
          { icon: <BarChart2 size={20} />, label: 'Transactions', path: `/${currentRole}/transactions` },
          supportArea,
          { icon: <BarChart2 size={20} />, label: 'Activity Log', path: `/${currentRole}/activity-log` },
        ];
      default:
        return baseMenus;
    }
  };

  const menuItems = getMenuItems(role);

  const toggleDropdown = (label) => {
    setOpenDropdowns(prev => ({ ...prev, [label]: !prev[label] }));
  };

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
              <li key={item.label} className="nav-item">
                {item.isDropdown ? (
                  <>
                    <button 
                      className={`nav-link w-full ${location.pathname.includes('/support/') ? 'active' : ''}`}
                      onClick={() => toggleDropdown(item.label)}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-label" style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                      <span className="nav-icon" style={{ minWidth: 'auto', display: isSidebarOpen ? 'flex' : 'none' }}>
                        <ChevronRight size={16} style={{ transform: openDropdowns[item.label] ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                      </span>
                    </button>
                    <AnimatePresence>
                      {openDropdowns[item.label] && isSidebarOpen && (
                        <motion.ul 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          style={{ listStyle: 'none', padding: '0 0 0 3.25rem', margin: '0.25rem 0', overflow: 'hidden' }}
                        >
                          {item.children.map(child => (
                            <li key={child.path} style={{ margin: '0.25rem 0' }}>
                              <Link 
                                to={child.path} 
                                className={`nav-link-sub ${location.pathname === child.path ? 'active' : ''}`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          {role !== 'visitor' && (
            <Link to={`/${role}/settings`} className="nav-link">
              <span className="nav-icon"><Settings size={20} /></span>
              <span className="nav-label">Settings</span>
            </Link>
          )}
          
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

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
            <button className="mobile-dashboard-menu-btn" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} color="#64748b" />
            </button>
            <div style={{ flex: 1 }}></div>
          </div>
          <div className="header-actions">
            {role === 'resident' && (
              <button className="btn-emergency" onClick={() => alert('EMERGENCY TRIGGERED!')}>
                <AlertTriangle size={16} /> SOS
              </button>
            )}
            <span className="header-user-name" style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1e293b' }}>David Fayemi</span>
            <button className="theme-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div 
              className="notification-container" 
              style={{ position: 'relative' }}
              onMouseEnter={() => setIsNotifOpen(true)}
              onMouseLeave={() => setIsNotifOpen(false)}
            >
              <button className="notification-btn">
                <Bell size={20} />
                <span className="notification-dot"></span>
              </button>
              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="notification-dropdown"
                  >
                    <div className="notif-header">
                      <h4>Notifications</h4>
                      <button className="notif-mark-read">Mark all as read</button>
                    </div>
                    <div className="notif-list">
                      {notifications.map(n => (
                        <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                          <div className="notif-text">{n.text}</div>
                          <div className="notif-time">{n.time}</div>
                        </div>
                      ))}
                    </div>
                    <div className="notif-footer">
                      <button className="notif-view-all" onClick={() => { setIsNotifOpen(false); navigate(`/${role}/notifications`); }}>View all notifications</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="user-profile-container" style={{ position: 'relative' }}>
              <div className="user-profile-circle" onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} alt="Profile" />
              </div>
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <>
                    <div style={{ position: 'fixed', inset: 0, zIndex: 45 }} onClick={() => setIsProfileDropdownOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="profile-dropdown"
                    >
                      <button onClick={() => { setIsProfileDropdownOpen(false); navigate(`/${role}/profile`); }}>
                        <Settings size={16} /> Your Profile
                      </button>
                      <button className="logout-btn-drop" onClick={handleLogout}>
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
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

        .nav-link.w-full { width: 100%; border: none; background: transparent; cursor: pointer; font-family: inherit; font-size: 1rem; }
        .nav-link-sub { display: block; padding: 0.5rem 1rem; color: #64748b; text-decoration: none; border-radius: 8px; font-size: 0.875rem; transition: all 0.2s; }
        .nav-link-sub:hover { color: #0d2331; background: #f8fafc; }
        .nav-link-sub.active { color: #0d2331; font-weight: 700; background: #f1f5f9; }

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

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .btn-emergency {
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 800;
          font-size: 0.875rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          animation: pulse 2s infinite;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          transition: all 0.2s;
        }

        .btn-emergency:hover {
          background: #dc2626;
          transform: translateY(-1px);
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
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

        .profile-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          min-width: 180px;
          z-index: 50;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .profile-dropdown button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
          cursor: pointer;
          transition: background 0.2s;
        }

        .profile-dropdown button:hover {
          background: #f8fafc;
        }

        .profile-dropdown button.logout-btn-drop {
          color: #ef4444;
          border-top: 1px solid #f1f5f9;
        }

        .profile-dropdown button.logout-btn-drop:hover {
          background: #fef2f2;
        }

        .notification-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 5px);
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          width: 320px;
          z-index: 50;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .notif-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #f1f5f9; }
        .notif-header h4 { margin: 0; font-size: 0.9375rem; font-weight: 800; color: #1e293b; }
        .notif-mark-read { background: none; border: none; font-size: 0.75rem; font-weight: 600; color: #3b82f6; cursor: pointer; }
        
        .notif-list { max-height: 350px; overflow-y: auto; display: flex; flex-direction: column; }
        .notif-item { padding: 0.875rem 1rem; border-bottom: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 0.25rem; transition: background 0.2s; cursor: pointer; }
        .notif-item:hover { background: #f8fafc; }
        .notif-item.unread { background: #eff6ff; }
        .notif-item.unread:hover { background: #e0f2fe; }
        
        .notif-text { font-size: 0.875rem; color: #1e293b; font-weight: 500; line-height: 1.4; }
        .notif-time { font-size: 0.75rem; color: #94a3b8; }

        .notif-footer { padding: 0.75rem; border-top: 1px solid #f1f5f9; text-align: center; }
        .notif-view-all { background: none; border: none; font-size: 0.8125rem; font-weight: 700; color: #64748b; cursor: pointer; transition: color 0.2s; }
        .notif-view-all:hover { color: #1e293b; }

        .content-area {
          padding: 2rem;
        }

        .mobile-dashboard-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          align-items: center;
          justify-content: center;
          -webkit-appearance: none;
        }

        .sidebar-overlay {
          display: none;
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
          .mobile-dashboard-menu-btn {
            display: flex;
          }
          .sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 45; /* Below sidebar's 50 */
            backdrop-filter: blur(2px);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
