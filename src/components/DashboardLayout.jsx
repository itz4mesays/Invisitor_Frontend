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
  FileText,
  Upload,
  CheckCircle2,
  Box
} from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [showWelcomeToast, setShowWelcomeToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.showWelcomeToast) {
      setShowWelcomeToast(true);
      setToastMessage(`Welcome back, ${location.state.userName || 'User'}!`);
      
      // Clear state to prevent toast on refresh
      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => {
        setShowWelcomeToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [location]);

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
    
    return () => document.body.classList.remove('dark-mode');
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
          { icon: <Users size={20} />, label: 'Manage Hosts', path: `/${currentRole}/hosts` },
          { icon: <Users size={20} />, label: 'Manage Users', path: `/${currentRole}/users` },
          { icon: <Box size={20} />, label: 'Manage Plans', path: `/${currentRole}/plans` },
          { icon: <ShieldCheck size={20} />, label: 'Estate Managers', path: `/${currentRole}/estate-managers` },
          { icon: <FileText size={20} />, label: 'Tickets', path: `/${currentRole}/tickets` },
          { icon: <Users size={20} />, label: 'Leads', path: `/${currentRole}/leads` },
          { icon: <FileText size={20} />, label: 'Forms', path: `/${currentRole}/forms` },
          { icon: <BarChart2 size={20} />, label: 'Transactions', path: `/${currentRole}/transactions` },
          { icon: <FileText size={20} />, label: 'Manage Invoices', path: `/${currentRole}/invoices` },
          { icon: <Upload size={20} />, label: 'Data Import', path: `/${currentRole}/data-import` },
          { 
            icon: <ShieldCheck size={20} />, 
            label: 'Access Level', 
            isDropdown: true,
            children: [
              { label: 'Overview', path: `/${currentRole}/access-level` },
              { label: 'Manage Roles', path: `/${currentRole}/access-level?tab=roles` },
              { label: 'Manage Permissions', path: `/${currentRole}/access-level?tab=permissions` }
            ]
          },
          { icon: <BarChart2 size={20} />, label: 'Activity Log', path: `/${currentRole}/activity-log` },
        ];
      case 'manager':
        return [
          ...baseMenus,
          { icon: <Users size={20} />, label: 'Residents', path: `/${currentRole}/residents` },
          { icon: <ShieldCheck size={20} />, label: 'Security', path: `/${currentRole}/security` },
          { icon: <Calendar size={20} />, label: 'Appointments', path: `/${currentRole}/appointments` },
          { icon: <FileText size={20} />, label: 'Manage Invoices', path: `/${currentRole}/invoices` },
          { icon: <Upload size={20} />, label: 'Data Import', path: `/${currentRole}/data-import` },
          { 
            icon: <BarChart2 size={20} />, 
            label: 'Reports', 
            isDropdown: true,
            children: [
              { label: 'Resident Report', path: `/${currentRole}/reports/resident` },
              { label: 'Appointment Reports', path: `/${currentRole}/reports/appointments` },
              { label: 'Security Report', path: `/${currentRole}/reports/security` }
            ]
          },
          { icon: <BarChart2 size={20} />, label: 'Transactions', path: `/${currentRole}/transactions` },
          { icon: <ShieldCheck size={20} />, label: 'Manage QR Codes', path: `/${currentRole}/qr-codes` },
          supportArea,
          { icon: <BarChart2 size={20} />, label: 'Activity Log', path: `/${currentRole}/activity-log` },
        ];
      case 'support':
        return [
          ...baseMenus,
          { icon: <Users size={20} />, label: 'Manage Hosts', path: `/${currentRole}/hosts` },
          { icon: <ShieldCheck size={20} />, label: 'Estate Managers', path: `/${currentRole}/estate-managers` },
          { icon: <Box size={20} />, label: 'Manage Plans', path: `/${currentRole}/plans` },
          { icon: <BarChart2 size={20} />, label: 'Transactions', path: `/${currentRole}/transactions` },
          { icon: <FileText size={20} />, label: 'Manage Invoices', path: `/${currentRole}/invoices` },
          { icon: <Users size={20} />, label: 'Leads', path: `/${currentRole}/leads` },
          { icon: <FileText size={20} />, label: 'Manage Tickets', path: `/${currentRole}/tickets` },
          { icon: <BarChart2 size={20} />, label: 'Activity Log', path: `/${currentRole}/activity-log` },
        ];
      case 'finance':
        return [
          ...baseMenus,
          { icon: <Users size={20} />, label: 'Manage Hosts', path: `/${currentRole}/hosts` },
          { icon: <ShieldCheck size={20} />, label: 'Estate Managers', path: `/${currentRole}/estate-managers` },
          { icon: <Box size={20} />, label: 'Manage Plans', path: `/${currentRole}/plans` },
          { icon: <BarChart2 size={20} />, label: 'Transactions', path: `/${currentRole}/transactions` },
          { icon: <FileText size={20} />, label: 'Manage Invoices', path: `/${currentRole}/invoices` },
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
          { icon: <Users size={20} />, label: 'Manage Hosts', path: `/${currentRole}/hosts` },
          { icon: <Users size={20} />, label: 'Visitors', path: `/${currentRole}/visitors` },
          { icon: <Calendar size={20} />, label: 'Appointments', path: `/${currentRole}/appointments` },
          { 
            icon: <BarChart2 size={20} />, 
            label: 'Reports', 
            isDropdown: true,
            children: [
              { label: 'Visitor Report', path: `/${currentRole}/reports/visitor` },
              { label: 'Appointment Reports', path: `/${currentRole}/reports/appointments` },
              { label: 'Security Report', path: `/${currentRole}/reports/security` }
            ]
          },
          { icon: <ShieldCheck size={20} />, label: 'Manage QR Codes', path: `/${currentRole}/qr-codes` },
          { icon: <ShieldCheck size={20} />, label: 'Front-Desk Officers', path: `/${currentRole}/front-desk` },
          { icon: <FileText size={20} />, label: 'Manage Invoices', path: `/${currentRole}/invoices` },
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
          { icon: <Users size={20} />, label: 'Visitors', path: `/${currentRole}/visitors` },
          { icon: <Calendar size={20} />, label: 'Appointments', path: `/${currentRole}/appointments` },
          supportArea,
          { icon: <BarChart2 size={20} />, label: 'Activity Log', path: `/${currentRole}/activity-log` },
        ];
      default:
        return baseMenus;
    }
  };

  const menuItems = getMenuItems(role);

  const getPageTitle = () => {
    const currentPath = location.pathname;
    
    // Check flat items
    let activeItem = menuItems.find(item => !item.isDropdown && item.path === currentPath);
    if (activeItem) return activeItem.label;

    // Check dropdown children
    for (const item of menuItems) {
      if (item.isDropdown) {
        const childItem = item.children.find(c => c.path.split('?')[0] === currentPath);
        if (childItem) return childItem.label;
      }
    }
    
    // Fallbacks
    if (currentPath.endsWith('/settings')) return 'Settings';
    if (currentPath.endsWith('/profile')) return 'Your Profile';
    if (currentPath.endsWith('/notifications')) return 'Notifications';
    
    // Dynamic parts or unknown
    const pathParts = currentPath.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    // Capitalize fallback
    return lastPart ? lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace('-', ' ') : 'Dashboard';
  };

  const toggleDropdown = (label) => {
    setOpenDropdowns(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = () => {
    // Basic logout simulation
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Toast */}
      {showWelcomeToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#10b981',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
          padding: '1rem 1.5rem',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          zIndex: 10000,
          animation: 'slideInRight 0.3s ease forwards'
        }}>
          <CheckCircle2 size={24} color="#ffffff" />
          <span style={{ fontWeight: 600, color: '#ffffff' }}>
            {toastMessage}
          </span>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <img src="/dashboard_logo.png" className="logo-img logo-light" alt="InVisitor" />
            <img src="/logo_white.png" className="logo-img logo-dark" alt="InVisitor" />
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
              <Menu size={24} color="var(--text-tertiary)" />
            </button>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em', display: 'flex', alignItems: 'center' }}>
              {getPageTitle()}
            </h1>
            <div style={{ flex: 1 }}></div>
          </div>
          <div className="header-actions">
            {role === 'resident' && (
              <button className="btn-emergency" onClick={() => alert('EMERGENCY TRIGGERED!')}>
                <AlertTriangle size={16} /> SOS
              </button>
            )}
            <span className="header-user-name" style={{ fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-primary)' }}>David Fayemi</span>
            <button className="theme-toggle-btn" onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
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
          background-color: var(--bg-subtle);
          color: var(--text-primary);
        }

        /* Sidebar */
        .sidebar {
          width: 280px;
          background: var(--bg-surface);
          border-right: 1px solid var(--border-default);
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
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-tertiary);
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          z-index: 100;
          transition: all 0.2s;
        }

        .sidebar-toggle-btn:hover {
          color: var(--bg-brand);
          background: var(--bg-subtle);
          transform: scale(1.1);
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          overflow: hidden;
          width: 140px;
          height: 32px;
          transition: width 0.3s ease;
        }

        .sidebar.closed .logo-container {
          width: 32px;
        }

        .logo-img {
          height: 32px;
          width: 140px;
          object-fit: cover;
          object-position: left center;
        }

        .logo-light { display: block; }
        .logo-dark { display: none; }

        :global(body.dark-mode) .logo-light { display: none; }
        :global(body.dark-mode) .logo-dark { display: block; }

        .sidebar-nav {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          overflow-x: hidden;
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
          color: var(--text-tertiary);
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.2s;
          gap: 1rem;
        }

        .nav-link:hover {
          background-color: var(--bg-muted);
          color: var(--bg-brand);
        }

        .nav-link.active {
          background-color: var(--bg-muted);
          color: var(--bg-brand);
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
        .nav-link-sub { display: block; padding: 0.5rem 1rem; color: var(--text-tertiary); text-decoration: none; border-radius: 8px; font-size: 0.875rem; transition: all 0.2s; }
        .nav-link-sub:hover { color: var(--bg-brand); background: var(--bg-subtle); }
        .nav-link-sub.active { color: var(--bg-brand); font-weight: 700; background: var(--bg-muted); }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--border-default);
        }

        .user-profile-mini {
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: var(--bg-subtle);
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
          background: var(--border-default);
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
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-email {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .logout-btn {
          background: none;
          border: none;
          color: var(--text-tertiary);
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
          color: var(--text-danger);
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
          background: var(--bg-surface);
          border-bottom: 1px solid var(--border-default);
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
          background: var(--text-danger);
          color: var(--text-inverse);
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
          color: var(--text-tertiary);
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
          background-color: var(--text-danger);
          border: 2px solid var(--bg-surface);
          border-radius: 50%;
        }

        .user-profile-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid var(--border-default);
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
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
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
          color: var(--text-primary);
          cursor: pointer;
          transition: background 0.2s;
        }

        .profile-dropdown button:hover {
          background: var(--bg-subtle);
        }

        .profile-dropdown button.logout-btn-drop {
          color: var(--text-danger);
          border-top: 1px solid var(--bg-muted);
        }

        .profile-dropdown button.logout-btn-drop:hover {
          background: var(--bg-danger-subtle);
        }

        .notification-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 5px);
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          width: 320px;
          z-index: 50;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .notif-header { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid var(--bg-muted); }
        .notif-header h4 { margin: 0; font-size: 0.9375rem; font-weight: 800; color: var(--text-primary); }
        .notif-mark-read { background: none; border: none; font-size: 0.75rem; font-weight: 600; color: #3b82f6; cursor: pointer; }
        
        .notif-list { max-height: 350px; overflow-y: auto; display: flex; flex-direction: column; }
        .notif-item { padding: 0.875rem 1rem; border-bottom: 1px solid var(--bg-muted); display: flex; flex-direction: column; gap: 0.25rem; transition: background 0.2s; cursor: pointer; }
        .notif-item:hover { background: var(--bg-subtle); }
        .notif-item.unread { background: #eff6ff; }
        .notif-item.unread:hover { background: #e0f2fe; }
        
        .notif-text { font-size: 0.875rem; color: var(--text-primary); font-weight: 500; line-height: 1.4; }
        .notif-time { font-size: 0.75rem; color: var(--text-quaternary); }

        .notif-footer { padding: 0.75rem; border-top: 1px solid var(--bg-muted); text-align: center; }
        .notif-view-all { background: none; border: none; font-size: 0.8125rem; font-weight: 700; color: var(--text-tertiary); cursor: pointer; transition: color 0.2s; }
        .notif-view-all:hover { color: var(--text-primary); }

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
