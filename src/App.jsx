import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import GetStarted from './pages/GetStarted';
import SignupWizard from './pages/SignupWizard';
import Success from './pages/Success';
import VerifyingPayment from './pages/VerifyingPayment';
import PaymentFailed from './pages/PaymentFailed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupWizard />} />
          <Route path="/register" element={<SignupWizard />} />
          <Route path="/payment" element={<SignupWizard />} />
          <Route path="/verify-payment" element={<VerifyingPayment />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/success" element={<Success />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
