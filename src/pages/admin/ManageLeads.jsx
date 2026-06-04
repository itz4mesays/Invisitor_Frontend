import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, UserPlus, Mail, Phone, MoreVertical, Edit2, Trash2, X } from 'lucide-react';

const ManageLeads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  
  const [leadsList, setLeadsList] = useState([
    { id: 'LD-001', name: 'Robert Fox', company: 'Prime Real Estate', industry: 'Real Estate', address: '123 Prime Blvd, NY', email: 'robert@prime.com', phone: '+1 234 567 8900', status: 'New', date: 'Today' },
    { id: 'LD-002', name: 'Esther Howard', company: 'TechNova', industry: 'Technology', address: '456 Tech Park, CA', email: 'esther@technova.io', phone: '+1 987 654 3210', status: 'Contacted', date: 'Yesterday' },
    { id: 'LD-003', name: 'Jenny Wilson', company: 'Apex Residences', industry: 'Property Management', address: '789 Apex Way, TX', email: 'jenny.w@apex.com', phone: '+1 555 123 4567', status: 'Converted', date: 'Oct 12, 2023' },
    { id: 'LD-004', name: 'Guy Hawkins', company: 'BuildCo', industry: 'Construction', address: '321 Build Ave, IL', email: 'guy@buildco.com', phone: '+1 444 888 9999', status: 'Lost', date: 'Sep 28, 2023' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this lead? This action cannot be undone.")) {
      setLeadsList(leadsList.filter(lead => lead.id !== id));
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(null);
      }
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'New': return { bg: 'rgba(0, 144, 230, 0.1)', color: 'var(--bg-brand)' };
      case 'Contacted': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' };
      case 'Converted': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' };
      case 'Lost': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      default: return { bg: 'var(--bg-subtle)', color: 'var(--text-secondary)' };
    }
  };

  return (
    <div className="admin-page" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Manage Leads</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track and manage potential client sign-ups and inquiries.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={18} /> Export
          </button>
          <button 
            className="btn btn-primary" 
            onClick={() => setIsAddLeadModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <UserPlus size={18} /> Add Lead
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search leads..." 
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
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>NAME / COMPANY</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>CONTACT INFO</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>STATUS</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>DATE ADDED</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {leadsList.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase())).map((lead) => {
                const statusStyles = getStatusStyle(lead.status);
                return (
                  <tr key={lead.id} style={{ borderBottom: '1px solid var(--border-default)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1.2rem 1.5rem', cursor: 'pointer' }} onClick={() => setSelectedLead(lead)}>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>{lead.name}</div>
                      <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>{lead.company}</div>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                        <Mail size={14} /> {lead.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        <Phone size={14} /> {lead.phone}
                      </div>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem' }}>
                      <span style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, background: statusStyles.bg, color: statusStyles.color }}>
                        {lead.status}
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{lead.date}</td>
                    <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button onClick={() => setSelectedLead(lead)} style={{ background: 'transparent', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }}>
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(lead.id)} style={{ background: 'transparent', border: '1px solid var(--border-default)', color: 'var(--text-danger)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      <AnimatePresence>
        {isAddLeadModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsAddLeadModalOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} 
            />
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
              style={{ position: 'relative', width: '100%', maxWidth: '500px', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-default)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', overflow: 'hidden' }}
            >
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Add New Lead</h2>
                <button onClick={() => setIsAddLeadModalOpen(false)} style={{ background: 'var(--bg-subtle)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={16} />
                </button>
              </div>
              <div style={{ padding: '2rem' }}>
                <form onSubmit={(e) => { e.preventDefault(); setIsAddLeadModalOpen(false); }}>
                  <div style={{ display: 'grid', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
                      <input type="text" placeholder="e.g. John Doe" required style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Company / Business Name</label>
                        <input type="text" placeholder="e.g. Acme Corp" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Industry</label>
                        <input type="text" placeholder="e.g. Real Estate" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Address</label>
                      <input type="text" placeholder="e.g. 123 Main St, City, Country" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address</label>
                        <input type="email" placeholder="john@example.com" required style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }} />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Phone Number</label>
                        <input type="tel" placeholder="+1 234 567 8900" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none' }} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status</label>
                      <select style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-subtle)', color: 'var(--text-primary)', outline: 'none', appearance: 'none' }}>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => setIsAddLeadModalOpen(false)} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Lead</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Single Lead Slide-over */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedLead(null)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 1000 }} 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px', background: 'var(--bg-surface)', zIndex: 1001, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-subtle)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Lead Details</h2>
                <button onClick={() => setSelectedLead(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <X size={20} />
                </button>
              </div>
              <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-brand)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700 }}>
                    {selectedLead.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-primary)', fontSize: '1.2rem' }}>{selectedLead.name}</h3>
                    <p style={{ margin: 0, color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>{selectedLead.company}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Status</label>
                    <span style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, ...getStatusStyle(selectedLead.status) }}>
                      {selectedLead.status}
                    </span>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Email</label>
                    <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500 }}>{selectedLead.email}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Phone</label>
                    <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500 }}>{selectedLead.phone}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Industry</label>
                    <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500 }}>{selectedLead.industry}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Address</label>
                    <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500 }}>{selectedLead.address}</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-quaternary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>Date Added</label>
                    <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 500 }}>{selectedLead.date}</p>
                  </div>
                </div>
              </div>
              <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-default)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--bg-subtle)' }}>
                <button className="btn btn-secondary" onClick={() => setSelectedLead(null)}>Edit Lead</button>
                <button className="btn btn-primary" onClick={() => { handleDelete(selectedLead.id); }} style={{ background: 'var(--bg-danger)', borderColor: 'var(--bg-danger)' }}>Delete</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageLeads;
