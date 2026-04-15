import React from 'react';
const ResidentDashboard = () => (
  <div className="dashboard-placeholder">
    <h1>Welcome Resident,</h1>
    <p>This is your personal dashboard where you can manage your visitors and appointments.</p>
    <div className="placeholder-grid">
      <div className="placeholder-card"><h3>My Visitors</h3><p>Manage people coming to see you</p></div>
      <div className="placeholder-card"><h3>Scheduled Appointments</h3><p>Your upcoming meetings</p></div>
      <div className="placeholder-card"><h3>Host Status</h3><p>You are currently active</p></div>
    </div>
    <style jsx="true">{`
      .dashboard-placeholder { padding: 1rem; }
      h1 { font-size: 1.75rem; font-weight: 800; color: #0d2331; margin-bottom: 1rem; }
      .placeholder-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
      .placeholder-card { background: white; padding: 2rem; border-radius: 16px; border: 1px solid #e2e8f0; }
      .placeholder-card h3 { color: #00a3ff; margin-bottom: 0.5rem; }
    `}</style>
  </div>
);
export default ResidentDashboard;
