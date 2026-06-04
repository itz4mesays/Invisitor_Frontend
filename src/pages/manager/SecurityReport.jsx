import React from 'react';
import { ShieldAlert, CheckCircle, Video, Lock } from 'lucide-react';

const SecurityReport = () => {
  return (
    <div className="sr-page">
      <div className="sr-header">
        <div>
          <h1>Security Report</h1>
          <p>Overview of estate security logs and incidents.</p>
        </div>
      </div>

      <div className="sr-stats-grid">
        <div className="sr-stat-card">
          <div className="sr-stat-icon" style={{ background: 'var(--bg-danger-subtle)', color: 'var(--text-danger)' }}>
            <ShieldAlert size={20} />
          </div>
          <div>
            <span className="sr-stat-label">Active Incidents</span>
            <span className="sr-stat-value">2</span>
          </div>
        </div>
        
        <div className="sr-stat-card">
          <div className="sr-stat-icon" style={{ background: 'var(--bg-success-subtle)', color: 'var(--text-success)' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <span className="sr-stat-label">Resolved (This Week)</span>
            <span className="sr-stat-value">14</span>
          </div>
        </div>

        <div className="sr-stat-card">
          <div className="sr-stat-icon" style={{ background: 'var(--bg-subtle)', color: 'var(--brand-primary)' }}>
            <Video size={20} />
          </div>
          <div>
            <span className="sr-stat-label">CCTV Status</span>
            <span className="sr-stat-value" style={{ fontSize: '1.25rem', color: 'var(--text-success)' }}>All Online</span>
          </div>
        </div>
        
        <div className="sr-stat-card">
          <div className="sr-stat-icon" style={{ background: 'var(--bg-subtle)', color: 'var(--text-secondary)' }}>
            <Lock size={20} />
          </div>
          <div>
            <span className="sr-stat-label">Gate Access Denied</span>
            <span className="sr-stat-value">8</span>
          </div>
        </div>
      </div>

      <div className="sr-logs-card">
        <h3>Recent Security Logs</h3>
        <table className="sr-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Location</th>
              <th>Event Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Today, 08:45 AM</td>
              <td>Main Gate</td>
              <td>Invalid QR Code Scan</td>
              <td><span className="sr-badge danger">Investigating</span></td>
            </tr>
            <tr>
              <td>Yesterday, 11:20 PM</td>
              <td>Block B Entrance</td>
              <td>Door propped open</td>
              <td><span className="sr-badge success">Resolved</span></td>
            </tr>
            <tr>
              <td>Yesterday, 06:15 PM</td>
              <td>Visitor Parking</td>
              <td>Unauthorized vehicle</td>
              <td><span className="sr-badge success">Resolved</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .sr-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 3rem; }
        .sr-header h1 { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem; }
        .sr-header p { color: var(--text-tertiary); margin: 0; }
        
        .sr-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; }
        .sr-stat-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 16px; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; }
        .sr-stat-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .sr-stat-label { display: block; font-size: 0.75rem; color: var(--text-quaternary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
        .sr-stat-value { display: block; font-size: 1.875rem; font-weight: 800; color: var(--text-primary); line-height: 1; }
        
        .sr-logs-card { background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: 20px; padding: 1.5rem; }
        .sr-logs-card h3 { font-size: 1.125rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1.5rem; }
        
        .sr-table { width: 100%; border-collapse: collapse; text-align: left; }
        .sr-table th { padding: 1rem; border-bottom: 1px solid var(--border-default); color: var(--text-tertiary); font-weight: 600; font-size: 0.875rem; }
        .sr-table td { padding: 1rem; border-bottom: 1px solid var(--border-default); color: var(--text-primary); font-size: 0.9375rem; }
        .sr-table tr:last-child td { border-bottom: none; }
        
        .sr-badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
        .sr-badge.success { background: var(--bg-success-subtle); color: var(--text-success); }
        .sr-badge.danger { background: var(--bg-danger-subtle); color: var(--text-danger); }
        
        @media (max-width: 1024px) {
          .sr-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .sr-stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default SecurityReport;
