import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, KeyRound, Lock, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ForgotPasswordWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    setError('');
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    setError('');
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 1500);
  };

  return (
    <div className="forgot-password-container">
      {step < 4 && (
        <button className="back-btn" onClick={() => step === 1 ? navigate('/login') : setStep(step - 1)}>
          <ArrowLeft size={20} />
        </button>
      )}

      {/* STEP 1: Enter Email */}
      {step === 1 && (
        <div className="wizard-step">
          <div className="icon-wrapper">
            <Mail size={32} />
          </div>
          <h1>Forgot your password?</h1>
          <p className="subtitle">No worries, we'll send you reset instructions.</p>

          <form onSubmit={handleSendEmail} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your registered email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? <div className="spinner"></div> : 'Reset Password'}
            </button>
          </form>

          <p className="bottom-link">
            Remembered your password? <Link to="/login">Back to log in</Link>
          </p>
        </div>
      )}

      {/* STEP 2: Verify OTP */}
      {step === 2 && (
        <div className="wizard-step">
          <div className="icon-wrapper">
            <KeyRound size={32} />
          </div>
          <h1>Check your email</h1>
          <p className="subtitle">We sent a 6-digit code to <strong>{email}</strong>.</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleVerifyOtp} className="auth-form">
            <div className="otp-container">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="otp-input"
                />
              ))}
            </div>
            
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? <div className="spinner"></div> : 'Verify Code'}
            </button>
          </form>

          <p className="bottom-link">
            Didn't receive the email? <span className="resend-link" onClick={() => {/* Simulate resend */}}>Click to resend</span>
          </p>
        </div>
      )}

      {/* STEP 3: Set New Password */}
      {step === 3 && (
        <div className="wizard-step">
          <div className="icon-wrapper">
            <Lock size={32} />
          </div>
          <h1>Set new password</h1>
          <p className="subtitle">Your new password must be different from previously used passwords.</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleResetPassword} className="auth-form">
            <div className="form-group">
              <label>New Password</label>
              <input 
                type="password" 
                placeholder="Minimum 8 characters" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                placeholder="Must match the new password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? <div className="spinner"></div> : 'Reset Password'}
            </button>
          </form>
        </div>
      )}

      {/* STEP 4: Success */}
      {step === 4 && (
        <div className="wizard-step success-step">
          <div className="icon-wrapper success">
            <CheckCircle2 size={48} />
          </div>
          <h1>Password reset</h1>
          <p className="subtitle">Your password has been successfully reset. Click below to log in magically.</p>

          <button onClick={() => navigate('/login')} className="submit-btn" style={{ marginTop: '2rem' }}>
            Continue to Log In <ArrowRight size={18} />
          </button>
        </div>
      )}

      <style jsx>{`
        .forgot-password-container {
          width: 100%;
          position: relative;
          padding-top: 2rem;
        }
        .back-btn {
          position: absolute;
          top: 0;
          left: 0;
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s;
        }
        .back-btn:hover {
          background: var(--bg-subtle);
          color: var(--text-primary);
        }
        .wizard-step {
          animation: slideIn 0.3s ease-out;
        }
        .icon-wrapper {
          width: 64px;
          height: 64px;
          background: rgba(0, 163, 255, 0.1);
          color: var(--accent-primary);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .icon-wrapper.success {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto 2rem;
        }
        .wizard-step.success-step {
          text-align: center;
        }
        h1 {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }
        .subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
          margin-bottom: 2.5rem;
          line-height: 1.5;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .form-group input {
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid var(--border-default);
          font-size: 1rem;
          background: var(--bg-surface);
          color: var(--text-primary);
          transition: all 0.2s;
        }
        .form-group input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 4px rgba(0, 163, 255, 0.1);
        }
        .submit-btn {
          background: var(--bg-brand);
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        .submit-btn:hover:not(:disabled) {
          background: var(--bg-brand-hover);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: wait;
        }
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .bottom-link {
          margin-top: 2rem;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }
        .bottom-link a, .resend-link {
          color: var(--bg-brand);
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
        }
        .error-message {
          background: #fef2f2;
          color: #ef4444;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          border: 1px solid #fca5a5;
        }
        
        /* OTP Input Styles */
        .otp-container {
          display: flex;
          gap: 0.5rem;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .otp-input {
          width: 45px;
          height: 55px;
          border-radius: 12px;
          border: 1px solid var(--border-default);
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          background: var(--bg-surface);
          color: var(--text-primary);
          transition: all 0.2s;
        }
        .otp-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 4px rgba(0, 163, 255, 0.1);
          transform: translateY(-2px);
        }
        
        @media (max-width: 480px) {
          .otp-input {
            width: 40px;
            height: 50px;
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordWizard;
