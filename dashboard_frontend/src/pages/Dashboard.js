import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import api from '../api/client';

function StatCard({ title, value, trend }) {
  return (
    <div className="metric">
      <div className="card__title">{title}</div>
      <div className="metric__value">{value}</div>
      {typeof trend === 'number' ? (
        <div className="muted">{trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%</div>
      ) : null}
    </div>
  );
}

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ posts: 0, followers: 0, engagement: 0, trends: {} });
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    api.getDashboardAnalytics()
      .then((data) => {
        if (!mounted) return;
        setStats({
          posts: data?.posts || 0,
          followers: data?.followers || 0,
          engagement: data?.engagement || 0,
          trends: data?.trends || {},
        });
      })
      .catch((err) => setError(err.message || 'Failed to load analytics'))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <Layout>
      <div className="grid grid--3">
        <StatCard title="Posts" value={loading ? '...' : stats.posts} trend={stats.trends.posts} />
        <StatCard title="Followers" value={loading ? '...' : stats.followers} trend={stats.trends.followers} />
        <StatCard title="Engagement" value={loading ? '...' : `${stats.engagement}%`} trend={stats.trends.engagement} />
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 className="card__title">Recent Performance</h3>
        {error ? <div className="error">{error}</div> : null}
        <p className="muted">This section can show charts (e.g., engagement over time). For now, it summarizes your recent activity.</p>
        <ul>
          <li>Most engaging post: <span className="badge">Last 7 days</span></li>
          <li>Top follower source: <span className="badge">Organic</span></li>
        </ul>
      </div>
    </Layout>
  );
}

export default Dashboard;
