import React from 'react';
const ManagerDashboard = () => (
  <div className="dashboard-placeholder">
    <h1>Welcome Estate Manager,</h1>
    <p>Monitor your entire estate's visitor traffic and security team.</p>
    <div className="placeholder-grid">
      <div className="placeholder-card"><h3>Estate Overview</h3><p>Total capacity and current visitors</p></div>
      <div className="placeholder-card"><h3>Front Desk Management</h3><p>Manage your security personnel</p></div>
      <div className="placeholder-card"><h3>Revenue & Reports</h3><p>Financial overview of the estate</p></div>
    </div>
    <style jsx="true">{`
      .dashboard-placeholder { padding: 1rem; }
      h1 { font-size: 1.75rem; font-weight: 800; color: #0d2331; margin-bottom: 1rem; }
      .placeholder-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
      .placeholder-card { background: white; padding: 2rem; border-radius: 16px; border: 1px solid #e2e8f0; }
      .placeholder-card h3 { color: #8b5cf6; margin-bottom: 0.5rem; }
    `}</style>
  </div>
);
export default ManagerDashboard;
