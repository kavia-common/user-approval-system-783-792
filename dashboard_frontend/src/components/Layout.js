import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './layout.css';

function Layout({ children }) {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Topbar />
        <div className="content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
