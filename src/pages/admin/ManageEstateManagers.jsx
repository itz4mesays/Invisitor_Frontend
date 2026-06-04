import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Filter, Download, Building2 } from 'lucide-react';

const ManageEstateManagers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstate, setSelectedEstate] = useState(null);
  const [activeTab, setActiveTab] = useState('security');
  const [selectedResident, setSelectedResident] = useState(null);
  const [residentTab, setResidentTab] = useState('appointments');

  const estates = [
    { id: 'E-2001', name: 'Victoria Garden City', manager: 'John Doe', plan: 'Estate Pro', residents: 450, security: 25, status: 'Active' },
    { id: 'E-2002', name: 'Banana Island Estate', manager: 'Jane Smith', plan: 'Estate Enterprise', residents: 1200, security: 40, status: 'Active' },
    { id: 'E-2003', name: 'Lekki Phase 1', manager: 'Mike Johnson', plan: 'Estate Basic', residents: 85, security: 5, status: 'Inactive' },
  ];

  const mockResidents = [
    { id: 'R-001', name: 'Alice Williams', address: 'Block A, Flat 4', phone: '+234 800 123 4567' },
    { id: 'R-002', name: 'David Brown', address: 'Block C, Flat 12', phone: '+234 800 987 6543' },
  ];

  const handleViewEstate = (estate) => {
    navigate(`/admin/estate-managers/${estate.id}`);
  };

  return (
    <div className="admin-page" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Manage Estate Managers</h1>
          <p style={{ color: 'var(--text-secondary)' }}>View and manage all registered estates and their residents.</p>
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
              placeholder="Search estates..." 
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
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>ESTATE ID</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>ESTATE NAME</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>MANAGER</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>PLAN</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>STATUS</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {estates.map((estate) => (
                <tr key={estate.id} style={{ borderBottom: '1px solid var(--border-default)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{estate.id}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                      <Building2 size={16} />
                    </div>
                    {estate.name}
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{estate.manager}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{estate.plan}</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                      background: estate.status === 'Active' ? 'var(--bg-success-subtle)' : 'var(--bg-danger-subtle)',
                      color: estate.status === 'Active' ? 'var(--text-success)' : 'var(--text-danger)'
                    }}>
                      {estate.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                    <button onClick={() => handleViewEstate(estate)} style={{ background: 'transparent', border: 'none', color: '#10b981', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
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

export default ManageEstateManagers;
