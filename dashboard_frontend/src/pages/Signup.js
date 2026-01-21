import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './pages.css';
import api from '../api/client';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setOk('');
    try {
      await api.signup(form);
      setOk('Account created. You can now login.');
      setTimeout(() => navigate('/login'), 800);
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="auth">
      <div className="auth__card">
        <h2>Create Account</h2>
        <p className="muted">Join the analytics dashboard</p>
        <form className="form" onSubmit={onSubmit}>
          <div className="input">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" value={form.name} onChange={onChange} required />
          </div>
          <div className="input">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={onChange} required />
          </div>
          <div className="input">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={onChange} required />
          </div>
          {error ? <div className="error">{error}</div> : null}
          {ok ? <div className="success">{ok}</div> : null}
          <button className="btn btn--primary" type="submit">Create Account</button>
        </form>
        <p className="muted small">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
