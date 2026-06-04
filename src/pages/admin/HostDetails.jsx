import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Users, Calendar, FileText, Activity, CreditCard, ArrowLeft, MoreVertical, Edit2, X, Phone, Mail, ShieldCheck, Clock } from 'lucide-react';

const HostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('officers');
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Mock data for the specific host
  const host = {
    id: id || 'H-1001',
    name: 'TechCorp Industries',
    plan: 'Enterprise',
    status: 'Active',
    joined: 'Jan 15, 2023',
    address: '123 Tech Boulevard, Innovation City',
    contactEmail: 'admin@techcorp.com',
    contactPhone: '+1 800 555 0199'
  };

  const tabs = [
    { id: 'officers', label: 'Frontdesk Officers', icon: <Users size={16} /> },
    { id: 'visitors', label: 'Visitors', icon: <Users size={16} /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar size={16} /> },
    { id: 'transactions', label: 'Transactions', icon: <CreditCard size={16} /> },
    { id: 'invoices', label: 'Invoices', icon: <FileText size={16} /> },
    { id: 'activity', label: 'Activity Log', icon: <Activity size={16} /> },
  ];

  const mockOfficers = [
    { id: 'FO-01', name: 'Sarah Jenkins', email: 'sarah.j@techcorp.com', phone: '+1 234 567 8901', status: 'Active' },
    { id: 'FO-02', name: 'Michael Chang', email: 'm.chang@techcorp.com', phone: '+1 234 567 8902', status: 'Active' },
    { id: 'FO-03', name: 'Jessica Alba', email: 'j.alba@techcorp.com', phone: '+1 234 567 8903', status: 'Inactive' },
  ];

  const mockVisitors = [
    { id: 'V-001', name: 'Alice Cooper', purpose: 'Meeting', date: 'Oct 24, 2023', timeIn: '09:00 AM', timeOut: '11:00 AM', status: 'Checked Out' },
    { id: 'V-002', name: 'Bob Marley', purpose: 'Delivery', date: 'Oct 24, 2023', timeIn: '10:15 AM', timeOut: '-', status: 'Checked In' },
    { id: 'V-003', name: 'Diana Prince', purpose: 'Interview', date: 'Oct 24, 2023', timeIn: '11:30 AM', timeOut: '12:45 PM', status: 'Checked Out' },
  ];

  const mockAppointments = [
    { id: 'A-101', visitor: 'Charlie Puth', host: 'David Guetta', date: 'Oct 25, 2023 14:00', status: 'Scheduled' },
    { id: 'A-102', visitor: 'Dua Lipa', host: 'Calvin Harris', date: 'Oct 26, 2023 10:00', status: 'Pending' },
  ];

  const mockTransactions = [
    { id: 'TXN-901', amount: '₦450,000.00', type: 'Subscription Renewal', date: 'Oct 01, 2023', status: 'Success' },
    { id: 'TXN-902', amount: '₦50,000.00', type: 'Add-on Purchase', date: 'Oct 15, 2023', status: 'Success' },
  ];

  const mockInvoices = [
    { id: 'INV-2023-10', amount: '₦450,000.00', dueDate: 'Nov 01, 2023', status: 'Paid' },
    { id: 'INV-2023-11', amount: '₦450,000.00', dueDate: 'Dec 01, 2023', status: 'Pending' },
  ];

  const mockActivity = [
    { id: 1, action: 'Added new Frontdesk Officer', target: 'Michael Chang', date: 'Oct 20, 2023 14:30' },
    { id: 2, action: 'Updated subscription plan', target: 'Enterprise', date: 'Oct 01, 2023 09:00' },
    { id: 3, action: 'System settings updated', target: 'Security Policies', date: 'Sep 28, 2023 11:15' },
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'officers':
        return (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Officer Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Contact</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'right', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockOfficers.map(officer => (
                  <tr key={officer.id} style={{ borderBottom: '1px solid var(--border-default)', transition: 'background 0.2s', cursor: 'pointer' }} onClick={() => setSelectedOfficer(officer)} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{officer.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{officer.email}<br/>{officer.phone}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, background: officer.status === 'Active' ? 'var(--bg-success-subtle)' : 'var(--bg-danger-subtle)', color: officer.status === 'Active' ? 'var(--text-success)' : 'var(--text-danger)' }}>
                        {officer.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button style={{ background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}><MoreVertical size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'visitors':
        return (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Visitor Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Purpose</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Date & Time</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockVisitors.map(visitor => (
                  <tr key={visitor.id} style={{ borderBottom: '1px solid var(--border-default)', transition: 'background 0.2s', cursor: 'pointer' }} onClick={() => setSelectedVisitor(visitor)} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{visitor.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{visitor.purpose}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{visitor.date}<br/>{visitor.timeIn} - {visitor.timeOut}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, background: visitor.status === 'Checked In' ? 'rgba(0, 144, 230, 0.1)' : 'var(--bg-subtle)', color: visitor.status === 'Checked In' ? 'var(--bg-brand)' : 'var(--text-secondary)' }}>
                        {visitor.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'appointments':
        return (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Visitor</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Host</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Date/Time</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockAppointments.map(appt => (
                  <tr key={appt.id} style={{ borderBottom: '1px solid var(--border-default)', transition: 'background 0.2s', cursor: 'pointer' }} onClick={() => setSelectedAppointment(appt)} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{appt.visitor}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{appt.host}</td>
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
                {mockTransactions.map(txn => (
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
                {mockInvoices.map(inv => (
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
            {mockActivity.map(act => (
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
          onClick={() => navigate('/admin/hosts')}
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--bg-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Building size={32} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{host.name}</h1>
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, background: host.status === 'Active' ? 'var(--bg-success-subtle)' : 'var(--bg-danger-subtle)', color: host.status === 'Active' ? 'var(--text-success)' : 'var(--text-danger)' }}>
                  {host.status}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>ID: {host.id} • {host.plan} Plan • Joined {host.joined}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Edit2 size={16} /> Edit Host
            </button>
            <button style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Host Quick Info Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Address</p>
          <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{host.address}</p>
        </div>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Primary Contact</p>
          <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{host.contactEmail}</p>
        </div>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Phone</p>
          <p style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{host.contactPhone}</p>
        </div>
      </div>

      {/* Detail Tabs Area */}
      <div style={{ background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-default)', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '500px' }}>
        {/* Tab Navigation */}
        <div style={{ display: 'flex', padding: '0 1rem', borderBottom: '1px solid var(--border-default)', background: 'var(--bg-subtle)' }}>
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{ 
                padding: '1.25rem 1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600,
                color: activeTab === tab.id ? 'var(--bg-brand)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab.id ? '2px solid var(--bg-brand)' : '2px solid transparent',
                transition: 'all 0.2s',
                outline: 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, background: 'var(--bg-body)' }}>
          {renderTabContent()}
        </div>
      </div>

      {/* Single Front Desk Officer Slide-over */}
      <AnimatePresence>
        {selectedOfficer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedOfficer(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000 }} 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px', background: 'var(--bg-surface)', zIndex: 1001, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-subtle)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Officer Details</h2>
                <button onClick={() => setSelectedOfficer(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700 }}>
                    {selectedOfficer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)', fontSize: '1.2rem' }}>{selectedOfficer.name}</h3>
                    <p style={{ margin: 0, color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>{selectedOfficer.id}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Status</label>
                    <span style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, background: selectedOfficer.status === 'Active' ? 'var(--bg-success-subtle)' : 'var(--bg-danger-subtle)', color: selectedOfficer.status === 'Active' ? 'var(--text-success)' : 'var(--text-danger)' }}>
                      {selectedOfficer.status}
                    </span>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Email</label>
                    <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16}/> {selectedOfficer.email}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Phone</label>
                    <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16}/> {selectedOfficer.phone}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Permissions</label>
                    <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldCheck size={16}/> Standard Frontdesk Access</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Single Visitor Slide-over */}
      <AnimatePresence>
        {selectedVisitor && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedVisitor(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000 }} 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px', background: 'var(--bg-surface)', zIndex: 1001, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-subtle)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Visitor Details</h2>
                <button onClick={() => setSelectedVisitor(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(0, 144, 230, 0.1)', color: 'var(--bg-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700 }}>
                    {selectedVisitor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)', fontSize: '1.2rem' }}>{selectedVisitor.name}</h3>
                    <p style={{ margin: 0, color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>{selectedVisitor.id}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Status</label>
                    <span style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, background: selectedVisitor.status === 'Checked In' ? 'rgba(0, 144, 230, 0.1)' : 'var(--bg-subtle)', color: selectedVisitor.status === 'Checked In' ? 'var(--bg-brand)' : 'var(--text-secondary)' }}>
                      {selectedVisitor.status}
                    </span>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Purpose</label>
                    <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500 }}>{selectedVisitor.purpose}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Date</label>
                    <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16}/> {selectedVisitor.date}</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Time In</label>
                      <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16}/> {selectedVisitor.timeIn}</p>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Time Out</label>
                      <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16}/> {selectedVisitor.timeOut}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Single Appointment Slide-over */}
      <AnimatePresence>
        {selectedAppointment && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedAppointment(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000 }} 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px', background: 'var(--bg-surface)', zIndex: 1001, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-subtle)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Appointment Details</h2>
                <button onClick={() => setSelectedAppointment(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>Status</span>
                    <span style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, background: selectedAppointment.status === 'Scheduled' ? 'var(--bg-success-subtle)' : 'var(--bg-warning-subtle)', color: selectedAppointment.status === 'Scheduled' ? 'var(--text-success)' : '#f59e0b' }}>
                      {selectedAppointment.status}
                    </span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: '1.5rem' }}>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>Visitor</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--text-secondary)' }}>
                        {selectedAppointment.visitor.charAt(0)}
                      </div>
                      <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 600 }}>{selectedAppointment.visitor}</p>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>Host</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--text-secondary)' }}>
                        {selectedAppointment.host.charAt(0)}
                      </div>
                      <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 600 }}>{selectedAppointment.host}</p>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-default)', paddingTop: '1.5rem' }}>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Date & Time</label>
                    <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16}/> {selectedAppointment.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HostDetails;
