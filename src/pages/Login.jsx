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
    <div className="card">
      <h1 className="card-title">Log in</h1>
      <p className="card-subtitle">Enter your details to access your account</p>

      {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</p>}

      {!isOtpStep ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                style={{ paddingRight: '3rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex-between" style={{ marginTop: '1.5rem' }}>
            <div className="checkbox-group">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember" style={{ margin: 0 }}>Remember me</label>
            </div>
            <a href="#" className="link">Forgot Password?</a>
          </div>

          <button type="submit" className="btn btn-primary">Log in</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <div style={{ marginBottom: '1rem', textAlign: 'center', color: '#0f172a' }}>
            <p style={{ margin: 0, fontWeight: 700 }}>Two-Factor Authentication</p>
            <p style={{ margin: '0.5rem 0 0', color: '#475569' }}>Enter the OTP for <strong>{pendingUser?.email}</strong></p>
          </div>

          {otpError && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem', fontSize: '0.85rem' }}>{otpError}</p>}

          <div className="form-group">
            <label htmlFor="otp">OTP Code</label>
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
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    outline: 'none',
                    background: '#f8fafc'
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

          <p style={{ marginTop: '1rem', textAlign: 'center', color: '#64748b', fontSize: '0.8rem' }}>
            Use OTP <strong>123456</strong> for this demo.
          </p>
        </form>
      )}

      <div className="divider">OR</div>

      <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px', fontSize: '0.75rem' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e293b' }}>Test Credentials (pw: password123):</p>
        <ul style={{ listStyle: 'none', padding: 0, color: '#64748b' }}>
          <li>Admin: admin@invisitor.com</li>
          <li>Resident: resident@invisitor.com</li>
          <li>Manager: manager@invisitor.com</li>
          <li>Visitor: visitor@invisitor.com</li>
          <li>Host: host@invisitor.com</li>
          <li>FrontDesk: frontdesk@invisitor.com</li>
        </ul>
      </div>

      <p style={{ textAlign: 'center', fontSize: '0.85rem', marginTop: '1.5rem' }}>
        Don't have an account? <Link to="/#pricing" className="link">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
