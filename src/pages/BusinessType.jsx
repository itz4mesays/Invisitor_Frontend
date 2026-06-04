import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Building2, Check } from 'lucide-react';

const BusinessType = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

  const steps = [
    { id: 1, label: 'Business Type', active: true },
    { id: 2, label: 'Business Information', active: false },
    { id: 3, label: 'Contact Information', active: false },
    { id: 4, label: 'Payment', active: false },
  ];

  return (
    <div className="card" style={{ maxWidth: '800px', padding: '3rem' }}>
      <h1 className="card-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Sign Up</h1>
      <p className="card-subtitle" style={{ color: 'var(--text-tertiary)', marginBottom: '2.5rem' }}>
        InVisitor is catered to businesses of all kinds.
      </p>

      {/* Modern Stepper */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        position: 'relative',
        marginBottom: '3.5rem',
        padding: '0 1rem'
      }}>
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          left: '10%', 
          right: '10%', 
          height: '2px', 
          background: 'var(--border-default)', 
          zIndex: 0 
        }} />
        {steps.map((step, index) => (
          <div key={step.id} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '0.75rem', 
            zIndex: 1,
            width: '20%'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: step.active ? 'var(--bg-brand)' : 'var(--bg-muted)',
              border: step.active ? '2px solid var(--bg-brand)' : '2px solid var(--border-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: step.active ? 'white' : 'var(--text-quaternary)',
              fontSize: '0.9rem',
              fontWeight: 700,
              transition: 'all 0.3s ease'
            }}>
              {step.active ? <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} /> : step.id}
            </div>
            <span style={{ 
              fontSize: '0.7rem', 
              color: step.active ? 'var(--bg-brand)' : 'var(--text-quaternary)',
              fontWeight: 600,
              textAlign: 'center',
              lineHeight: 1.2
            }}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', fontWeight: 700, marginBottom: '2.5rem', color: 'var(--bg-brand)' }}>Select Business Type</p>

      <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginBottom: '3.5rem' }}>
        {/* Individual Option */}
        <div 
          onClick={() => setSelectedType('individual')}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            cursor: 'pointer',
            flex: 1
          }}
        >
          <div style={{ 
            width: '140px', 
            height: '140px', 
            borderRadius: '50%', 
            background: '#ffb347',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            border: selectedType === 'individual' ? '4px solid var(--bg-brand)' : 'none',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
             <User size={80} color="white" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--bg-brand)' }}>Private/Public</span>
            <div style={{ 
              width: '18px', 
              height: '18px', 
              borderRadius: '50%', 
              border: '2px solid var(--border-heavy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: selectedType === 'individual' ? 'var(--bg-brand)' : 'transparent'
            }}>
              {selectedType === 'individual' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />}
            </div>
          </div>
        </div>

        {/* Business Option */}
        <div 
          onClick={() => setSelectedType('business')}
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            cursor: 'pointer',
            flex: 1
          }}
        >
          <div style={{ 
            width: '140px', 
            height: '140px', 
            borderRadius: '50%', 
            background: '#0FB3FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            border: selectedType === 'business' ? '4px solid var(--bg-brand)' : 'none',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
             <Building2 size={80} color="white" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--bg-brand)' }}>Real Estate</span>
            <div style={{ 
              width: '18px', 
              height: '18px', 
              borderRadius: '50%', 
              border: '2px solid var(--border-heavy)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: selectedType === 'business' ? 'var(--bg-brand)' : 'transparent'
            }}>
              {selectedType === 'business' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white' }} />}
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate('/register')} 
        className="btn" 
        style={{ 
          width: '100%', 
          padding: '1.25rem', 
          background: selectedType ? 'var(--bg-brand)' : 'var(--border-heavy)',
          color: 'white',
          fontWeight: 700,
          borderRadius: '12px',
          cursor: selectedType ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease'
        }}
        disabled={!selectedType}
      >
        Proceed
      </button>
    </div>
  );
};

export default BusinessType;
