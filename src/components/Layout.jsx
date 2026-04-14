import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
  return (
    <div className="app-container">
      <div className="bg-pattern" />
      <Link to="/" style={{ textDecoration: 'none' }}>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="logo"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}
        >
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="25" r="18" fill="white" />
            <path d="M20 55C20 49.5 24.5 45 30 45H70C75.5 45 80 49.5 80 55V60H20V55Z" fill="white" />
            <path d="M20 65H80V75C80 80.5 75.5 85 70 85H30C24.5 85 20 80.5 20 75V65Z" fill="white" />
          </svg>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>InVisitor</span>
        </motion.div>
      </Link>
      <AnimatePresence mode="wait">
        <motion.div
          key={window.location.pathname}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Layout;
