import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/client';

function Admin() {
  const [users, setUsers] = useState([]);
  const [platform, setPlatform] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingPlatform, setLoadingPlatform] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    api.getAdminUsers()
      .then((data) => mounted && setUsers(Array.isArray(data) ? data : data?.items || []))
      .catch((err) => setError(err.message || 'Failed to load users'))
      .finally(() => mounted && setLoadingUsers(false));
    api.getAdminPlatformStats()
      .then((data) => mounted && setPlatform(data))
      .catch((err) => setError(err.message || 'Failed to load platform analytics'))
      .finally(() => mounted && setLoadingPlatform(false));
    return () => { mounted = false; };
  }, []);

  return (
    <Layout>
      <div className="grid">
        <div className="card">
          <h3 className="card__title">User Management</h3>
          {loadingUsers ? <p className="muted">Loading users...</p> : null}
          {error ? <div className="error">{error}</div> : null}
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id || u.email}>
                    <td>{u.email}</td>
                    <td>{u.name || '-'}</td>
                    <td>{u.role || 'user'}</td>
                    <td><span className="badge">{u.status || 'active'}</span></td>
                  </tr>
                ))}
                {!users.length && !loadingUsers ? (
                  <tr><td colSpan={4} className="muted">No users</td></tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3 className="card__title">Platform Analytics</h3>
          {loadingPlatform ? <p className="muted">Loading analytics...</p> : null}
          {platform ? (
            <ul>
              <li>Total Users: <strong>{platform.total_users ?? '-'}</strong></li>
              <li>Total Posts: <strong>{platform.total_posts ?? '-'}</strong></li>
              <li>Avg Engagement: <strong>{platform.avg_engagement ?? '-'}%</strong></li>
            </ul>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

export default Admin;
