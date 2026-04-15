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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const user = DUMMY_USERS.find(u => u.email === email && u.password === password);

    if (user) {
      // Redirect based on role
      const rolePath = user.role === ROLES.ESTATE_MANAGER ? 'manager' : user.role;
      navigate(`/${rolePath}/dashboard`);
    } else {
      setError('Invalid email or password. Check the credentials below.');
    }
  };

  return (
    <div className="card">
      <h1 className="card-title">Log in</h1>
      <p className="card-subtitle">Enter your details to access your account</p>

      {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem', fontSize: '0.85rem' }}>{error}</p>}

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
