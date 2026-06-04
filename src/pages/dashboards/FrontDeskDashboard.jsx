import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, UserCheck, Search, ShieldAlert, ArrowRight, CheckCircle2,
  Clock, Calendar, LogOut, ChevronRight, X
} from 'lucide-react';

const Modal = ({ isOpen, onClose, children, maxWidth = '600px' }) => {
  if (!isOpen) return null;
  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(13, 35, 49, 0.4)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="modal-container" 
        style={{ 
          maxWidth, background: 'var(--bg-surface)', width: '100%', borderRadius: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', position: 'relative',
          maxHeight: '90vh', overflowY: 'auto', padding: '3rem'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: '2rem', right: '2rem',
          background: 'var(--bg-subtle)', border: '1px solid var(--border-default)', borderRadius: '50%',
          width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--text-primary)'
        }}>
          <X size={20} />
        </button>
        {children}
      </motion.div>
    </div>
  );
};

const FrontDeskDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [checkInSuccess, setCheckInSuccess] = useState(false);

  const stats = [
    { label: 'Checked In Today', value: '45', icon: <UserCheck size={20} />, bg: '#e0f2fe', color: '#0369a1' },
    { label: 'Expected Visitors', value: '18', icon: <Calendar size={20} />, bg: '#f3e8ff', color: '#7e22ce' },
    { label: 'Currently On-Site', value: '12', icon: <Users size={20} />, bg: 'var(--bg-success-subtle)', color: 'var(--text-success)' },
  ];

  const recentActivity = [
    { type: 'check-in', visitor: 'David Awolowo', host: 'Alison Ogaga', time: 'Just now' },
    { type: 'check-out', visitor: 'Sarah Johnson', host: 'John Smith', time: '5 mins ago' },
    { type: 'check-in', visitor: 'Michael Chang', host: 'Emily Davis', time: '12 mins ago' },
    { type: 'check-in', visitor: 'Grace Olu', host: 'Victor Salisu', time: '28 mins ago' },
  ];

  return (
    <div className="fd-page">
      <div className="fd-header">
        <div>
          <h1>Front Desk Control</h1>
          <p>Monitor and manage visitor flow efficiently.</p>
        </div>
      </div>

      <div className="fd-main-grid">
        <div className="fd-left-col">
          <div className="fd-search-card">
            <h3>Quick Check-In / Check-Out</h3>
            <p>Scan visitor QR code or enter appointment ID</p>
            <div className="fd-search-box">
              <Search size={20} className="fd-search-icon" />
              <input 
                type="text" 
                placeholder="Enter Appointment Code (e.g. INV-7H2A)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button className="fd-btn-search" onClick={() => setIsCheckInModalOpen(true)}>Verify</button>
            </div>
          </div>

          <div className="fd-stats-grid">
            {stats.map((stat, idx) => (
              <motion.div key={idx} className="fd-stat-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <div className="fd-stat-icon" style={{ background: stat.bg, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="fd-stat-info">
                  <span className="fd-stat-label">{stat.label}</span>
                  <span className="fd-stat-value">{stat.value}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="fd-live-feed">
            <div className="fd-card-header">
              <h3>Live Gate Activity</h3>
              <button className="fd-btn-link">View Full Log <ArrowRight size={14} /></button>
            </div>
            <div className="fd-feed-list">
              {recentActivity.map((act, idx) => (
                <div key={idx} className="fd-feed-item">
                  <div className={`fd-feed-icon ${act.type}`}>
                    {act.type === 'check-in' ? <CheckCircle2 size={16} /> : <LogOut size={16} />}
                  </div>
                  <div className="fd-feed-details">
                    <h4>{act.visitor}</h4>
                    <p>Host: {act.host}</p>
                  </div>
                  <div className="fd-feed-time">
                    <Clock size={14} />
                    <span>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fd-right-col">
          <div className="fd-expected-card">
            <div className="fd-card-header">
              <h3>Expected Shortly</h3>
            </div>
            <div className="fd-expected-list">
              {[
                { name: 'Dr. Jennifer Johnson', time: '11:30 AM', type: 'Medical' },
                { name: 'Mr. James Wilson', time: '12:00 PM', type: 'Business' },
                { name: 'DHL Delivery', time: '12:15 PM', type: 'Delivery' }
              ].map((exp, idx) => (
                <div key={idx} className="fd-expected-item">
                  <div className="fd-exp-info">
                    <h4>{exp.name}</h4>
                    <span className="fd-exp-type">{exp.type}</span>
                  </div>
                  <div className="fd-exp-meta">
                    <span className="fd-exp-time">{exp.time}</span>
                    <ChevronRight size={16} className="fd-text-gray" />
                  </div>
                </div>
              ))}
            </div>
            <button className="fd-btn-outline-full mt-4" onClick={() => setIsCheckInModalOpen(true)}>Check-In Expected Visitor</button>
          </div>
        </div>
      </div>

      {/* Check-In Modal */}
      <AnimatePresence>
        {isCheckInModalOpen && !checkInSuccess && (
          <Modal isOpen={isCheckInModalOpen} onClose={() => setIsCheckInModalOpen(false)}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--bg-brand)', marginBottom: '0.5rem' }}>Visitor Found</h2>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9375rem' }}>Review visitor details and complete check-in.</p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--bg-subtle)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border-default)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), var(--bg-brand))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800' }}>JJ</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--text-primary)', margin: '0 0 4px' }}>Dr. Jennifer Johnson</h3>
                  <p style={{ margin: '0 0 2px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Host: <strong>Alison Ogaga</strong></p>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Purpose: <strong>Medical Appointment</strong> &bull; Time: <strong>11:30 AM</strong></p>
                </div>
                <div style={{ padding: '0.5rem 1rem', background: '#e0f2fe', color: '#0369a1', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700' }}>Valid Appointment</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-primary)', textTransform: 'uppercase' }}>Additional Details / Belongings</label>
                  <textarea placeholder="E.g. 1 Laptop, 1 Handbag" rows={3} style={{ padding: '0.875rem', border: '1.5px solid var(--border-default)', borderRadius: '12px', fontSize: '0.875rem', background: 'transparent', color: 'var(--text-primary)', outline: 'none', resize: 'none' }}></textarea>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-primary)', textTransform: 'uppercase' }}>Car Plate Number (Optional)</label>
                  <input type="text" placeholder="E.g. ABC 123 XY" style={{ padding: '0.875rem', border: '1.5px solid var(--border-default)', borderRadius: '12px', fontSize: '0.875rem', background: 'transparent', color: 'var(--text-primary)', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-primary)', textTransform: 'uppercase' }}>Number of Companions</label>
                  <input type="number" defaultValue={0} min={0} style={{ padding: '0.875rem', border: '1.5px solid var(--border-default)', borderRadius: '12px', fontSize: '0.875rem', background: 'transparent', color: 'var(--text-primary)', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={() => setCheckInSuccess(true)} style={{ background: 'var(--bg-brand)', color: 'var(--text-inverse)', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', flex: 1 }}>Complete Check-In</button>
                <button onClick={() => setIsCheckInModalOpen(false)} style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-default)', padding: '1rem 2rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', flex: 1 }}>Cancel</button>
              </div>
            </div>
          </Modal>
        )}
        
        {checkInSuccess && (
          <Modal isOpen={checkInSuccess} onClose={() => { setCheckInSuccess(false); setIsCheckInModalOpen(false); }}>
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--text-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <CheckCircle2 size={40} color="white" strokeWidth={3} />
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--bg-brand)', marginBottom: '1rem' }}>Check-In Successful!</h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Dr. Jennifer Johnson has been successfully checked in.</p>
              <button onClick={() => { setCheckInSuccess(false); setIsCheckInModalOpen(false); }} style={{ background: 'var(--bg-brand)', color: 'var(--text-inverse)', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', width: '100%' }}>Close</button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <style jsx>{`
        .fd-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .fd-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; }
        .fd-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--bg-brand); margin-bottom: 0.25rem; }
        .fd-header p { color: var(--text-tertiary); font-size: 0.9375rem; }
        
        .fd-btn-alert { background: #fee2e2; color: #dc2626; border: 1px solid #fecaca; padding: 0.75rem 1.25rem; border-radius: 12px; font-weight: 700; font-size: 0.875rem; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; transition: all 0.2s; }
        .fd-btn-alert:hover { background: #fecaca; }

        .fd-main-grid { display: grid; grid-template-columns: 1fr 340px; gap: 1.5rem; }
        .fd-left-col { display: flex; flex-direction: column; gap: 1.5rem; }
        .fd-right-col { display: flex; flex-direction: column; gap: 1.5rem; }

        .fd-search-card { background: linear-gradient(135deg, var(--bg-brand) 0%, var(--bg-brand-hover) 100%); padding: 2rem; border-radius: 24px; color: var(--text-inverse); box-shadow: 0 20px 40px rgba(13, 35, 49, 0.15); }
        .fd-search-card h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-inverse); }
        .fd-search-card p { font-size: 0.875rem; color: var(--text-quaternary); margin-bottom: 1.5rem; }
        .fd-search-box { display: flex; align-items: center; background: var(--bg-surface); padding: 0.5rem; border-radius: 16px; position: relative; }
        .fd-search-icon { position: absolute; left: 1.25rem; color: var(--text-tertiary); }
        .fd-search-box input { flex: 1; border: none; padding: 1rem 1rem 1rem 3rem; border-radius: 12px; font-size: 1rem; font-weight: 600; color: var(--text-primary); background: transparent; outline: none; }
        .fd-search-box input::placeholder { color: var(--text-quaternary); font-weight: 500; }
        .fd-btn-search { background: var(--accent-primary); color: var(--text-inverse); border: none; padding: 0.875rem 2rem; border-radius: 12px; font-weight: 700; font-size: 0.9375rem; cursor: pointer; transition: background 0.2s; }
        .fd-btn-search:hover { background: #0090e6; }

        .fd-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
        .fd-stat-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; display: flex; align-items: center; gap: 1.25rem; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .fd-stat-icon { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .fd-stat-info { display: flex; flex-direction: column; gap: 0.25rem; }
        .fd-stat-label { font-size: 0.8125rem; font-weight: 700; color: var(--text-quaternary); text-transform: uppercase; letter-spacing: 0.05em; }
        .fd-stat-value { font-size: 2rem; font-weight: 800; color: var(--bg-brand); line-height: 1; }

        .fd-live-feed { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 24px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .fd-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .fd-card-header h3 { font-size: 1.125rem; font-weight: 800; color: var(--bg-brand); margin: 0; }
        .fd-btn-link { background: none; border: none; color: var(--accent-primary); font-weight: 700; font-size: 0.875rem; display: flex; align-items: center; gap: 4px; cursor: pointer; }
        
        .fd-feed-list { display: flex; flex-direction: column; gap: 1rem; }
        .fd-feed-item { display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem; background: var(--bg-subtle); border-radius: 16px; border: 1px solid var(--bg-muted); transition: all 0.2s; cursor: pointer; }
        .fd-feed-item:hover { background: var(--bg-surface); border-color: var(--border-default); transform: translateY(-2px); box-shadow: 0 8px 16px rgba(0,0,0,0.04); }
        .fd-feed-icon { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .fd-feed-icon.check-in { background: var(--bg-success-subtle); color: var(--text-success); }
        .fd-feed-icon.check-out { background: #f3f4f6; color: #4b5563; }
        
        .fd-feed-details { flex: 1; }
        .fd-feed-details h4 { font-size: 1rem; font-weight: 700; color: var(--text-primary); margin: 0 0 4px 0; }
        .fd-feed-details p { font-size: 0.8125rem; color: var(--text-tertiary); margin: 0; font-weight: 500; }
        .fd-feed-time { display: flex; align-items: center; gap: 4px; color: var(--text-quaternary); font-size: 0.75rem; font-weight: 600; }

        .fd-expected-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 24px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .fd-expected-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .fd-expected-item { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem; border: 1px solid var(--bg-muted); border-radius: 16px; background: #fcfcfd; cursor: pointer; transition: all 0.2s; }
        .fd-expected-item:hover { border-color: var(--border-default); background: var(--bg-surface); }
        .fd-exp-info h4 { font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin: 0 0 4px 0; }
        .fd-exp-type { font-size: 0.6875rem; padding: 2px 8px; border-radius: 12px; background: var(--bg-muted); color: var(--text-secondary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .fd-exp-meta { display: flex; align-items: center; gap: 0.5rem; }
        .fd-exp-time { font-size: 0.8125rem; font-weight: 600; color: var(--text-tertiary); }
        .fd-text-gray { color: var(--border-heavy); }
        
        .fd-btn-outline-full { width: 100%; background: var(--bg-surface); border: 1.5px solid var(--border-default); padding: 1rem; border-radius: 12px; font-weight: 700; color: var(--bg-brand); cursor: pointer; transition: all 0.2s; margin-top: 1.5rem; }
        .fd-btn-outline-full:hover { background: var(--bg-subtle); border-color: var(--border-heavy); }

        @media (max-width: 1024px) {
          .fd-main-grid { grid-template-columns: 1fr; }
          .fd-search-box { flex-direction: column; background: transparent; padding: 0; gap: 0.75rem; }
          .fd-search-box input { background: var(--bg-surface); width: 100%; }
          .fd-btn-search { width: 100%; }
          .fd-search-icon { z-index: 10; top: 1rem; left: 1rem; transform: none; }
        }
        @media (max-width: 768px) {
          .fd-stats-grid { grid-template-columns: 1fr; }
          .fd-header { flex-direction: column; }
          .fd-btn-alert { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default FrontDeskDashboard;
