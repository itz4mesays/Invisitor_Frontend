import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, Eye, Building } from 'lucide-react';

const ManageHosts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHost, setSelectedHost] = useState(null);
  const [activeTab, setActiveTab] = useState('officers');

  const hosts = [
    { id: 'H-1001', name: 'TechCorp Industries', plan: 'Enterprise', status: 'Active', officers: 12, visitors: 1450, joined: 'Jan 15, 2023' },
    { id: 'H-1002', name: 'Global Finance LLC', plan: 'Professional', status: 'Active', officers: 4, visitors: 320, joined: 'Mar 22, 2023' },
    { id: 'H-1003', name: 'HealthPlus Clinics', plan: 'Starter', status: 'Inactive', officers: 1, visitors: 85, joined: 'Jun 10, 2023' },
    { id: 'H-1004', name: 'Nexus Innovations', plan: 'Enterprise', status: 'Active', officers: 8, visitors: 890, joined: 'Sep 05, 2023' },
  ];

  const handleViewHost = (host) => {
    navigate(`/admin/hosts/${host.id}`);
  };

  return (
    <div className="admin-page" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Manage Hosts</h1>
          <p style={{ color: 'var(--text-secondary)' }}>View and manage all registered private/public business hosts.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={18} /> Export List
        </button>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search hosts..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'transparent', border: '1px solid var(--border-default)', borderRadius: '8px', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <Filter size={18} /> Filter
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-default)' }}>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>HOST ID</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>BUSINESS NAME</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>PLAN</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>STATUS</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>JOINED</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {hosts.map((host, idx) => (
                <tr key={host.id} style={{ borderBottom: '1px solid var(--border-default)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{host.id}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--bg-brand-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                      <Building size={16} />
                    </div>
                    {host.name}
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{host.plan}</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                      background: host.status === 'Active' ? 'var(--bg-success-subtle)' : 'var(--bg-danger-subtle)',
                      color: host.status === 'Active' ? 'var(--text-success)' : 'var(--text-danger)'
                    }}>
                      {host.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{host.joined}</td>
                  <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                    <button onClick={() => handleViewHost(host)} style={{ background: 'transparent', border: 'none', color: 'var(--bg-brand)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                      <Eye size={16} /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageHosts;
