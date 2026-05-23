import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Lock, Shield, UserX, User, Bell, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
  const location = useLocation();
  const role = location.pathname.split('/')[1];
  
  // Custom tabs for Resident, Generic for others
  const tabs = role === 'resident' 
    ? [
        { id: 'security', label: 'Change Password', icon: <Key size={18} /> },
        { id: '2fa', label: 'Setup 2FA', icon: <Shield size={18} /> },
        { id: 'deactivate', label: 'Deactivate Account', icon: <UserX size={18} /> },
      ]
    : [
        { id: 'profile', label: 'Profile Options', icon: <User size={18} /> },
        { id: 'security', label: 'Security', icon: <Lock size={18} /> },
        { id: 'notifications', label: 'Preferences', icon: <Bell size={18} /> },
      ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Resident Specific Content Renderers
  const renderResidentContent = () => {
    switch(activeTab) {
      case 'security':
        return (
          <div className="set-card">
            <h2>Change Password</h2>
            <p>Ensure your account is using a long, random password to stay secure.</p>
            <div className="set-form">
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <button className="btn-save">Update Password</button>
            </div>
          </div>
        );
      case '2fa':
        return (
          <div className="set-card">
            <h2>Two-Factor Authentication</h2>
            <p>Add an extra layer of security to your account.</p>
            <div className="two-fa-box">
              <div className="two-fa-icon"><Shield size={32} /></div>
              <div style={{ flex: 1 }}>
                <h3>Authenticator App</h3>
                <p>Use an authenticator app (like Google Authenticator) to generate one-time security codes.</p>
              </div>
              <button className="btn-setup">Setup</button>
            </div>
          </div>
        );
      case 'deactivate':
        return (
          <div className="set-card danger-zone">
            <h2 style={{ color: '#ef4444' }}>Deactivate Account</h2>
            <p>Once you deactivate your account, there is no going back. Please be certain.</p>
            <div className="danger-box">
              <p>Deactivating your account will immediately revoke your access to the estate portal. You will need to contact the Estate Manager to reactivate your access.</p>
              <button className="btn-danger">Deactivate My Account</button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  // Generic Content Renderers
  const renderGenericContent = () => {
    return (
      <div className="set-card">
        <h2>{tabs.find(t => t.id === activeTab)?.label}</h2>
        <p>This settings module is currently under development. Additional options will be available soon.</p>
      </div>
    );
  };

  return (
    <div className="set-page">
      <div className="set-header">
        <h1>Settings</h1>
        <p>Manage your account preferences and security.</p>
      </div>

      <div className="set-layout">
        <aside className="set-sidebar">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`set-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="set-tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </aside>

        <main className="set-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {role === 'resident' ? renderResidentContent() : renderGenericContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <style jsx>{`
        .set-page { padding-bottom: 3rem; max-width: 1000px; }
        .set-header { margin-bottom: 2rem; }
        .set-header h1 { font-size: 1.75rem; font-weight: 800; color: #1e293b; margin-bottom: 0.25rem; }
        .set-header p { color: #64748b; }
        .set-layout { display: flex; gap: 2.5rem; align-items: flex-start; }
        .set-sidebar { width: 250px; display: flex; flex-direction: column; gap: 0.25rem; }
        .set-tab { display: flex; align-items: center; gap: 0.75rem; padding: 0.875rem 1rem; border: none; background: transparent; color: #64748b; font-weight: 600; font-size: 0.95rem; text-align: left; border-radius: 10px; cursor: pointer; transition: all 0.2s; }
        .set-tab:hover { background: #f1f5f9; color: #1e293b; }
        .set-tab.active { background: #e0f2fe; color: #0369a1; font-weight: 700; }
        .set-content { flex: 1; }
        .set-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 2rem; }
        .set-card h2 { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin-bottom: 0.5rem; }
        .set-card p { color: #64748b; font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.5; }
        .set-form { display: flex; flex-direction: column; gap: 1.25rem; max-width: 400px; }
        .form-group label { display: block; font-size: 0.875rem; font-weight: 600; color: #334155; margin-bottom: 0.5rem; }
        .form-group input { width: 100%; padding: 0.75rem 1rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.95rem; transition: border-color 0.2s; }
        .form-group input:focus { outline: none; border-color: #00a3ff; }
        .btn-save { background: #0d2331; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 700; cursor: pointer; width: fit-content; margin-top: 0.5rem; }
        .two-fa-box { display: flex; align-items: center; gap: 1.5rem; border: 1px solid #e2e8f0; padding: 1.5rem; border-radius: 12px; }
        .two-fa-icon { width: 64px; height: 64px; background: #e0f2fe; color: #0369a1; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .two-fa-box h3 { font-size: 1rem; font-weight: 700; color: #1e293b; margin-bottom: 0.25rem; }
        .two-fa-box p { margin: 0; font-size: 0.875rem; }
        .btn-setup { background: white; border: 1px solid #cbd5e1; color: #0d2331; font-weight: 700; padding: 0.6rem 1.25rem; border-radius: 8px; cursor: pointer; }
        .btn-setup:hover { background: #f8fafc; }
        .danger-zone { border-color: #fca5a5; }
        .danger-box { border: 1px solid #fecaca; background: #fef2f2; padding: 1.5rem; border-radius: 12px; }
        .danger-box p { color: #991b1b; font-weight: 500; margin-bottom: 1.5rem; }
        .btn-danger { background: #ef4444; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 700; cursor: pointer; }
        .btn-danger:hover { background: #dc2626; }
        
        @media (max-width: 768px) {
          .set-layout { flex-direction: column; }
          .set-sidebar { width: 100%; flex-direction: row; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 0.5rem; }
          .set-tab { white-space: nowrap; }
          .two-fa-box { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
};

export default Settings;
