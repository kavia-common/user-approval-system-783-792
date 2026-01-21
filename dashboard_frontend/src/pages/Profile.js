import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/client';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user, setUser, refreshUser } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', bio: '' });
  const [status, setStatus] = useState({ error: '', ok: '' });

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || '', bio: user.bio || '' });
    } else {
      // Attempt to fetch if not loaded yet
      refreshUser?.();
    }
  }, [user, refreshUser]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ error: '', ok: '' });
    try {
      const updated = await api.updateMe(form);
      setUser(updated);
      setStatus({ error: '', ok: 'Profile updated successfully' });
    } catch (err) {
      setStatus({ error: err.message || 'Update failed', ok: '' });
    }
  };

  return (
    <Layout>
      <div className="grid" style={{ maxWidth: 800 }}>
        <div className="card">
          <h3 className="card__title">Profile</h3>
          <div className="form">
            <div className="input">
              <label>Name</label>
              <input name="name" placeholder="Your name" value={form.name} onChange={onChange} />
            </div>
            <div className="input">
              <label>Bio</label>
              <textarea name="bio" rows={4} placeholder="Tell something about you" value={form.bio} onChange={onChange} />
            </div>
            {status.error ? <div className="error">{status.error}</div> : null}
            {status.ok ? <div className="success">{status.ok}</div> : null}
            <div>
              <button className="btn btn--primary" onClick={onSubmit}>Save Changes</button>
            </div>
          </div>
        </div>
        <div className="card">
          <h3 className="card__title">Your Info</h3>
          <p><strong>Email:</strong> {user?.email || '-'}</p>
          <p><strong>Status:</strong> <span className="badge">Active</span></p>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
