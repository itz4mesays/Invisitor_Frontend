import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, XCircle, Send, MoreVertical, Paperclip } from 'lucide-react';

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [ticketStatus, setTicketStatus] = useState('Open');
  const [replyText, setReplyText] = useState('');
  
  const ticket = {
    id: id || 'TKT-1001',
    subject: 'Login issue with frontdesk account',
    priority: 'High',
    status: ticketStatus,
    createdAt: '2 hours ago',
    user: {
      name: 'James Smith',
      role: 'Host',
      email: 'james@techcorp.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James'
    }
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'user',
      name: ticket.user.name,
      avatar: ticket.user.avatar,
      time: '2 hours ago',
      content: 'Hello, my new frontdesk officer is unable to log in to the dashboard. It keeps saying invalid credentials even though we just reset the password. Can you please help?'
    }
  ]);

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      sender: 'admin',
      name: 'Admin Support',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
      time: 'Just now',
      content: replyText
    };
    
    setMessages([...messages, newMsg]);
    setReplyText('');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      case 'Pending': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' };
      case 'Resolved': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' };
      case 'Closed': return { bg: 'var(--bg-subtle)', color: 'var(--text-tertiary)' };
      default: return { bg: 'var(--bg-subtle)', color: 'var(--text-secondary)' };
    }
  };

  const statusStyles = getStatusColor(ticket.status);

  return (
    <div className="admin-page" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      {/* Header & Back Navigation */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('/admin/tickets')}
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{ticket.subject}</h1>
              <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, background: statusStyles.bg, color: statusStyles.color }}>
                {ticket.status}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Ticket #{ticket.id} • Priority: <span style={{ color: ticket.priority === 'High' ? '#ef4444' : 'inherit' }}>{ticket.priority}</span> • Opened {ticket.createdAt}</p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {ticket.status !== 'Resolved' && (
              <button onClick={() => setTicketStatus('Resolved')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)', fontWeight: 600, cursor: 'pointer' }}>
                <CheckCircle size={18} /> Mark as Resolved
              </button>
            )}
            {ticket.status !== 'Closed' && (
              <button onClick={() => setTicketStatus('Closed')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', borderRadius: '8px', background: 'var(--bg-surface)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', fontWeight: 600, cursor: 'pointer' }}>
                <XCircle size={18} /> Close Ticket
              </button>
            )}
            <button style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        {/* Chat / Reply Thread */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '600px', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
          
          {/* Message List */}
          <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'var(--bg-body)' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', gap: '1rem', flexDirection: msg.sender === 'admin' ? 'row-reverse' : 'row' }}>
                <img src={msg.avatar} alt="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-subtle)' }} />
                <div style={{ maxWidth: '75%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexDirection: msg.sender === 'admin' ? 'row-reverse' : 'row' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{msg.name}</span>
                    <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>{msg.time}</span>
                  </div>
                  <div style={{ 
                    padding: '1rem', 
                    borderRadius: '12px', 
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    background: msg.sender === 'admin' ? 'var(--bg-brand)' : 'var(--bg-surface)',
                    color: msg.sender === 'admin' ? 'white' : 'var(--text-primary)',
                    border: msg.sender === 'admin' ? 'none' : '1px solid var(--border-default)',
                    borderTopRightRadius: msg.sender === 'admin' ? 0 : '12px',
                    borderTopLeftRadius: msg.sender === 'user' ? 0 : '12px',
                  }}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reply Box */}
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-default)', background: 'var(--bg-surface)' }}>
            {ticket.status === 'Closed' ? (
              <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-tertiary)' }}>
                This ticket is closed. You cannot reply to a closed ticket.
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <textarea 
                    placeholder="Type your reply here..." 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    style={{ 
                      width: '100%', 
                      minHeight: '80px', 
                      padding: '1rem', 
                      borderRadius: '12px', 
                      border: '1px solid var(--border-default)', 
                      background: 'var(--bg-subtle)', 
                      color: 'var(--text-primary)', 
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                  <button style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'transparent', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}>
                    <Paperclip size={20} />
                  </button>
                </div>
                <button 
                  onClick={handleSendReply}
                  style={{ 
                    width: '48px', height: '48px', borderRadius: '12px', 
                    background: 'var(--bg-brand)', color: 'white', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    border: 'none', cursor: 'pointer',
                    opacity: replyText.trim() ? 1 : 0.5
                  }}
                >
                  <Send size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Requester Info Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Requester</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <img src={ticket.user.avatar} alt="avatar" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-subtle)' }} />
              <div>
                <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>{ticket.user.name}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{ticket.user.role}</p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Email</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{ticket.user.email}</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Total Tickets</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>4 (2 Open)</p>
              </div>
            </div>
          </div>
          
          <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Ticket Properties</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Assignee</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="admin" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                  You
                </div>
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Department</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Technical Support</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Last Updated</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>10 mins ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
