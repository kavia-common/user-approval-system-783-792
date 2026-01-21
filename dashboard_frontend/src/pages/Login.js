import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './pages.css';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h2>Welcome Back</h2>
        <p className="muted">Sign in to your account</p>
        <form className="form" onSubmit={onSubmit}>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={onChange} required />
          </div>
          <div className="input">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={onChange} required />
          </div>
          {error ? <div className="error">{error}</div> : null}
          <button className="btn btn--primary" type="submit">Login</button>
        </form>
        <p className="muted small">Don&apos;t have an account? <Link to="/signup">Create one</Link></p>
      </div>
    </div>
  );
}

export default Login;
