import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DUMMY_USERS, ROLES } from '../constants/roles';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
  const [otpError, setOtpError] = useState('');
  const [pendingUser, setPendingUser] = useState(null);
  const [generatedOtp] = useState('123456');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setOtpError('');

    const user = DUMMY_USERS.find(u => u.email === email && u.password === password);

    if (user) {
      if (user.role === ROLES.HOST || user.role === ROLES.ESTATE_MANAGER || user.role === ROLES.RESIDENT) {
        setPendingUser(user);
        setIsOtpStep(true);
      } else {
        const rolePath = user.role === ROLES.ESTATE_MANAGER ? 'manager' : user.role;
        navigate(`/${rolePath}/dashboard`);
      }
    } else {
      setError('Invalid email or password. Check the credentials below.');
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setOtpError('');

    const otpCode = otpDigits.join('');
    if (otpCode === generatedOtp) {
      const rolePath = pendingUser.role === ROLES.ESTATE_MANAGER ? 'manager' : pendingUser.role;
      navigate(`/${rolePath}/dashboard`);
    } else {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  const handleBackToLogin = () => {
    setIsOtpStep(false);
    setOtpDigits(Array(6).fill(''));
    setPendingUser(null);
    setError('');
    setOtpError('');
  };

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const nextDigits = [...otpDigits];
    nextDigits[index] = value;
    setOtpDigits(nextDigits);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otpDigits[index] === '' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };


  return (
    <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>Welcome back</h1>
      <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Enter your details to access your account</p>

      {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</p>}

      {!isOtpStep ? (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>Email address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{ padding: '1rem', borderRadius: '12px', border: '1.5px solid var(--border-default)', background: 'transparent', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--bg-brand)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                style={{ width: '100%', padding: '1rem', paddingRight: '3rem', borderRadius: '12px', border: '1.5px solid var(--border-default)', background: 'transparent', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--bg-brand)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-default)'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', padding: '4px' }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="remember" style={{ width: '1.125rem', height: '1.125rem', accentColor: 'var(--bg-brand)' }} />
              <label htmlFor="remember" style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', cursor: 'pointer' }}>Remember me</label>
            </div>
            <a href="#" style={{ color: 'var(--bg-brand)', fontSize: '0.875rem', fontWeight: 700, textDecoration: 'none' }}>Forgot Password?</a>
          </div>

          <button type="submit" style={{ width: '100%', padding: '1rem', background: 'var(--bg-brand)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', boxShadow: '0 4px 12px rgba(0, 144, 230, 0.2)' }}>Log in</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <div style={{ marginBottom: '1rem', textAlign: 'center', color: 'var(--text-primary)' }}>
            <p style={{ margin: 0, fontWeight: 700 }}>Two-Factor Authentication</p>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)' }}>Enter the OTP for <strong>{pendingUser?.email}</strong></p>
          </div>

          {otpError && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem', fontSize: '0.85rem' }}>{otpError}</p>}

          <div className="form-group">
            {/* <label htmlFor="otp">OTP Code</label> */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '0.75rem' }}>
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  style={{
                    width: '3rem',
                    height: '3rem',
                    textAlign: 'center',
                    fontSize: '1.25rem',
                    border: '1px solid var(--border-heavy)',
                    borderRadius: '12px',
                    outline: 'none',
                    background: 'var(--bg-subtle)'
                  }}
                  required
                />
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Verify OTP</button>

          <button
            type="button"
            className="btn btn-outline"
            style={{ width: '100%', marginTop: '0.75rem' }}
            onClick={handleBackToLogin}
          >
            Back to login
          </button>

          <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
            Use OTP <strong>123456</strong> for this demo.
          </p>
        </form>
      )}

      <div style={{ display: 'flex', alignItems: 'center', margin: '2.5rem 0' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-default)' }}></div>
        <span style={{ padding: '0 1rem', color: 'var(--text-tertiary)', fontSize: '0.875rem', fontWeight: 600 }}>OR</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-default)' }}></div>
      </div>

      <div style={{ padding: '1.5rem', background: 'var(--bg-subtle)', borderRadius: '16px', border: '1px solid var(--border-default)' }}>
        <p style={{ fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)', fontSize: '0.875rem' }}>Test Credentials (pw: password123):</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <li><strong>Admin:</strong> admin@...</li>
          <li><strong>Resident:</strong> resident@...</li>
          <li><strong>Manager:</strong> manager@...</li>
          <li><strong>Visitor:</strong> visitor@...</li>
          <li><strong>Host:</strong> host@...</li>
          <li><strong>FrontDesk:</strong> frontdesk@...</li>
        </ul>
      </div>

      <p style={{ textAlign: 'center', fontSize: '0.9375rem', marginTop: '2.5rem', color: 'var(--text-secondary)' }}>
        Don't have an account? <Link to="/#pricing" style={{ color: 'var(--bg-brand)', fontWeight: 800, textDecoration: 'none' }}>Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
