import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <div className="card">
      <h1 className="card-title">Log in</h1>
      <p className="card-subtitle">Enter your details to access your account</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address / Username</label>
          <input type="text" id="email" placeholder="Enter your email or username" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required />
        </div>

        <div className="flex-between">
          <div className="checkbox-group">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" style={{ margin: 0 }}>Remember me</label>
          </div>
          <a href="#" className="link">Forgot Password?</a>
        </div>

        <button type="submit" className="btn btn-primary">Log in</button>
      </form>

      <div className="divider">OR</div>

      <p style={{ textAlign: 'center', fontSize: '0.85rem' }}>
        Don't have an account? <Link to="/signup" className="link">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
