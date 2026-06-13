import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, CheckCircle, XCircle, Box, Home } from 'lucide-react';

const ManagePlans = () => {
  const [activeTab, setActiveTab] = useState('private');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  // Mock initial data based on LandingPage.jsx
  const [privatePlans, setPrivatePlans] = useState([
    {
      id: 'p1', name: '30-Day Free Trial', monthlyPrice: 0, tagline: 'Try before you buy',
      visitors: '100/mo', hosts: '5', history: '7 days', notif: 'Email only',
      badge: 'Standard', reporting: 'Basic Overview', accessRules: 'Basic Rules',
      waitingBay: 'Not Included', support: 'Email', color: '#10b981', popular: false, status: 'Active'
    },
    {
      id: 'p2', name: 'Starter Plan', monthlyPrice: 25000, tagline: 'Perfect for small shops & offices',
      visitors: '500/mo', hosts: '20', history: '30 days', notif: 'Email + SMS',
      badge: 'Standard', reporting: 'Exportable Logs', accessRules: 'Auto-Approve',
      waitingBay: 'Included', support: 'Standard', color: 'var(--accent-primary)', popular: true, status: 'Active'
    },
    {
      id: 'p3', name: 'Professional Plan', monthlyPrice: 75000, tagline: 'For scaling businesses',
      visitors: '5,000/mo', hosts: '100', history: '90 days', notif: 'Email, SMS, Push',
      badge: 'Advanced & Custom', reporting: 'Full Analytics', accessRules: 'VIP & Auto-Approve',
      waitingBay: 'Included + Alerts', support: 'Priority', color: '#8b5cf6', popular: false, status: 'Active'
    },
    {
      id: 'p4', name: 'Enterprise Plan', monthlyPrice: 150000, tagline: 'Large-scale operations',
      visitors: 'Unlimited', hosts: 'Unlimited', history: 'Unlimited', notif: 'All + WhatsApp',
      badge: 'White-labeled', reporting: 'Custom Analytics', accessRules: 'Advanced Access',
      waitingBay: 'Custom Flows', support: 'Dedicated Manager', color: 'var(--bg-brand)', popular: false, status: 'Active'
    }
  ]);

  const [estatePlans, setEstatePlans] = useState([
    {
      id: 'e1', name: '30-Day Free Trial', monthlyPrice: 0, tagline: 'Test drive for your estate',
      residents: 'Up to 20', visitors: '200/mo', security: '2 Officers', notifications: 'Email only',
      accessRules: 'Basic Rules', waitingBay: 'Not Included', invoicing: 'Manual',
      reporting: 'Basic Logs', support: 'Email', color: '#10b981', popular: false, status: 'Active'
    },
    {
      id: 'e2', name: 'Estate Basic', monthlyPrice: 50000, tagline: 'Small gated communities',
      residents: 'Up to 100', visitors: '1,000/mo', security: '5 Officers', notifications: 'Email + SMS',
      accessRules: 'Auto-Approve', waitingBay: 'Included', invoicing: 'Automated',
      reporting: 'Standard Logs', support: 'Standard', color: '#10b981', popular: false, status: 'Active'
    },
    {
      id: 'e3', name: 'Estate Pro', monthlyPrice: 120000, tagline: 'Mid-size residential estates',
      residents: 'Up to 500', visitors: '10,000/mo', security: '20 Officers', notifications: 'Email, SMS, Push',
      accessRules: 'VIP List Support', waitingBay: 'Included + Alerts', invoicing: 'Automated & Tracking',
      reporting: 'Advanced Analytics', support: 'Priority', color: 'var(--accent-primary)', popular: true, status: 'Active'
    },
    {
      id: 'e4', name: 'Estate Enterprise', monthlyPrice: 250000, tagline: 'Large estates & compounds',
      residents: 'Unlimited', visitors: 'Unlimited', security: 'Unlimited', notifications: 'All + WhatsApp',
      accessRules: 'Advanced Security', waitingBay: 'Custom Flow', invoicing: 'Custom Workflows',
      reporting: 'Custom Reporting', support: 'Dedicated Manager', color: 'var(--bg-brand)', popular: false, status: 'Active'
    }
  ]);

  const currentPlans = activeTab === 'private' ? privatePlans : estatePlans;
  const filteredPlans = currentPlans.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleToggleStatus = (id) => {
    if (activeTab === 'private') {
      setPrivatePlans(plans => plans.map(p => p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p));
    } else {
      setEstatePlans(plans => plans.map(p => p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p));
    }
  };

  const handleOpenModal = (plan = null) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingPlan(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simplified form handling - in a real app this would collect form data
    const formData = new FormData(e.target);
    const planData = {
      id: editingPlan ? editingPlan.id : `new-${Date.now()}`,
      name: formData.get('name'),
      monthlyPrice: Number(formData.get('monthlyPrice')),
      currency: formData.get('currency') || 'NGN',
      tagline: formData.get('tagline'),
      color: formData.get('color'),
      popular: formData.get('popular') === 'on',
      status: editingPlan ? editingPlan.status : 'Active',
      // Collect other fields based on activeTab...
    };

    if (activeTab === 'private') {
      planData.visitors = formData.get('visitors') || 'N/A';
      planData.hosts = formData.get('hosts') || 'N/A';
      planData.history = formData.get('history') || 'N/A';
      planData.notif = formData.get('notif') || 'N/A';
      planData.badge = formData.get('badge') || 'N/A';
      planData.reporting = formData.get('reporting') || 'N/A';
      planData.accessRules = formData.get('accessRules') || 'N/A';
      planData.waitingBay = formData.get('waitingBay') || 'N/A';
      planData.support = formData.get('support') || 'N/A';
      
      if (editingPlan) {
        setPrivatePlans(plans => plans.map(p => p.id === planData.id ? { ...p, ...planData } : p));
      } else {
        setPrivatePlans([...privatePlans, planData]);
      }
    } else {
      planData.residents = formData.get('residents') || 'N/A';
      planData.visitors = formData.get('visitors') || 'N/A';
      planData.security = formData.get('security') || 'N/A';
      planData.notifications = formData.get('notifications') || 'N/A';
      planData.accessRules = formData.get('accessRules') || 'N/A';
      planData.waitingBay = formData.get('waitingBay') || 'N/A';
      planData.invoicing = formData.get('invoicing') || 'N/A';
      planData.reporting = formData.get('reporting') || 'N/A';
      planData.support = formData.get('support') || 'N/A';
      
      if (editingPlan) {
        setEstatePlans(plans => plans.map(p => p.id === planData.id ? { ...p, ...planData } : p));
      } else {
        setEstatePlans([...estatePlans, planData]);
      }
    }
    handleCloseModal();
  };

  return (
    <div className="admin-page" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Manage Plans</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Create, edit, and manage subscription plans.</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Add New Plan
        </button>
      </div>

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-brand-subtle)', color: 'var(--bg-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Private Plans</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{privatePlans.length}</h3>
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Home size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>Estate Plans</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{estatePlans.length}</h3>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-default)' }}>
        <button
          onClick={() => setActiveTab('private')}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: activeTab === 'private' ? 'var(--bg-brand)' : 'var(--text-tertiary)',
            borderBottom: activeTab === 'private' ? '3px solid var(--bg-brand)' : '3px solid transparent',
            cursor: 'pointer'
          }}
        >
          Private / Public
        </button>
        <button
          onClick={() => setActiveTab('estate')}
          style={{
            background: 'transparent',
            border: 'none',
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: 600,
            color: activeTab === 'estate' ? 'var(--bg-brand)' : 'var(--text-tertiary)',
            borderBottom: activeTab === 'estate' ? '3px solid var(--bg-brand)' : '3px solid transparent',
            cursor: 'pointer'
          }}
        >
          Real Estate
        </button>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search plans..." 
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
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>PLAN NAME</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>MONTHLY PRICE</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>VISITORS</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>POPULAR</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>STATUS</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan.id} style={{ borderBottom: '1px solid var(--border-default)', transition: 'background 0.2s', opacity: plan.status === 'Active' ? 1 : 0.6 }}>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: plan.color }}></div>
                    <div>
                      {plan.name}
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 400 }}>{plan.tagline}</p>
                    </div>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {plan.currency === 'USD' ? '$' : '₦'}{plan.monthlyPrice.toLocaleString()}
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {plan.visitors}
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    {plan.popular ? <span style={{ padding: '0.2rem 0.5rem', background: 'var(--bg-brand)', color: 'white', fontSize: '0.7rem', borderRadius: '4px' }}>POPULAR</span> : '-'}
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                      background: plan.status === 'Active' ? 'var(--bg-success-subtle)' : 'var(--bg-danger-subtle)',
                      color: plan.status === 'Active' ? 'var(--text-success)' : 'var(--text-danger)'
                    }}>
                      {plan.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button onClick={() => handleOpenModal(plan)} style={{ background: 'transparent', border: 'none', color: 'var(--bg-brand)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleToggleStatus(plan.id)} style={{ background: 'transparent', border: 'none', color: plan.status === 'Active' ? 'var(--text-danger)' : 'var(--text-success)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }}>
                        {plan.status === 'Active' ? <XCircle size={16} /> : <CheckCircle size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={handleCloseModal}></div>
          <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: '16px', zIndex: 1001, width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{editingPlan ? 'Edit Plan' : 'Add New Plan'} ({activeTab === 'private' ? 'Private' : 'Estate'})</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label>Plan Name</label>
                  <input type="text" name="name" defaultValue={editingPlan?.name || ''} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.5rem' }}>
                  <div className="form-group">
                    <label>Currency</label>
                    <select name="currency" defaultValue={editingPlan?.currency || 'NGN'} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
                      <option value="NGN">NGN (₦)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Monthly Price</label>
                    <input type="number" name="monthlyPrice" defaultValue={editingPlan?.monthlyPrice || 0} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                  </div>
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <label>Tagline</label>
                  <input type="text" name="tagline" defaultValue={editingPlan?.tagline || ''} required style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                </div>
                <div className="form-group">
                  <label>Brand Color</label>
                  <input type="color" name="color" defaultValue={editingPlan?.color || '#0090E6'} style={{ width: '100%', padding: '0.2rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                </div>
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
                  <input type="checkbox" name="popular" id="popular" defaultChecked={editingPlan?.popular || false} />
                  <label htmlFor="popular" style={{ margin: 0 }}>Mark as Most Popular</label>
                </div>

                {/* Shared Feature Fields */}
                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                  <h3 style={{ fontSize: '1rem', marginTop: '1rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Features & Allowances</h3>
                  <hr style={{ border: 'none', borderBottom: '1px solid var(--border-default)', marginBottom: '1rem' }} />
                </div>

                {activeTab === 'private' ? (
                  <>
                    <div className="form-group">
                      <label>Visitors Limit</label>
                      <input type="text" name="visitors" defaultValue={editingPlan?.visitors || ''} placeholder="e.g., 500/mo" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Hosts Limit</label>
                      <input type="text" name="hosts" defaultValue={editingPlan?.hosts || ''} placeholder="e.g., 20" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Visit History</label>
                      <input type="text" name="history" defaultValue={editingPlan?.history || ''} placeholder="e.g., 30 days" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Notifications</label>
                      <input type="text" name="notif" defaultValue={editingPlan?.notif || ''} placeholder="e.g., Email + SMS" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Visitor Badges</label>
                      <input type="text" name="badge" defaultValue={editingPlan?.badge || ''} placeholder="e.g., Standard" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Reporting</label>
                      <input type="text" name="reporting" defaultValue={editingPlan?.reporting || ''} placeholder="e.g., Exportable Logs" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Access Rules</label>
                      <input type="text" name="accessRules" defaultValue={editingPlan?.accessRules || ''} placeholder="e.g., Auto-Approve" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Waiting Bay</label>
                      <input type="text" name="waitingBay" defaultValue={editingPlan?.waitingBay || ''} placeholder="e.g., Included" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Support</label>
                      <input type="text" name="support" defaultValue={editingPlan?.support || ''} placeholder="e.g., Standard" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label>Total Residents</label>
                      <input type="text" name="residents" defaultValue={editingPlan?.residents || ''} placeholder="e.g., Up to 100" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Monthly Visitors</label>
                      <input type="text" name="visitors" defaultValue={editingPlan?.visitors || ''} placeholder="e.g., 1,000/mo" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Security Officers</label>
                      <input type="text" name="security" defaultValue={editingPlan?.security || ''} placeholder="e.g., 5 Officers" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Notifications</label>
                      <input type="text" name="notifications" defaultValue={editingPlan?.notifications || ''} placeholder="e.g., Email + SMS" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Access Rules</label>
                      <input type="text" name="accessRules" defaultValue={editingPlan?.accessRules || ''} placeholder="e.g., Auto-Approve" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Waiting Bay</label>
                      <input type="text" name="waitingBay" defaultValue={editingPlan?.waitingBay || ''} placeholder="e.g., Included" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Auto Invoicing</label>
                      <input type="text" name="invoicing" defaultValue={editingPlan?.invoicing || ''} placeholder="e.g., Automated" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Reporting</label>
                      <input type="text" name="reporting" defaultValue={editingPlan?.reporting || ''} placeholder="e.g., Standard Logs" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                    <div className="form-group">
                      <label>Support</label>
                      <input type="text" name="support" defaultValue={editingPlan?.support || ''} placeholder="e.g., Standard" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-default)' }} />
                    </div>
                  </>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" onClick={handleCloseModal} style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border-default)', background: 'transparent', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Plan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePlans;
