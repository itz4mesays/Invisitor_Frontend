import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import GetStarted from './pages/GetStarted';
import BusinessType from './pages/BusinessType';
import Registration from './pages/Registration';
import Payment from './pages/Payment';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<GetStarted />} />
          <Route path="/business-type" element={<BusinessType />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
