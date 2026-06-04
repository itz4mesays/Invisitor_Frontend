import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, UserPlus, Mail, Phone, MoreVertical, Edit2, Shield, Ban, RotateCcw, X, CheckCircle, ShieldAlert, Users } from 'lucide-react';

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const [usersList, setUsersList] = useState([
    { id: 'USR-001', name: 'Admin One', role: 'Super Admin', email: 'admin@invisitor.com', phone: '+1 234 567 8900', status: 'Active', lastLogin: 'Today, 10:30 AM' },
    { id: 'USR-002', name: 'John Doe', role: 'Support Agent', email: 'john@invisitor.com', phone: '+1 987 654 3210', status: 'Active', lastLogin: 'Yesterday' },
    { id: 'USR-003', name: 'Jane Smith', role: 'Sales Rep', email: 'jane@invisitor.com', phone: '+1 555 123 4567', status: 'Suspended', lastLogin: 'Oct 12, 2023' },
    { id: 'USR-004', name: 'Mike Ross', role: 'Billing Manager', email: 'mike@invisitor.com', phone: '+1 444 888 9999', status: 'Blacklisted', lastLogin: 'Sep 28, 2023' },
  ]);

  const toggleStatus = (id, newStatus) => {
    if (window.confirm(`Are you sure you want to change this user's status to ${newStatus}?`)) {
      setUsersList(usersList.map(u => u.id === id ? { ...u, status: newStatus } : u));
    }
    setActiveDropdown(null);
  };

  const resendPassword = (id) => {
    alert(`Password reset link sent to user ${id}.`);
    setActiveDropdown(null);
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Active': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' };
      case 'Suspended': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' };
      case 'Blacklisted': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      default: return { bg: 'var(--bg-subtle)', color: 'var(--text-secondary)' };
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Manage Users</h1>
          <p style={{ color: 'var(--text-secondary)' }}>View and manage all system users, their statuses and actions.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={18} /> Export
          </button>
          <button 
            className="btn btn-primary" 
            onClick={() => setIsAddUserModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <UserPlus size={18} /> Add User
          </button>
        </div>
      </div>

      <div className="stat-grid">
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-brand)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>Total Users</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{usersList.length}</h3>
          </div>
        </div>
        
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>Active</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{usersList.filter(u => u.status === 'Active').length}</h3>
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>Suspended</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{usersList.filter(u => u.status === 'Suspended').length}</h3>
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ban size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>Blacklisted</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{usersList.filter(u => u.status === 'Blacklisted').length}</h3>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-default)', overflow: 'visible' }}>
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <Filter size={18} /> Filter
          </button>
        </div>

        <div className="table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-default)' }}>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>USER</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>ROLE</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>STATUS</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>LAST LOGIN</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {usersList.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => {
                const statusStyles = getStatusStyle(user.status);
                return (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--border-default)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1.2rem 1.5rem', cursor: 'pointer' }} onClick={() => setSelectedUser(user)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-brand)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>{user.name}</div>
                          <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      <span style={{ background: 'var(--bg-subtle)', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }}>{user.role}</span>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <span style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, background: statusStyles.bg, color: statusStyles.color }}>
                        {user.status}
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{user.lastLogin}</td>
                    <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right', position: 'relative' }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === user.id ? null : user.id); }}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }}
                      >
                        <MoreVertical size={16} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === user.id && (
                        <div style={{ position: 'absolute', right: '40px', top: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-default)', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '0.5rem', zIndex: 100, minWidth: '200px', textAlign: 'left' }}>
                          <button onClick={() => { setSelectedUser(user); setActiveDropdown(null); }} style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '8px' }} onMouseOver={e => e.currentTarget.style.background = 'var(--bg-subtle)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                            <Edit2 size={15} /> View / Edit Details
                          </button>
                          
                          {user.status === 'Active' ? (
                            <button onClick={() => toggleStatus(user.id, 'Suspended')} style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', background: 'transparent', border: 'none', color: '#f59e0b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '8px' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(245, 158, 11, 0.1)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                              <ShieldAlert size={15} /> Suspend User
                            </button>
                          ) : (
                            <button onClick={() => toggleStatus(user.id, 'Active')} style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', background: 'transparent', border: 'none', color: '#10b981', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '8px' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                              <CheckCircle size={15} /> Unsuspend User
                            </button>
                          )}

                          {user.status !== 'Blacklisted' && (
                            <button onClick={() => toggleStatus(user.id, 'Blacklisted')} style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', background: 'transparent', border: 'none', color: 'var(--text-danger)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '8px' }} onMouseOver={e => e.currentTarget.style.background = 'var(--bg-danger-subtle)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                              <Ban size={15} /> Blacklist User
                            </button>
                          )}

                          <div style={{ height: '1px', background: 'var(--border-default)', margin: '0.5rem 0' }}></div>
                          
                          <button onClick={() => resendPassword(user.id)} style={{ width: '100%', textAlign: 'left', padding: '0.75rem 1rem', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '8px' }} onMouseOver={e => e.currentTarget.style.background = 'var(--bg-subtle)'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                            <RotateCcw size={15} /> Resend Password Link
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {isAddUserModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAddUserModalOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'relative', width: '100%', maxWidth: '450px', height: '100%', background: 'var(--bg-surface)', borderLeft: '1px solid var(--border-default)', boxShadow: '-20px 0 40px rgba(0,0,0,0.1)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'var(--bg-surface)', zIndex: 10 }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Add New User</h2>
                <button onClick={() => setIsAddUserModalOpen(false)} style={{ background: 'var(--bg-subtle)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={16} />
                </button>
              </div>
              <div style={{ padding: '2rem', flex: 1 }}>
                <form onSubmit={(e) => { e.preventDefault(); setIsAddUserModalOpen(false); }}>
                  <div style={{ display: 'grid', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
                      <input type="text" placeholder="e.g. John Doe" required style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address</label>
                      <input type="email" placeholder="john@example.com" required style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Phone Number</label>
                      <input type="tel" placeholder="+1 234 567 8900" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Assign Role</label>
                      <select style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none', appearance: 'none' }}>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Support Agent">Support Agent</option>
                        <option value="Billing Manager">Billing Manager</option>
                        <option value="Sales Rep">Sales Rep</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={() => setIsAddUserModalOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Create User</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Single User Details Slide-over */}
      <AnimatePresence>
        {selectedUser && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'relative', width: '100%', maxWidth: '450px', height: '100%', background: 'var(--bg-surface)', borderLeft: '1px solid var(--border-default)', boxShadow: '-20px 0 40px rgba(0,0,0,0.1)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'var(--bg-surface)', zIndex: 10 }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>User Details</h2>
                <button onClick={() => setSelectedUser(null)} style={{ background: 'var(--bg-subtle)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={16} />
                </button>
              </div>
              <div style={{ padding: '2rem', flex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-brand)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '2rem', margin: '0 auto 1rem' }}>
                    {selectedUser.name.charAt(0)}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{selectedUser.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{selectedUser.role}</p>
                  <span style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, ...getStatusStyle(selectedUser.status) }}>
                    {selectedUser.status}
                  </span>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem', background: 'var(--bg-subtle)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-default)' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      <Mail size={16} style={{ color: 'var(--text-secondary)' }} /> {selectedUser.email}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      <Phone size={16} style={{ color: 'var(--text-secondary)' }} /> {selectedUser.phone}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Last Login</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {selectedUser.lastLogin}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '3rem', display: 'grid', gap: '1rem' }}>
                  {selectedUser.status === 'Active' ? (
                    <button onClick={() => toggleStatus(selectedUser.id, 'Suspended')} className="btn btn-secondary" style={{ width: '100%', color: '#f59e0b', borderColor: '#f59e0b', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                      <ShieldAlert size={16} /> Suspend User
                    </button>
                  ) : (
                    <button onClick={() => toggleStatus(selectedUser.id, 'Active')} className="btn btn-secondary" style={{ width: '100%', color: '#10b981', borderColor: '#10b981', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle size={16} /> Unsuspend User
                    </button>
                  )}
                  {selectedUser.status !== 'Blacklisted' && (
                    <button onClick={() => toggleStatus(selectedUser.id, 'Blacklisted')} className="btn btn-secondary" style={{ width: '100%', color: 'var(--text-danger)', borderColor: 'var(--text-danger)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                      <Ban size={16} /> Blacklist User
                    </button>
                  )}
                  <button onClick={() => resendPassword(selectedUser.id)} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                    <RotateCcw size={16} /> Resend Password Link
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageUsers;
