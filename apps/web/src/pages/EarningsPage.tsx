import React, { useState } from 'react';

export const EarningsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'month' | 'week' | 'all'>('month');

  const dashboardStyle: React.CSSProperties = {
    maxWidth: '1000px',
    margin: '0 auto',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '2rem',
  };

  const filterStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
  };

  const filterButtonStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    backgroundColor: active ? '#007bff' : '#f0f0f0',
    color: active ? 'white' : '#333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  });

  const cardStyle: React.CSSProperties = {
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  };

  const amountGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  };

  const amountBoxStyle: React.CSSProperties = {
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
    border: '1px solid #ddd',
    textAlign: 'center',
  };

  const amountLabelStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '0.5rem',
  };

  const amountValueStyle: React.CSSProperties = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#28a745',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
  };

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    borderBottom: '2px solid #ddd',
    fontWeight: 'bold',
  };

  const tdStyle: React.CSSProperties = {
    padding: '1rem',
    borderBottom: '1px solid #ddd',
  };

  const breakdownStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '2rem',
  };

  const breakdownItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #eee',
  };

  // Sample data
  const monthlyEarnings = 28500;
  const workEarnings = 25000;
  const performanceBonus = 2500;
  const otherBonus = 1000;
  const providerContribution = 750;
  const aidcoContribution = 750;
  const availableWallet = 20000;
  const pending = 7000;

  const earningsHistory = [
    { date: 'Aug 17', work: 'Electrician', hours: 4, rate: '₹300', amount: '₹1,200' },
    { date: 'Aug 16', work: 'Helper', hours: 6, rate: '₹200', amount: '₹1,200' },
    { date: 'Aug 15', work: 'Repair', hours: 3, rate: '₹350', amount: '₹1,050' },
    { date: 'Aug 14', work: 'Cleaning', hours: 5, rate: '₹180', amount: '₹900' },
    { date: 'Aug 13', work: 'Electrician', hours: 4, rate: '₹300', amount: '₹1,200' },
  ];

  return (
    <div style={dashboardStyle}>
      <div style={headerStyle}>
        <h1>MY EARNINGS</h1>
        <div style={filterStyle}>
          <button
            onClick={() => setTimeframe('week')}
            style={filterButtonStyle(timeframe === 'week')}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeframe('month')}
            style={filterButtonStyle(timeframe === 'month')}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeframe('all')}
            style={filterButtonStyle(timeframe === 'all')}
          >
            All Time
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <h2>This Month</h2>
        <div style={amountGridStyle}>
          <div style={amountBoxStyle}>
            <div style={amountLabelStyle}>Gross Earnings</div>
            <div style={amountValueStyle}>₹{monthlyEarnings.toLocaleString()}</div>
          </div>
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Earnings Breakdown</h3>
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '6px',
          }}
        >
          <div style={breakdownItemStyle}>
            <span>Work Earnings</span>
            <strong>₹{workEarnings.toLocaleString()}</strong>
          </div>
          <div style={breakdownItemStyle}>
            <span>Performance Bonus</span>
            <strong>₹{performanceBonus.toLocaleString()}</strong>
          </div>
          <div style={breakdownItemStyle}>
            <span>Other Bonus</span>
            <strong>₹{otherBonus.toLocaleString()}</strong>
          </div>
          <div
            style={{
              ...breakdownItemStyle,
              borderBottom: '2px solid #ddd',
              paddingTop: '1rem',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>Gross</span>
            <strong style={{ fontSize: '1.1rem' }}>₹{monthlyEarnings.toLocaleString()}</strong>
          </div>
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Benefits / Contributions</h3>
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            borderRadius: '6px',
          }}
        >
          <div style={breakdownItemStyle}>
            <span>Provider Contribution</span>
            <strong>₹{providerContribution}</strong>
          </div>
          <div style={breakdownItemStyle}>
            <span>AIDDO Contribution</span>
            <strong>₹{aidcoContribution}</strong>
          </div>
        </div>
      </div>

      <div style={cardStyle}>
        <h2>Wallet</h2>
        <div style={amountGridStyle}>
          <div style={amountBoxStyle}>
            <div style={amountLabelStyle}>Available</div>
            <div style={amountValueStyle}>₹{availableWallet.toLocaleString()}</div>
          </div>
          <div style={amountBoxStyle}>
            <div style={amountLabelStyle}>Pending</div>
            <div style={{ ...amountValueStyle, color: '#ffc107' }}>₹{pending.toLocaleString()}</div>
          </div>
        </div>

        <button
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Withdraw Money
        </button>
      </div>

      <div style={cardStyle}>
        <h2>Earnings History</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Work</th>
              <th style={thStyle}>Hours</th>
              <th style={thStyle}>Rate</th>
              <th style={thStyle}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {earningsHistory.map((entry, idx) => (
              <tr key={idx}>
                <td style={tdStyle}>{entry.date}</td>
                <td style={tdStyle}>{entry.work}</td>
                <td style={tdStyle}>{entry.hours}</td>
                <td style={tdStyle}>{entry.rate}</td>
                <td style={{ ...tdStyle, fontWeight: 'bold', color: '#28a745' }}>{entry.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
