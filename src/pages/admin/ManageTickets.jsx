import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Download, MessageSquare, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';

const ManageTickets = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const tickets = [
    { id: 'TKT-1001', subject: 'Login issue with frontdesk account', user: 'James Smith', role: 'Host', status: 'Open', priority: 'High', date: '2 hours ago' },
    { id: 'TKT-1002', subject: 'How to add a new security officer?', user: 'VGC Admin', role: 'Estate Manager', status: 'Pending', priority: 'Medium', date: '1 day ago' },
    { id: 'TKT-1003', subject: 'Invoice not showing paid', user: 'TechCorp', role: 'Host', status: 'Resolved', priority: 'Low', date: '3 days ago' },
    { id: 'TKT-1004', subject: 'System downtime inquiry', user: 'Alice', role: 'Resident', status: 'Closed', priority: 'Medium', date: '1 week ago' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      case 'Pending': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' };
      case 'Resolved': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' };
      case 'Closed': return { bg: 'var(--bg-subtle)', color: 'var(--text-tertiary)' };
      default: return { bg: 'var(--bg-subtle)', color: 'var(--text-secondary)' };
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="admin-page" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Manage Tickets</h1>
          <p style={{ color: 'var(--text-secondary)' }}>View, respond to, and resolve support tickets from users.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={18} /> Export Data
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {[{ label: 'Total Tickets', val: '1,248', icon: <MessageSquare size={20}/>, c: 'var(--bg-brand)' },
          { label: 'Open', val: '45', icon: <Clock size={20}/>, c: '#ef4444' },
          { label: 'Resolved', val: '1,102', icon: <CheckCircle size={20}/>, c: '#10b981' },
          { label: 'Closed', val: '101', icon: <XCircle size={20}/>, c: 'var(--text-tertiary)' }].map((stat, idx) => (
          <div key={idx} style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${stat.c}15`, color: stat.c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{stat.label}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stat.val}</h3>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search tickets..." 
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
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>TICKET ID</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>SUBJECT</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>REQUESTER</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>PRIORITY</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>STATUS</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>DATE</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((tkt) => {
                const statusStyles = getStatusColor(tkt.status);
                return (
                  <tr key={tkt.id} style={{ borderBottom: '1px solid var(--border-default)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{tkt.id}</td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-primary)', fontWeight: 600 }}>{tkt.subject}</td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>{tkt.user}</div>
                      <div style={{ color: 'var(--text-quaternary)', fontSize: '0.75rem' }}>{tkt.role}</div>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: getPriorityColor(tkt.priority) }} />
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{tkt.priority}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <span style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, background: statusStyles.bg, color: statusStyles.color }}>
                        {tkt.status}
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{tkt.date}</td>
                    <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => navigate(`/admin/tickets/${tkt.id}`)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--bg-brand)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}
                      >
                        <Eye size={16} /> View Ticket
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTickets;
