import React, { useState } from 'react';
import { Search, Plus, Edit2, FileText, Settings, Copy, Trash2, CheckCircle } from 'lucide-react';

const ManageForms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [forms, setForms] = useState([
    { id: 'FRM-001', name: 'Host Onboarding Form', type: 'Registration', fields: 12, lastUpdated: 'Oct 15, 2023', status: 'Active' },
    { id: 'FRM-002', name: 'Estate Manager Onboarding', type: 'Registration', fields: 15, lastUpdated: 'Oct 12, 2023', status: 'Active' },
    { id: 'FRM-003', name: 'Payment Configuration Form', type: 'Billing', fields: 5, lastUpdated: 'Sep 30, 2023', status: 'Active' },
    { id: 'FRM-004', name: 'Visitor Pre-registration', type: 'User Input', fields: 8, lastUpdated: 'Aug 22, 2023', status: 'Draft' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this form? This action cannot be undone.")) {
      setForms(forms.filter(form => form.id !== id));
    }
  };

  return (
    <div className="admin-page" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Manage Forms</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Configure onboarding, payment, and data collection forms.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={18} /> Create New Form
        </button>
      </div>

      <div style={{ background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-default)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-default)' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
            <input 
              type="text" 
              placeholder="Search forms..." 
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
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>FORM NAME</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>TYPE</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>FIELDS</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>STATUS</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>LAST UPDATED</th>
                <th style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form.id} style={{ borderBottom: '1px solid var(--border-default)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-subtle)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--bg-brand-hover)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText size={18} />
                      </div>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>{form.name}</div>
                    </div>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{form.type}</td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{form.fields} fields</td>
                  <td style={{ padding: '1.2rem 1.5rem' }}>
                    <span style={{ 
                      padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600, 
                      background: form.status === 'Active' ? 'var(--bg-success-subtle)' : 'var(--bg-subtle)', 
                      color: form.status === 'Active' ? 'var(--text-success)' : 'var(--text-secondary)' 
                    }}>
                      {form.status === 'Active' && <CheckCircle size={10} style={{ display: 'inline', marginRight: '4px' }}/>}
                      {form.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.2rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{form.lastUpdated}</td>
                  <td style={{ padding: '1.2rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button style={{ background: 'transparent', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }} title="Edit Form">
                        <Edit2 size={16} />
                      </button>
                      <button style={{ background: 'transparent', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }} title="Form Settings">
                        <Settings size={16} />
                      </button>
                      <button style={{ background: 'transparent', border: '1px solid var(--border-default)', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }} title="Duplicate">
                        <Copy size={16} />
                      </button>
                      <button onClick={() => handleDelete(form.id)} style={{ background: 'transparent', border: '1px solid var(--border-default)', color: 'var(--text-danger)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px' }} title="Delete">
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
    </div>
  );
};

export default ManageForms;
