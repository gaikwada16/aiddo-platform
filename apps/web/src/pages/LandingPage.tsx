import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    { emoji: '🔧', name: 'Electrician' },
    { emoji: '🧹', name: 'Cleaning' },
    { emoji: '📦', name: 'Loading/Unloading' },
    { emoji: '🚚', name: 'Delivery' },
    { emoji: '🛠️', name: 'Repair' },
    { emoji: '👷', name: 'General Helper' },
    { emoji: '💻', name: 'Technical Work' },
    { emoji: '🏠', name: 'Home Services' },
  ];

  const heroStyle: React.CSSProperties = {
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '4rem 2rem',
    textAlign: 'center',
    borderRadius: '8px',
    marginBottom: '3rem',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  };

  const taglineStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    opacity: 0.95,
  };

  const searchContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr auto',
    gap: '1rem',
    maxWidth: '600px',
    margin: '0 auto 2rem',
  };

  const inputStyle: React.CSSProperties = {
    padding: '0.75rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  };

  const ctaContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    maxWidth: '400px',
    margin: '0 auto',
  };

  const ctaButtonStyle: React.CSSProperties = {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  };

  const servicesGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
    marginBottom: '3rem',
  };

  const serviceCardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  };

  const emojiStyle: React.CSSProperties = {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={heroStyle}>
        <h1 style={headingStyle}>AIDDO</h1>
        <p style={taglineStyle}>Get Work. Give Work. Grow Together.</p>

        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="What service do you need?"
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Where?"
            style={inputStyle}
          />
          <button style={buttonStyle}>Find Help</button>
        </div>

        <div style={ctaContainerStyle}>
          <button
            onClick={() => navigate('/register?role=CUSTOMER')}
            style={{
              ...ctaButtonStyle,
              backgroundColor: '#28a745',
              color: 'white',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            I NEED HELP
          </button>
          <button
            onClick={() => navigate('/register?role=PROVIDER')}
            style={{
              ...ctaButtonStyle,
              backgroundColor: '#ffc107',
              color: '#333',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            I WANT WORK
          </button>
        </div>
      </div>

      <div>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Popular Services</h2>
        <div style={servicesGridStyle}>
          {services.map((service) => (
            <div
              key={service.name}
              style={serviceCardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={emojiStyle}>{service.emoji}</div>
              <p style={{ margin: 0, fontWeight: '500' }}>{service.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: '4rem',
          padding: '2rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '8px',
          textAlign: 'center',
        }}
      >
        <h3>How AIDDO Works</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginTop: '1.5rem',
          }}
        >
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
            <h4>1. Find Services</h4>
            <p>Search for the service you need nearby</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👤</div>
            <h4>2. Connect</h4>
            <p>Chat and coordinate with providers</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
            <h4>3. Work & Rate</h4>
            <p>Complete work and leave honest reviews</p>
          </div>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
            <h4>4. Pay Securely</h4>
            <p>Safe transactions through AIDDO wallet</p>
          </div>
        </div>
      </div>
    </div>
  );
};
