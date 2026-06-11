import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AuthLayout from './components/AuthLayout';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ForgotPasswordWizard from './pages/auth/ForgotPasswordWizard';
import GetStarted from './pages/GetStarted';
import SignupWizard from './pages/SignupWizard';
import Success from './pages/Success';
import VerifyingPayment from './pages/VerifyingPayment';
import PaymentFailed from './pages/PaymentFailed';

// Subscription Pages
import SubscriptionManagement from './pages/shared/SubscriptionManagement';
import PaymentCheckout from './pages/shared/PaymentCheckout';
import PaymentSuccess from './pages/shared/PaymentSuccess';

// Public Pages
import Blog from './pages/shared/Blog';
import BlogPost from './pages/shared/BlogPost';

// Dashboard
// Admin Pages
import AdminDashboard from './pages/dashboards/AdminDashboard';
import ManageHosts from './pages/admin/ManageHosts';
import ManageEstateManagers from './pages/admin/ManageEstateManagers';
import AdminManageTickets from './pages/admin/ManageTickets';
import ManageLeads from './pages/admin/ManageLeads';
import ManageForms from './pages/admin/ManageForms';
import ManageTransactions from './pages/admin/ManageTransactions';
import ManageInvoices from './pages/admin/ManageInvoices';
import ManageUsers from './pages/admin/ManageUsers';
import HostDetails from './pages/admin/HostDetails';
import EstateManagerDetails from './pages/admin/EstateManagerDetails';
import TicketDetails from './pages/admin/TicketDetails';
import ManageAccessLevel from './pages/admin/ManageAccessLevel';
import AdminDataImport from './pages/admin/DataImport';

// Manager Pages
import ResidentDashboard from './pages/dashboards/ResidentDashboard';
import ManagerDashboard from './pages/dashboards/ManagerDashboard';
import VisitorDashboard from './pages/dashboards/VisitorDashboard';
import HostDashboard from './pages/dashboards/HostDashboard';
import FrontDeskDashboard from './pages/dashboards/FrontDeskDashboard';

// Resident Pages
import ResidentReports from './pages/resident/Reports';

// Host Pages
import HostVisitors from './pages/host/Visitors';
import AddVisitor from './pages/host/AddVisitor';
import VisitorDetails from './pages/host/VisitorDetails';
import HostFrontDesk from './pages/host/FrontDesk';
import VisitorReport from './pages/host/VisitorReport';
import HostManageHosts from './pages/host/ManageHosts';

// Shared Pages
import ActivityLog from './pages/shared/ActivityLog';
import Profile from './pages/shared/Profile';
import Notifications from './pages/shared/Notifications';
import Transactions from './pages/financial/Transactions';
import Appointments from './pages/shared/Appointments';
import AddAppointment from './pages/shared/AddAppointment';
import Settings from './pages/shared/Settings';
import ManageQRCodes from './pages/shared/ManageQRCodes';
import Calendar from './pages/shared/Calendar';
import Invoices from './pages/shared/Invoices';
import InvoiceDetails from './pages/shared/InvoiceDetails';

import ManagerReports from './pages/manager/Reports';
import ResidentReport from './pages/manager/ResidentReport';
import SecurityReport from './pages/manager/SecurityReport';
import ManagerTransactions from './pages/manager/Transactions';
import ManagerSecurity from './pages/manager/Security';
import ManagerResidents from './pages/manager/Residents';
import AddOfficer from './pages/manager/AddOfficer';
import OfficerDetails from './pages/manager/OfficerDetails';
import ResidentDetails from './pages/manager/ResidentDetails';
import AddResident from './pages/manager/AddResident';
import ManagerDataImport from './pages/manager/DataImport';

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
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPasswordWizard />} />
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
          <Route path="hosts" element={<ManageHosts />} />
          <Route path="hosts/:id" element={<HostDetails />} />
          <Route path="estate-managers" element={<ManageEstateManagers />} />
          <Route path="estate-managers/:id" element={<EstateManagerDetails />} />
          <Route path="tickets" element={<AdminManageTickets />} />
          <Route path="tickets/:id" element={<TicketDetails />} />
          <Route path="leads" element={<ManageLeads />} />
          <Route path="forms" element={<ManageForms />} />
          <Route path="transactions" element={<ManageTransactions />} />
          <Route path="invoices" element={<ManageInvoices />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="data-import" element={<AdminDataImport />} />
          <Route path="access-level" element={<ManageAccessLevel />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="security/add" element={<AddOfficer />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="subscription" element={<SubscriptionManagement />} />
          <Route path="checkout" element={<PaymentCheckout />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>

        <Route path="/resident" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/resident/dashboard" replace />} />
          <Route path="dashboard" element={<ResidentDashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/add" element={<AddAppointment />} />
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
          <Route path="subscription" element={<SubscriptionManagement />} />
          <Route path="checkout" element={<PaymentCheckout />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>

        <Route path="/manager" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/manager/dashboard" replace />} />
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/add" element={<AddAppointment />} />
          <Route path="qr-codes" element={<ManageQRCodes />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="invoices/:id" element={<InvoiceDetails />} />
          <Route path="reports" element={<Navigate to="/manager/reports/appointments" replace />} />
          <Route path="reports/appointments" element={<ManagerReports />} />
          <Route path="reports/resident" element={<ResidentReport />} />
          <Route path="reports/security" element={<SecurityReport />} />
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
          <Route path="data-import" element={<ManagerDataImport />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="subscription" element={<SubscriptionManagement />} />
          <Route path="checkout" element={<PaymentCheckout />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
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
          <Route path="hosts" element={<HostManageHosts />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="visitors" element={<HostVisitors />} />
          <Route path="visitors/add" element={<AddVisitor />} />
          <Route path="visitors/:visitorId" element={<VisitorDetails />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/add" element={<AddAppointment />} />
          <Route path="reports" element={<Navigate to="/host/reports/visitor" replace />} />
          <Route path="reports/visitor" element={<VisitorReport />} />
          <Route path="reports/appointments" element={<ManagerReports />} />
          <Route path="reports/security" element={<SecurityReport />} />
          <Route path="qr-codes" element={<ManageQRCodes />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="invoices/:id" element={<InvoiceDetails />} />
          <Route path="front-desk" element={<HostFrontDesk />} />
          <Route path="support/dashboard" element={<SupportDashboard />} />
          <Route path="support/tickets" element={<ManageTickets />} />
          <Route path="support/tickets/:ticketId" element={<TicketView />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="subscription" element={<SubscriptionManagement />} />
          <Route path="checkout" element={<PaymentCheckout />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
          <Route path="*" element={<div>Coming Soon</div>} />
        </Route>

        <Route path="/frontdesk" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/frontdesk/dashboard" replace />} />
          <Route path="dashboard" element={<FrontDeskDashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="appointments/add" element={<AddAppointment />} />
          <Route path="visitors" element={<HostVisitors />} />
          <Route path="visitors/add" element={<AddVisitor />} />
          <Route path="visitors/:visitorId" element={<VisitorDetails />} />
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
