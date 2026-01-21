import React from 'react';
import { NavLink } from 'react-router-dom';
import './layout.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="brand__logo">📊</span>
        <span className="brand__name">SocialDash</span>
      </div>
      <nav className="sidebar__nav">
        <NavLink to="/dashboard" className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}>
          <span>🏠</span> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}>
          <span>👤</span> <span>Profile</span>
        </NavLink>
        <NavLink to="/admin" className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}>
          <span>🛠️</span> <span>Admin</span>
        </NavLink>
      </nav>
      <div className="sidebar__footer">
        <span className="muted">v0.1</span>
      </div>
    </aside>
  );
}

export default Sidebar;
