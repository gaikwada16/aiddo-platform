import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { apiClient } from '../lib/api';

export const ProviderDashboard: React.FC = () => {
  const { user } = useAuth();
  const [earnings, setEarnings] = useState('0');
  const [balance, setBalance] = useState('0');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (!user) return;
        const result = await apiClient.getBalance(user.id);
        setBalance(result.balance);
        // In a real app, would fetch from separate earnings endpoint
        setEarnings(result.balance);
      } catch (err) {
        console.error('Failed to fetch balance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [user]);

  const dashboardStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headerStyle: React.CSSProperties = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  };

  const statusBadge: React.CSSProperties = {
    display: 'inline-block',
    padding: '0.5rem 1rem',
    backgroundColor: '#28a745',
    color: 'white',
    borderRadius: '20px',
    fontWeight: 'bold',
    marginBottom: '1rem',
  };

  const greetingStyle: React.CSSProperties = {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  };

  const statsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  };

  const statCardStyle: React.CSSProperties = {
    padding: '1.5rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    border: '1px solid #ddd',
  };

  const statLabelStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '0.5rem',
  };

  const statValueStyle: React.CSSProperties = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#007bff',
  };

  const sectionStyle: React.CSSProperties = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  };

  const jobCardStyle: React.CSSProperties = {
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
    border: '1px solid #ddd',
    marginBottom: '1rem',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '0.5rem',
  };

  const performanceBarStyle: React.CSSProperties = {
    width: '100%',
    height: '8px',
    backgroundColor: '#ddd',
    borderRadius: '4px',
    overflow: 'hidden',
    marginTop: '0.5rem',
  };

  const performanceBarFillStyle: React.CSSProperties = {
    height: '100%',
    backgroundColor: '#28a745',
    width: '92%',
  };

  // Sample data
  const todaysEarnings = earnings;
  const hoursWorked = '6.5';
  const rating = 4.8;
  const performanceScore = 92;

  const nearbyJobs = [
    {
      id: '1',
      category: 'Electrician',
      distance: '2.5 km',
      rate: '₹300/hour',
      rating: 4.8,
      description: 'Fan repair needed',
    },
    {
      id: '2',
      category: 'Helper',
      distance: '1.2 km',
      rate: '₹250/hour',
      rating: 4.6,
      description: 'House shifting help',
    },
  ];

  return (
    <div style={dashboardStyle}>
      <div style={headerStyle}>
        <div style={statusBadge}>🟢 YOU ARE AVAILABLE</div>
        <h1 style={greetingStyle}>Good Morning, {user?.name} 👋</h1>

        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={statLabelStyle}>Today's Earnings</div>
            <div style={statValueStyle}>₹{todaysEarnings}</div>
          </div>

          <div style={statCardStyle}>
            <div style={statLabelStyle}>Hours Worked</div>
            <div style={statValueStyle}>{hoursWorked} hrs</div>
          </div>

          <div style={statCardStyle}>
            <div style={statLabelStyle}>Rating</div>
            <div style={statValueStyle}>⭐ {rating}</div>
          </div>

          <div style={statCardStyle}>
            <div style={statLabelStyle}>Available Balance</div>
            <div style={statValueStyle}>₹{balance}</div>
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2>📍 WORK NEAR YOU</h2>
        {nearbyJobs.map((job) => (
          <div key={job.id} style={jobCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{job.category}</h3>
                <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#666' }}>
                  📍 {job.distance} away
                </p>
                <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#666' }}>
                  {job.rate} • ⭐ {job.rating}
                </p>
                <p style={{ margin: '0.5rem 0', color: '#333' }}>{job.description}</p>
              </div>
              <div>
                <button style={buttonStyle}>View Job</button>
                <button
                  style={{
                    ...buttonStyle,
                    backgroundColor: '#007bff',
                    marginRight: 0,
                  }}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={sectionStyle}>
        <h2>⭐ Your Performance</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div>
            <div style={statLabelStyle}>Rating</div>
            <div style={statValueStyle}>{rating}</div>
          </div>

          <div>
            <div style={statLabelStyle}>Punctuality</div>
            <div style={statValueStyle}>96%</div>
          </div>

          <div>
            <div style={statLabelStyle}>Completion Rate</div>
            <div style={statValueStyle}>98%</div>
          </div>

          <div>
            <div style={statLabelStyle}>Customer Rating</div>
            <div style={statValueStyle}>4.9</div>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Performance Score</span>
            <span style={{ fontWeight: 'bold' }}>{performanceScore}%</span>
          </div>
          <div style={performanceBarStyle}>
            <div style={performanceBarFillStyle} />
          </div>
        </div>

        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#fff3cd',
            borderRadius: '4px',
            borderLeft: '4px solid #ffc107',
          }}
        >
          <p style={{ margin: 0 }}>
            🏆 <strong>Bonus Eligible:</strong> You're performing great! Keep it up to reach Gold level.
          </p>
        </div>
      </div>
    </div>
  );
};
