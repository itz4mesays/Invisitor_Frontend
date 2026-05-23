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

// Public Pages
import Blog from './pages/shared/Blog';
import BlogPost from './pages/shared/BlogPost';

// Dashboard Imports
import AdminDashboard from './pages/dashboards/AdminDashboard';
import ResidentDashboard from './pages/dashboards/ResidentDashboard';
import ManagerDashboard from './pages/dashboards/ManagerDashboard';
import VisitorDashboard from './pages/dashboards/VisitorDashboard';
import HostDashboard from './pages/dashboards/HostDashboard';
import FrontDeskDashboard from './pages/dashboards/FrontDeskDashboard';

// Resident Pages
import ResidentReports from './pages/resident/Reports';

// Host Pages
import HostVisitors from './pages/host/Visitors';
import HostFrontDesk from './pages/host/FrontDesk';

// Shared Pages
import ActivityLog from './pages/shared/ActivityLog';
import Profile from './pages/shared/Profile';
import Notifications from './pages/shared/Notifications';
import Transactions from './pages/financial/Transactions';
import Appointments from './pages/shared/Appointments';
import Settings from './pages/shared/Settings';
import Calendar from './pages/shared/Calendar';
import Invoices from './pages/shared/Invoices';
import InvoiceDetails from './pages/shared/InvoiceDetails';

// Manager Pages
import ManagerReports from './pages/manager/Reports';
import ManagerTransactions from './pages/manager/Transactions';
import ManagerSecurity from './pages/manager/Security';
import ManagerResidents from './pages/manager/Residents';
import AddOfficer from './pages/manager/AddOfficer';
import OfficerDetails from './pages/manager/OfficerDetails';
import ResidentDetails from './pages/manager/ResidentDetails';
import AddResident from './pages/manager/AddResident';

// Support Pages (shared across non-admin roles)
import SupportDashboard from './pages/support/SupportDashboard';
import ManageTickets from './pages/support/ManageTickets';
import TicketView from './pages/support/TicketView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        
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
          <Route path="appointments" element={<Appointments />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>

        <Route path="/resident" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/resident/dashboard" replace />} />
          <Route path="dashboard" element={<ResidentDashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="reports" element={<ResidentReports />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="support/dashboard" element={<SupportDashboard />} />
          <Route path="support/tickets" element={<ManageTickets />} />
          <Route path="support/tickets/:ticketId" element={<TicketView />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>

        <Route path="/manager" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/manager/dashboard" replace />} />
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="invoices/:id" element={<InvoiceDetails />} />
          <Route path="reports" element={<ManagerReports />} />
          <Route path="support/dashboard" element={<SupportDashboard />} />
          <Route path="support/tickets" element={<ManageTickets />} />
          <Route path="support/tickets/:ticketId" element={<TicketView />} />
          <Route path="transactions" element={<ManagerTransactions />} />
          <Route path="security" element={<ManagerSecurity />} />
          <Route path="security/add" element={<AddOfficer />} />
          <Route path="security/:officerId" element={<OfficerDetails />} />
          <Route path="residents" element={<ManagerResidents />} />
          <Route path="residents/add" element={<AddResident />} />
          <Route path="residents/:residentId" element={<ResidentDetails />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>

        <Route path="/visitor" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/visitor/dashboard" replace />} />
          <Route path="dashboard" element={<VisitorDashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>

        <Route path="/host" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/host/dashboard" replace />} />
          <Route path="dashboard" element={<HostDashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="visitors" element={<HostVisitors />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="invoices/:id" element={<InvoiceDetails />} />
          <Route path="front-desk" element={<HostFrontDesk />} />
          <Route path="support/dashboard" element={<SupportDashboard />} />
          <Route path="support/tickets" element={<ManageTickets />} />
          <Route path="support/tickets/:ticketId" element={<TicketView />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>

        <Route path="/frontdesk" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/frontdesk/dashboard" replace />} />
          <Route path="dashboard" element={<FrontDeskDashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="support/dashboard" element={<SupportDashboard />} />
          <Route path="support/tickets" element={<ManageTickets />} />
          <Route path="support/tickets/:ticketId" element={<TicketView />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
