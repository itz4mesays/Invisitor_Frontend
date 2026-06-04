import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, QrCode, MapPin, Navigation, User, ChevronRight, X
} from 'lucide-react';

const VisitorDashboard = () => {
  const [selectedPass, setSelectedPass] = useState(null);

  const activePasses = [
    { id: '1', code: 'INV-7H2A', host: 'Alison Ogaga', location: '123 Enterprise Way, Tech City', date: 'Today', time: '09:00 AM', status: 'Active', validUntil: 'Today, 6:00 PM' }
  ];

  const pastVisits = [
    { host: 'John Smith', date: 'Oct 12, 2024', time: '10:00 AM' },
    { host: 'Emily Davis', date: 'Sep 28, 2024', time: '02:30 PM' }
  ];

  return (
    <div className="vis-page">
      <div className="vis-header">
        <h1>Welcome, David</h1>
        <p>Manage your entry passes and upcoming visits.</p>
      </div>

      <div className="vis-active-section">
        <h3 className="vis-section-title">Active Passes</h3>
        {activePasses.length > 0 ? (
          <div className="vis-pass-grid">
            {activePasses.map((pass, i) => (
              <motion.div 
                key={i} 
                className="vis-pass-card"
                onClick={() => setSelectedPass(pass)}
                whileHover={{ y: -4 }}
              >
                <div className="vis-pass-header">
                  <div className="vis-pass-status">{pass.status}</div>
                  <span className="vis-pass-code">{pass.code}</span>
                </div>
                <div className="vis-pass-body">
                  <div className="vis-qr-thumb">
                    <QrCode size={40} color="var(--bg-brand)" />
                  </div>
                  <div className="vis-pass-details">
                    <h4>Visiting {pass.host}</h4>
                    <p><Calendar size={14} /> {pass.date} at {pass.time}</p>
                    <p><MapPin size={14} /> {pass.location}</p>
                  </div>
                </div>
                <div className="vis-pass-footer">
                  <span>Valid until {pass.validUntil}</span>
                  <ChevronRight size={18} />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="vis-empty-state">
            <QrCode size={48} className="vis-text-light" />
            <p>You have no active entry passes.</p>
          </div>
        )}
      </div>

      <div className="vis-main-grid">
        <div className="vis-history-card">
          <h3 className="vis-section-title">Past Visits</h3>
          <div className="vis-history-list">
            {pastVisits.map((visit, i) => (
              <div key={i} className="vis-history-item">
                <div className="vis-hist-icon"><User size={18} /></div>
                <div className="vis-hist-info">
                  <h4>{visit.host}</h4>
                  <p>{visit.date} • {visit.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="vis-btn-outline-full">View Full History</button>
        </div>

        <div className="vis-info-card">
          <h3 className="vis-section-title">Visitor Information</h3>
          <div className="vis-info-box">
            <h4>Check-in Process</h4>
            <ol>
              <li>Present your QR code at the main gate.</li>
              <li>Wait for security to scan and verify.</li>
              <li>Proceed to the designated visitor parking.</li>
            </ol>
          </div>
          <button className="vis-btn-primary-full">
            <Navigation size={18} /> Get Directions
          </button>
        </div>
      </div>

      {/* QR Modal */}
      <AnimatePresence>
        {selectedPass && (
          <div className="vis-modal-overlay" onClick={() => setSelectedPass(null)}>
            <motion.div 
              className="vis-modal" 
              onClick={e => e.stopPropagation()} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 20 }}
            >
              <button className="vis-modal-close" onClick={() => setSelectedPass(null)}><X size={20} /></button>
              
              <div className="vis-modal-header">
                <h2>Your Entry Pass</h2>
                <span className="vis-status-pill">{selectedPass.status.toUpperCase()}</span>
              </div>

              <div className="vis-qr-section">
                <div className="vis-qr-box">
                  <QrCode size={180} color="var(--bg-brand)" />
                </div>
                <div className="vis-code-display">
                  <p>ENTRY CODE</p>
                  <h3>{selectedPass.code}</h3>
                </div>
                <p className="vis-qr-instruction">Present this code at the security gate for scanning.</p>
              </div>

              <div className="vis-details-grid">
                <div className="vis-detail-item">
                  <span>Host</span>
                  <strong>{selectedPass.host}</strong>
                </div>
                <div className="vis-detail-item">
                  <span>Valid Until</span>
                  <strong>{selectedPass.validUntil}</strong>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .vis-page { display: flex; flex-direction: column; gap: 2rem; padding-bottom: 3rem; max-width: 1000px; margin: 0 auto; width: 100%; }
        .vis-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--bg-brand); margin-bottom: 0.5rem; }
        .vis-header p { color: var(--text-tertiary); font-size: 1rem; }
        
        .vis-section-title { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.25rem; }
        
        .vis-pass-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
        .vis-pass-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 24px; overflow: hidden; cursor: pointer; box-shadow: 0 10px 25px rgba(0,0,0,0.05); transition: box-shadow 0.2s; }
        .vis-pass-card:hover { box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
        .vis-pass-header { background: var(--bg-brand); padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; color: var(--text-inverse); }
        .vis-pass-status { background: rgba(34, 197, 94, 0.2); color: #4ade80; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
        .vis-pass-code { font-weight: 800; letter-spacing: 1px; }
        
        .vis-pass-body { padding: 1.5rem; display: flex; gap: 1.25rem; align-items: center; border-bottom: 1px solid var(--bg-muted); }
        .vis-qr-thumb { background: var(--bg-subtle); padding: 1rem; border-radius: 16px; border: 1px solid var(--border-default); display: flex; align-items: center; justify-content: center; }
        .vis-pass-details h4 { font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.5rem 0; }
        .vis-pass-details p { font-size: 0.8125rem; color: var(--text-tertiary); margin: 0 0 0.375rem 0; display: flex; align-items: center; gap: 0.5rem; font-weight: 500; }
        
        .vis-pass-footer { padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; background: #fcfcfd; font-size: 0.8125rem; font-weight: 600; color: var(--text-tertiary); }
        
        .vis-empty-state { background: var(--bg-surface); border: 1px dashed var(--border-heavy); border-radius: 24px; padding: 4rem 2rem; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-quaternary); font-weight: 600; gap: 1rem; }
        .vis-text-light { color: var(--border-heavy); }

        .vis-main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .vis-history-card, .vis-info-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 24px; padding: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        
        .vis-history-list { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
        .vis-history-item { display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 1px solid var(--bg-muted); border-radius: 16px; background: #fcfcfd; }
        .vis-hist-icon { width: 40px; height: 40px; background: var(--bg-muted); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); }
        .vis-hist-info h4 { font-size: 0.9375rem; font-weight: 700; color: var(--text-primary); margin: 0 0 2px 0; }
        .vis-hist-info p { font-size: 0.75rem; color: var(--text-quaternary); margin: 0; font-weight: 500; }
        
        .vis-btn-outline-full { width: 100%; background: var(--bg-surface); border: 1.5px solid var(--border-default); padding: 0.875rem; border-radius: 12px; font-weight: 700; color: var(--bg-brand); cursor: pointer; transition: all 0.2s; }
        .vis-btn-outline-full:hover { background: var(--bg-subtle); border-color: var(--border-heavy); }
        .vis-btn-primary-full { width: 100%; background: var(--accent-primary); border: none; padding: 0.875rem; border-radius: 12px; font-weight: 700; color: var(--text-inverse); cursor: pointer; transition: background 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 1.5rem; }
        .vis-btn-primary-full:hover { background: #0090e6; }

        .vis-info-box { background: var(--bg-subtle); padding: 1.25rem; border-radius: 16px; border: 1px solid var(--border-default); }
        .vis-info-box h4 { font-size: 0.875rem; font-weight: 800; color: var(--text-primary); margin: 0 0 0.75rem 0; }
        .vis-info-box ol { margin: 0; padding-left: 1.25rem; color: var(--text-secondary); font-size: 0.8125rem; line-height: 1.6; }
        .vis-info-box li { margin-bottom: 0.5rem; }
        .vis-info-box li:last-child { margin-bottom: 0; }

        /* Modal */
        .vis-modal-overlay { position: fixed; inset: 0; background: rgba(13, 35, 49, 0.4); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; }
        .vis-modal { background: var(--bg-surface); border-radius: 32px; padding: 2rem; max-width: 400px; width: 100%; position: relative; box-shadow: 0 25px 50px rgba(0,0,0,0.15); }
        .vis-modal-close { position: absolute; top: 1.25rem; right: 1.25rem; background: var(--bg-muted); border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-secondary); transition: background 0.2s; }
        .vis-modal-close:hover { background: var(--border-default); }
        
        .vis-modal-header { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; margin-bottom: 2rem; }
        .vis-modal-header h2 { font-size: 1.25rem; font-weight: 800; color: var(--bg-brand); margin: 0; }
        .vis-status-pill { background: var(--bg-success-subtle); color: var(--text-success); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
        
        .vis-qr-section { background: var(--bg-subtle); border: 1px solid var(--border-default); border-radius: 24px; padding: 2rem; display: flex; flex-direction: column; align-items: center; margin-bottom: 1.5rem; text-align: center; }
        .vis-qr-box { background: var(--bg-surface); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--border-default); display: inline-block; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .vis-code-display p { font-size: 0.75rem; font-weight: 700; color: var(--text-tertiary); margin: 0 0 0.25rem 0; text-transform: uppercase; letter-spacing: 0.05em; }
        .vis-code-display h3 { font-size: 2.25rem; font-weight: 900; color: var(--bg-brand); letter-spacing: 4px; margin: 0; }
        .vis-qr-instruction { font-size: 0.8125rem; color: var(--text-tertiary); margin: 1.5rem 0 0 0; font-weight: 500; }

        .vis-details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: #fcfcfd; border: 1px solid var(--bg-muted); padding: 1.25rem; border-radius: 16px; }
        .vis-detail-item { display: flex; flex-direction: column; gap: 0.375rem; }
        .vis-detail-item span { font-size: 0.75rem; font-weight: 700; color: var(--text-quaternary); text-transform: uppercase; letter-spacing: 0.05em; }
        .vis-detail-item strong { font-size: 0.875rem; font-weight: 700; color: var(--text-primary); }

        @media (max-width: 768px) {
          .vis-main-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default VisitorDashboard;
