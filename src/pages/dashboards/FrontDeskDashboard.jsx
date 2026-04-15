import React from 'react';
const FrontDeskDashboard = () => (
  <div className="dashboard-placeholder">
    <h1>Welcome Front Desk Officer,</h1>
    <p>Efficiently check in visitors and manage the gatehouse.</p>
    <div className="placeholder-grid">
      <div className="placeholder-card"><h3>Check-in Visitor</h3><p>Scan pass or enter code</p></div>
      <div className="placeholder-card"><h3>Gate Activity</h3><p>Real-time log of entries/exits</p></div>
      <div className="placeholder-card"><h3>Emergency Alert</h3><p>Notify security and management</p></div>
    </div>
    <style jsx="true">{`
      .dashboard-placeholder { padding: 1rem; }
      h1 { font-size: 1.75rem; font-weight: 800; color: #0d2331; margin-bottom: 1rem; }
      .placeholder-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
      .placeholder-card { background: white; padding: 2rem; border-radius: 16px; border: 1px solid #e2e8f0; }
      .placeholder-card h3 { color: #f43f5e; margin-bottom: 0.5rem; }
    `}</style>
  </div>
);
export default FrontDeskDashboard;
