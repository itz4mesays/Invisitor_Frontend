import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, ShieldOff, CheckCircle, Users, BarChart2, Briefcase } from 'lucide-react';

const ManageHosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [hosts, setHosts] = useState([
    { id: 1, fullname: 'John Doe', email: 'john.doe@techcorp.com', dialCode: '+1', phone: '234567890', gender: 'Male', department: 'Engineering', status: 'Active' },
    { id: 2, fullname: 'Jane Smith', email: 'jane.smith@techcorp.com', dialCode: '+1', phone: '987654321', gender: 'Female', department: 'HR', status: 'Active' },
    { id: 3, fullname: 'Michael Johnson', email: 'michael.j@techcorp.com', dialCode: '+44', phone: '122334455', gender: 'Male', department: 'Sales', status: 'Inactive' },
  ]);

  const [formData, setFormData] = useState({
    id: null, fullname: '', email: '', dialCode: '+234', phone: '', gender: '', department: ''
  });

  const departments = [...new Set(hosts.map(h => h.department))];

  const handleOpenModal = (host = null) => {
    if (host) {
      setFormData(host);
    } else {
      setFormData({ id: null, fullname: '', email: '', dialCode: '+234', phone: '', gender: '', department: '' });
    }
    setShowModal(true);
  };

  const handleSaveHost = (e) => {
    e.preventDefault();
    if (formData.id) {
      setHosts(hosts.map(h => h.id === formData.id ? { ...formData, status: h.status } : h));
    } else {
      setHosts([...hosts, { ...formData, id: Date.now(), status: 'Active' }]);
    }
    setShowModal(false);
  };

  const handleToggleStatus = (id) => {
    setHosts(hosts.map(h => {
      if (h.id === id) {
        return { ...h, status: h.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return h;
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this host?")) {
      setHosts(hosts.filter(h => h.id !== id));
    }
  };

  const filteredHosts = hosts.filter(h => h.fullname.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="host-page" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Manage Sub-Hosts</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Add, edit, and manage employee accounts under your company.</p>
        </div>
        <button className="btn-primary" onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '12px', background: 'var(--bg-brand)', color: 'var(--text-inverse)', border: 'none', fontWeight: 700, cursor: 'pointer' }}>
          <Plus size={18} /> Add New Host
        </button>
      </div>

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-brand-subtle)', color: 'var(--bg-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Total Sub-Hosts</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{hosts.length}</h3>
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-success-subtle)', color: 'var(--text-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Active Hosts</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{hosts.filter(h => h.status === 'Active').length}</h3>
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Departments</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{departments.length}</h3>
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-danger-subtle)', color: 'var(--text-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldOff size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Inactive Hosts</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{hosts.filter(h => h.status === 'Inactive').length}</h3>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search sub-hosts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-default)' }}>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>FULL NAME</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>CONTACT INFO</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>DEPARTMENT</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>GENDER</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>STATUS</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredHosts.map(host => (
                <tr key={host.id} style={{ borderBottom: '1px solid var(--border-default)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{host.fullname}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>{host.email}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{host.dialCode} {host.phone}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{host.department}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)' }}>{host.gender}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '12px', 
                      fontSize: '0.75rem', 
                      fontWeight: 700,
                      background: host.status === 'Active' ? 'var(--bg-success-subtle)' : 'var(--bg-danger-subtle)',
                      color: host.status === 'Active' ? 'var(--text-success)' : 'var(--text-danger)'
                    }}>
                      {host.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleOpenModal(host)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }} title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleToggleStatus(host.id)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }} title={host.status === 'Active' ? 'Deactivate' : 'Activate'}>
                        <ShieldOff size={16} />
                      </button>
                      <button onClick={() => handleDelete(host.id)} style={{ background: 'none', border: 'none', color: 'var(--text-danger)', cursor: 'pointer', padding: '4px' }} title="Delete">
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

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '500px' }}>
            <h2 style={{ margin: '0 0 1.5rem', color: 'var(--text-primary)' }}>{formData.id ? 'Edit Host' : 'Add New Host'}</h2>
            <form onSubmit={handleSaveHost} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
                <input required type="text" value={formData.fullname} onChange={e => setFormData({...formData, fullname: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Phone Number</label>
                <div style={{ display: 'flex', alignItems: 'stretch', border: '1px solid var(--border-default)', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-surface)' }}>
                  <select value={formData.dialCode} onChange={e => setFormData({...formData, dialCode: e.target.value})} style={{ width: '90px', padding: '0.75rem 0.25rem 0.75rem 0.5rem', border: 'none', borderRight: '1px solid var(--border-default)', outline: 'none', background: 'var(--bg-subtle)', fontWeight: 600, color: 'var(--text-primary)', cursor: 'pointer' }}>
                    <option value="+234">+234 (NG)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+27">+27 (ZA)</option>
                    <option value="+254">+254 (KE)</option>
                  </select>
                  <input required type="tel" placeholder="e.g. 8012345678" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ flex: 1, padding: '0.75rem', border: 'none', outline: 'none', background: 'transparent' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Gender</label>
                  <select required value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)', outline: 'none', background: 'var(--bg-surface)' }}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Department</label>
                  <input required type="text" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)', outline: 'none' }} />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-brand)', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Save Host</button>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-subtle)', color: 'var(--text-primary)', border: '1px solid var(--border-default)', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageHosts;
