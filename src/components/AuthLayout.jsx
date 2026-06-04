import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import authBg from '../assets/auth-bg.png';

const AuthLayout = () => {
  return (
    <div className="auth-layout" style={{ display: 'flex', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      
      {/* Left Column: Image Background */}
      <div 
        className="auth-hero"
        style={{ 
          flex: 1, 
          position: 'relative', 
          background: `url(${authBg}) center/cover no-repeat`,
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          padding: '3rem',
          color: 'white'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(13, 35, 49, 0.6) 0%, rgba(0, 144, 230, 0.4) 100%)', zIndex: 1 }} />
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="25" r="18" fill="white" />
                <path d="M20 55C20 49.5 24.5 45 30 45H70C75.5 45 80 49.5 80 55V60H20V55Z" fill="white" />
                <path d="M20 65H80V75C80 80.5 75.5 85 70 85H30C24.5 85 20 80.5 20 75V65Z" fill="white" />
              </svg>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>InVisitor</span>
            </motion.div>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ position: 'relative', zIndex: 2, paddingBottom: '2rem' }}
        >
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', textShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            Experience Next-Level<br />Visitor Management
          </h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '500px', lineHeight: 1.6, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            Streamline your front desk, enhance security, and delight your guests with our intelligent platform.
          </p>
        </motion.div>
      </div>

      {/* Right Column: Forms */}
      <div 
        className="auth-content-area"
        style={{ 
          width: '55%', 
          minWidth: '600px', 
          background: 'var(--bg-surface)', 
          display: 'flex', 
          flexDirection: 'column', 
          overflowY: 'auto',
          position: 'relative',
          zIndex: 10
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={window.location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            style={{ minHeight: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .auth-layout { flex-direction: column !important; }
          .auth-hero { display: none !important; }
          .auth-content-area { width: 100% !important; min-width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default AuthLayout;
