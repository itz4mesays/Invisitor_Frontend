import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import GetStarted from './pages/GetStarted';
import SignupWizard from './pages/SignupWizard';
import Success from './pages/Success';
import VerifyingPayment from './pages/VerifyingPayment';
import PaymentFailed from './pages/PaymentFailed';

// Dashboard Imports
import AdminDashboard from './pages/dashboards/AdminDashboard';
import ResidentDashboard from './pages/dashboards/ResidentDashboard';
import ManagerDashboard from './pages/dashboards/ManagerDashboard';
import VisitorDashboard from './pages/dashboards/VisitorDashboard';
import HostDashboard from './pages/dashboards/HostDashboard';
import FrontDeskDashboard from './pages/dashboards/FrontDeskDashboard';

// Host Pages
import HostVisitors from './pages/host/Visitors';
import HostAppointments from './pages/host/Appointments';
import HostFrontDesk from './pages/host/FrontDesk';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Layout Routes */}
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupWizard />} />
          <Route path="/register" element={<SignupWizard />} />
          <Route path="/payment" element={<SignupWizard />} />
          <Route path="/verify-payment" element={<VerifyingPayment />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/success" element={<Success />} />
        </Route>

        {/* Dashboard Layout Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>

        <Route path="/resident" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/resident/dashboard" replace />} />
          <Route path="dashboard" element={<ResidentDashboard />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>

        <Route path="/manager" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/manager/dashboard" replace />} />
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>

        <Route path="/visitor" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/visitor/dashboard" replace />} />
          <Route path="dashboard" element={<VisitorDashboard />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>

        <Route path="/host" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/host/dashboard" replace />} />
          <Route path="dashboard" element={<HostDashboard />} />
          <Route path="visitors" element={<HostVisitors />} />
          <Route path="appointments" element={<HostAppointments />} />
          <Route path="front-desk" element={<HostFrontDesk />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>

        <Route path="/frontdesk" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/frontdesk/dashboard" replace />} />
          <Route path="dashboard" element={<FrontDeskDashboard />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
