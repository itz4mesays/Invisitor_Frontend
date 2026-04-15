import React from 'react';
const VisitorDashboard = () => (
  <div className="dashboard-placeholder">
    <h1>Welcome Visitor,</h1>
    <p>View your active passes and upcoming invitations.</p>
    <div className="placeholder-grid">
      <div className="placeholder-card"><h3>Active Pass</h3><p>Show this at the gate</p></div>
      <div className="placeholder-card"><h3>My Host</h3><p>Details about your stay</p></div>
      <div className="placeholder-card"><h3>Visit History</h3><p>Where you've been recently</p></div>
    </div>
    <style jsx="true">{`
      .dashboard-placeholder { padding: 1rem; }
      h1 { font-size: 1.75rem; font-weight: 800; color: #0d2331; margin-bottom: 1rem; }
      .placeholder-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
      .placeholder-card { background: white; padding: 2rem; border-radius: 16px; border: 1px solid #e2e8f0; }
      .placeholder-card h3 { color: #f59e0b; margin-bottom: 0.5rem; }
    `}</style>
  </div>
);
export default VisitorDashboard;
