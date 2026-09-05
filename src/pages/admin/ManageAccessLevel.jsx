import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldCheck, Users, Key, Search, MoreVertical, Plus, X, Check, Eye, Edit2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ManageAccessLevel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '' });

  const [isCreatePermissionOpen, setIsCreatePermissionOpen] = useState(false);
  const [newPermissions, setNewPermissions] = useState([
    { module: '', code: '', display_name: '', description: '' }
  ]);

  const moduleOptions = [
    'Host Management', 'Roles & Permissions', 'Users Management', 'Visitors', 
    'Appointments', 'Reports', 'QR Codes', 'Frontdesks', 'Invoices', 
    'Transactions', 'Audit Logs', 'Support Tickets', 'Calendar', 
    'Resident', 'Security'
  ];

  const handleAddPermissionRow = () => {
    setNewPermissions([...newPermissions, { module: '', code: '', display_name: '', description: '' }]);
  };

  const handlePermissionChange = (index, field, value) => {
    const updated = [...newPermissions];
    updated[index][field] = value;
    setNewPermissions(updated);
  };

  const handleRemovePermissionRow = (index) => {
    const updated = [...newPermissions];
    updated.splice(index, 1);
    setNewPermissions(updated);
  };

  const handleCreatePermissionsSubmit = (e) => {
    e.preventDefault();
    // In a real scenario, you'd send `newPermissions` to your API here.
    setIsCreatePermissionOpen(false);
    setNewPermissions([{ module: '', code: '', display_name: '', description: '' }]);
  };

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'roles', 'permissions'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const setTab = (tab) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <ShieldCheck size={18} /> },
    { id: 'roles', label: 'Manage Roles', icon: <Users size={18} /> },
    { id: 'permissions', label: 'Manage Permissions', icon: <Key size={18} /> },
  ];

  const [mockRoles, setMockRoles] = useState([
    { id: 'R-01', name: 'Super Admin', description: 'Full access to all modules and settings', users: 2 },
    { id: 'R-02', name: 'Support Agent', description: 'Access to tickets and leads', users: 8 },
    { id: 'R-03', name: 'Finance Admin', description: 'Access to invoices and transactions', users: 5 },
  ]);

  const modules = [
    { name: 'Dashboard', permissions: ['View Overview', 'View Charts'] },
    { name: 'Hosts', permissions: ['View List', 'View Details', 'Create Host', 'Edit Host', 'Delete Host'] },
    { name: 'Estate Managers', permissions: ['View List', 'View Details', 'Manage Assignments'] },
    { name: 'Transactions', permissions: ['View List', 'Download PDF', 'Refund'] },
    { name: 'Invoices', permissions: ['View List', 'Mark as Paid', 'Generate Invoice'] },
    { name: 'Tickets', permissions: ['View List', 'Reply', 'Close Ticket'] },
  ];

  const handleCreateRole = (e) => {
    e.preventDefault();
    if (newRole.name) {
      setMockRoles([
        ...mockRoles,
        { id: `R-0${mockRoles.length + 1}`, name: newRole.name, description: newRole.description, users: 0 },
      ]);
      setIsCreateRoleOpen(false);
      setNewRole({ name: '', description: '' });
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            Manage Access Levels
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Configure roles and permissions across the system.</p>
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-default)', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '600px' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', padding: '0 1rem', borderBottom: '1px solid var(--border-default)', background: 'var(--bg-subtle)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              style={{
                padding: '1.25rem 1.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: activeTab === tab.id ? 'var(--bg-brand)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab.id ? '2px solid var(--bg-brand)' : '2px solid transparent',
                transition: 'all 0.2s',
                outline: 'none',
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div style={{ padding: '2rem' }}>
              <div className="stat-grid">
                <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-default)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0,144,230,0.1)', color: 'var(--bg-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Users size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>14</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Custom Roles</p>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-default)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Key size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>42</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>Configurable Permissions</p>
                </div>
                <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-default)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245,158,11,0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <ShieldCheck size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.25rem 0' }}>100%</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>System Coverage</p>
                </div>
              </div>

              <div style={{ background: 'var(--bg-surface)', borderRadius: '12px', padding: '3rem', textAlign: 'center', border: '1px dashed var(--border-heavy)' }}>
                <ShieldCheck size={48} style={{ color: 'var(--text-tertiary)', margin: '0 auto 1rem' }} />
                <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Role-Based Access Control</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>
                  Manage the roles assigned to administrators and team members, and fine-tune their permissions
                  to ensure they have the exact access required for their work.
                </p>
              </div>
            </div>
          )}

          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div>
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-default)', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', width: '300px', maxWidth: '100%' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                    <input
                      type="text"
                      placeholder="Search roles..."
                      style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', background: 'var(--bg-subtle)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                    Total System Defined Roles: <span style={{ color: 'var(--text-primary)' }}>{mockRoles.length}</span>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsCreateRoleOpen(true)}
                  style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Plus size={18} /> Create New Role
                </button>
              </div>

              <div className="table-container">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-default)' }}>
                      <th style={{ padding: '1rem 2rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', width: '25%' }}>Role Name</th>
                      <th style={{ padding: '1rem 2rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Description</th>
                      <th style={{ padding: '1rem 2rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', width: '15%' }}>Assigned Users</th>
                      <th style={{ padding: '1rem 2rem', textAlign: 'right', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', width: '10%' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRoles.map((role, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--bg-surface)' }}>
                        <td style={{ padding: '1.2rem 2rem', fontWeight: 600, color: 'var(--text-primary)' }}>{role.name}</td>
                        <td style={{ padding: '1.2rem 2rem', color: 'var(--text-secondary)' }}>{role.description}</td>
                        <td style={{ padding: '1.2rem 2rem' }}>
                          <span style={{ padding: '0.25rem 0.75rem', background: 'var(--bg-subtle)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                            {role.users} Users
                          </span>
                        </td>
                        <td style={{ padding: '1.2rem 2rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.25rem' }}>
                              <Eye size={16} />
                            </button>
                            <button style={{ background: 'transparent', border: 'none', color: 'var(--bg-brand)', cursor: 'pointer', padding: '0.25rem' }}>
                              <Edit2 size={16} />
                            </button>
                            <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Permissions Tab */}
          {activeTab === 'permissions' && (
            <div>
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-default)', background: 'var(--bg-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                  Select a role below to configure its module permissions across the platform.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsCreatePermissionOpen(true)}
                  style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Plus size={18} /> Create Permission
                </button>
              </div>

              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>

                  {/* Role Selector */}
                  <div style={{ flex: '1 1 250px', maxWidth: '350px', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-default)', background: 'var(--bg-subtle)' }}>
                      <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Select Role</h3>
                    </div>
                    <div>
                      {mockRoles.map((role, idx) => (
                        <button
                          key={role.id}
                          style={{
                            width: '100%',
                            padding: '1rem',
                            textAlign: 'left',
                            background: idx === 0 ? 'rgba(0,144,230,0.05)' : 'transparent',
                            border: 'none',
                            borderBottom: '1px solid var(--border-default)',
                            borderLeft: idx === 0 ? '3px solid var(--bg-brand)' : '3px solid transparent',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          <span style={{ display: 'block', fontWeight: 600, color: idx === 0 ? 'var(--bg-brand)' : 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            {role.name}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{role.users} assigned users</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Matrix */}
                  <div style={{ flex: '2 1 500px', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
                    <div className="table-container">
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-default)' }}>
                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Module</th>
                            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Permissions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {modules.map((mod, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--border-default)' }}>
                              <td style={{ padding: '1.5rem 1rem', color: 'var(--text-primary)', fontWeight: 700, verticalAlign: 'top', width: '30%' }}>{mod.name}</td>
                              <td style={{ padding: '1.5rem 1rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                  {mod.permissions.map((perm, j) => (
                                    <label key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                      <input
                                        type="checkbox"
                                        defaultChecked={j % 2 === 0}
                                        style={{ width: '16px', height: '16px', accentColor: 'var(--bg-brand)', cursor: 'pointer' }}
                                      />
                                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{perm}</span>
                                    </label>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-default)', background: 'var(--bg-subtle)', display: 'flex', justifyContent: 'flex-end' }}>
                      <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Check size={18} /> Update Permissions
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Create Permission Slide-over */}
      <AnimatePresence>
        {isCreatePermissionOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreatePermissionOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000 }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '600px', background: 'var(--bg-surface)', zIndex: 1001, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-subtle)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Create Permissions</h2>
                <button onClick={() => setIsCreatePermissionOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                <form id="createPermissionsForm" onSubmit={handleCreatePermissionsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {newPermissions.map((perm, index) => (
                    <div key={index} style={{ padding: '1.5rem', background: 'var(--bg-subtle)', borderRadius: '12px', border: '1px solid var(--border-default)', position: 'relative' }}>
                      {newPermissions.length > 1 && (
                        <button type="button" onClick={() => handleRemovePermissionRow(index)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      )}
                      <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Permission #{index + 1}</h4>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Module</label>
                          <select 
                            value={perm.module} 
                            onChange={(e) => handlePermissionChange(index, 'module', e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                          >
                            <option value="" disabled>Select Module...</option>
                            {moduleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Code</label>
                          <input
                            type="text"
                            placeholder="e.g. view.overview"
                            value={perm.code}
                            onChange={(e) => handlePermissionChange(index, 'code', e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Display Name</label>
                          <input
                            type="text"
                            placeholder="e.g. View Overview"
                            value={perm.display_name}
                            onChange={(e) => handlePermissionChange(index, 'display_name', e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                          />
                        </div>
                        <div className="form-group" style={{ margin: 0 }}>
                          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Description</label>
                          <input
                            type="text"
                            placeholder="Optional"
                            value={perm.description}
                            onChange={(e) => handlePermissionChange(index, 'description', e.target.value)}
                            style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)', outline: 'none' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button type="button" onClick={handleAddPermissionRow} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', background: 'transparent', border: '1px dashed var(--border-heavy)', borderRadius: '8px', color: 'var(--bg-brand)', fontWeight: 600, cursor: 'pointer' }}>
                    <Plus size={18} /> Add Another Permission
                  </button>
                </form>
              </div>
              <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-default)', background: 'var(--bg-subtle)', display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setIsCreatePermissionOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button form="createPermissionsForm" type="submit" className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={18} /> Save Permissions
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Create Role Slide-over */}
      <AnimatePresence>
        {isCreateRoleOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateRoleOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000 }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px', background: 'var(--bg-surface)', zIndex: 1001, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-subtle)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Create New Role</h2>
                <button onClick={() => setIsCreateRoleOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                <form id="createRoleForm" onSubmit={handleCreateRole} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label>Role Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Content Editor"
                      value={newRole.name}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      placeholder="Briefly describe what this role can do..."
                      rows="4"
                      value={newRole.description}
                      onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                </form>
              </div>
              <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-default)', background: 'var(--bg-subtle)', display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setIsCreateRoleOpen(false)} className="btn btn-secondary" style={{ flex: 1 }}>Cancel</button>
                <button form="createRoleForm" type="submit" className="btn btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                  <Check size={18} /> Create Role
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageAccessLevel;
