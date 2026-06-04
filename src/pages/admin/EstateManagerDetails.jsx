import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, Users, ShieldCheck, Calendar, Activity, CreditCard, FileText, ArrowLeft, MoreVertical, Edit2 } from 'lucide-react';

const EstateManagerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('security');
  const [selectedResident, setSelectedResident] = useState(null);
  const [residentTab, setResidentTab] = useState('appointments');

  const estate = {
    id: id || 'E-2001',
    name: 'Victoria Garden City',
    manager: 'John Doe',
    plan: 'Estate Pro',
    status: 'Active',
    residentsCount: 450,
    securityCount: 25,
    joined: 'Feb 10, 2023',
    address: 'Lekki-Epe Expressway, Lagos',
    contactEmail: 'vgc@estates.com',
    contactPhone: '+234 800 111 2222'
  };

  const mockResidents = [
    { id: 'R-001', name: 'Alice Williams', address: 'Block A, Flat 4', phone: '+234 800 123 4567', status: 'Active' },
    { id: 'R-002', name: 'David Brown', address: 'Block C, Flat 12', phone: '+234 800 987 6543', status: 'Active' },
    { id: 'R-003', name: 'Sarah Connor', address: 'Block B, Flat 1', phone: '+234 800 555 4444', status: 'Inactive' },
  ];

  const estateTabs = [
    { id: 'security', label: 'Security Information', icon: <ShieldCheck size={16} /> },
    { id: 'residents', label: 'Residents Directory', icon: <Users size={16} /> },
  ];

  const residentTabs = [
    { id: 'appointments', label: 'Appointments', icon: <Calendar size={16} /> },
    { id: 'activity', label: 'Activity Log', icon: <Activity size={16} /> },
    { id: 'transactions', label: 'Transactions', icon: <CreditCard size={16} /> },
    { id: 'invoices', label: 'Invoices', icon: <FileText size={16} /> },
  ];

  const mockSecurity = [
    { id: 'SEC-01', name: 'James Gordon', shift: 'Morning', phone: '+234 800 111 2233', status: 'Active' },
    { id: 'SEC-02', name: 'Harvey Bullock', shift: 'Night', phone: '+234 800 111 2244', status: 'Active' },
  ];

  const mockResidentAppointments = [
    { id: 'A-201', visitor: 'Bruce Wayne', date: 'Oct 25, 2023 14:00', status: 'Scheduled' },
    { id: 'A-202', visitor: 'Clark Kent', date: 'Oct 26, 2023 10:00', status: 'Pending' },
  ];

  const mockResidentTransactions = [
    { id: 'TXN-801', amount: '$150.00', type: 'Service Charge', date: 'Oct 01, 2023', status: 'Success' },
  ];

  const mockResidentInvoices = [
    { id: 'INV-RES-10', amount: '$150.00', dueDate: 'Nov 01, 2023', status: 'Paid' },
  ];

  const mockResidentActivity = [
    { id: 1, action: 'Checked in visitor', target: 'Bruce Wayne', date: 'Oct 20, 2023 14:30' },
    { id: 2, action: 'Paid invoice', target: 'INV-RES-09', date: 'Oct 01, 2023 09:00' },
  ];

  const renderTabContent = () => {
    if (!selectedResident) {
      if (activeTab === 'security') {
        return (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Officer Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Shift</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Contact</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockSecurity.map(sec => (
                  <tr key={sec.id} style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{sec.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{sec.shift}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{sec.phone}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, background: sec.status === 'Active' ? 'var(--bg-success-subtle)' : 'var(--bg-danger-subtle)', color: sec.status === 'Active' ? 'var(--text-success)' : 'var(--text-danger)' }}>
                        {sec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      return null;
    }

    switch(residentTab) {
      case 'appointments':
        return (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Visitor</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Date/Time</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockResidentAppointments.map(appt => (
                  <tr key={appt.id} style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{appt.visitor}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{appt.date}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, background: appt.status === 'Scheduled' ? 'var(--bg-success-subtle)' : 'var(--bg-warning-subtle)', color: appt.status === 'Scheduled' ? 'var(--text-success)' : '#f59e0b' }}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'transactions':
        return (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Transaction ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Type</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Amount</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockResidentTransactions.map(txn => (
                  <tr key={txn.id} style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{txn.id}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{txn.type}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 700 }}>{txn.amount}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{txn.date}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, background: 'var(--bg-success-subtle)', color: 'var(--text-success)' }}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'invoices':
        return (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Invoice #</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Amount</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Due Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockResidentInvoices.map(inv => (
                  <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-default)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{inv.id}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 700 }}>{inv.amount}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{inv.dueDate}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, background: inv.status === 'Paid' ? 'var(--bg-success-subtle)' : 'var(--bg-warning-subtle)', color: inv.status === 'Paid' ? 'var(--text-success)' : '#f59e0b' }}>
                        {inv.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button style={{ background: 'transparent', border: '1px solid var(--border-default)', padding: '0.25rem 0.75rem', borderRadius: '4px', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'activity':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mockResidentActivity.map(act => (
              <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-default)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
                  <Activity size={16} />
                </div>
                <div>
                  <p style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {act.action} <span style={{ fontWeight: 700 }}>{act.target}</span>
                  </p>
                  <p style={{ margin: 0, color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>{act.date}</p>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-page" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      {/* Header & Back Navigation */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('/admin/estate-managers')}
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Building2 size={32} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{estate.name}</h1>
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, background: estate.status === 'Active' ? 'var(--bg-success-subtle)' : 'var(--bg-danger-subtle)', color: estate.status === 'Active' ? 'var(--text-success)' : 'var(--text-danger)' }}>
                  {estate.status}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>ID: {estate.id} • Managed by {estate.manager}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Edit2 size={16} /> Edit Estate
            </button>
            <button style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={20}/></div>
          <div><p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Residents</p><p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>{estate.residentsCount}</p></div>
        </div>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={20}/></div>
          <div><p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>Security Staff</p><p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>{estate.securityCount}</p></div>
        </div>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', gridColumn: 'span 2' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Contact Info</p>
          <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{estate.contactEmail} • {estate.contactPhone}</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-default)', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '500px' }}>
        
        {/* Breadcrumb if looking at resident */}
        {selectedResident && (
          <div style={{ padding: '1rem 1.5rem', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <button onClick={() => setSelectedResident(null)} style={{ background: 'none', border: 'none', color: '#10b981', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ArrowLeft size={14} /> Back to Estate
            </button>
            <span style={{ color: 'var(--text-quaternary)' }}>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{selectedResident.name} ({selectedResident.address})</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{ display: 'flex', padding: '0 1rem', borderBottom: '1px solid var(--border-default)', background: 'var(--bg-subtle)' }}>
          {selectedResident ? residentTabs.map(tab => (
            <button 
              key={tab.id} onClick={() => setResidentTab(tab.id)}
              style={{ 
                padding: '1.25rem 1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600,
                color: residentTab === tab.id ? '#10b981' : 'var(--text-secondary)',
                borderBottom: residentTab === tab.id ? '2px solid #10b981' : '2px solid transparent',
                transition: 'all 0.2s', outline: 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          )) : estateTabs.map(tab => (
            <button 
              key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ 
                padding: '1.25rem 1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600,
                color: activeTab === tab.id ? '#10b981' : 'var(--text-secondary)',
                borderBottom: activeTab === tab.id ? '2px solid #10b981' : '2px solid transparent',
                transition: 'all 0.2s', outline: 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ padding: '2rem', flex: 1, background: 'var(--bg-body)' }}>
          {!selectedResident && activeTab === 'residents' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {mockResidents.map(res => (
                <div key={res.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-default)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem' }}>
                      {res.name.charAt(0)}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: 'var(--text-primary)', fontSize: '1.05rem', marginBottom: '0.25rem' }}>{res.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{res.address}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedResident(res)} className="btn btn-secondary" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                    Manage
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {((!selectedResident && activeTab !== 'residents') || selectedResident) && (
            <div style={{ width: '100%' }}>
              {renderTabContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstateManagerDetails;
