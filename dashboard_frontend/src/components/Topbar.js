import React, { useContext } from 'react';
import './layout.css';
import { AuthContext } from '../context/AuthContext';

// Simple event-driven theme toggle: expects data-theme on documentElement
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
}

function Topbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="topbar">
      <div className="topbar__left">
        <h1 className="topbar__title">Dashboard</h1>
      </div>
      <div className="topbar__actions">
        <button className="btn btn--ghost" onClick={toggleTheme} aria-label="Toggle theme">
          🌓
        </button>
        {user ? (
          <>
            <span className="topbar__user">Hi, {user.name || user.email}</span>
            <button className="btn btn--primary" onClick={logout}>Logout</button>
          </>
        ) : null}
      </div>
    </header>
  );
}

export default Topbar;
