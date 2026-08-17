import React from 'react';
import { useAuth } from '../lib/auth';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  const profileStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
  };

  const cardStyle: React.CSSProperties = {
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem',
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#333',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  };

  const statsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    marginTop: '2rem',
  };

  const statCardStyle: React.CSSProperties = {
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
    border: '1px solid #ddd',
    textAlign: 'center',
  };

  const statLabelStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    color: '#666',
    marginBottom: '0.5rem',
  };

  const statValueStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#007bff',
  };

  return (
    <div style={profileStyle}>
      <h1>Profile Settings</h1>

      <div style={cardStyle}>
        <h2>Account Information</h2>

        <div style={fieldStyle}>
          <label style={labelStyle}>Email</label>
          <input type="email" value={user?.email} disabled style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Name</label>
          <input type="text" value={user?.name} disabled style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Role</label>
          <input type="text" value={user?.role} disabled style={inputStyle} />
        </div>

        <button style={buttonStyle}>Edit Profile</button>
      </div>

      {user?.role === 'PROVIDER' && (
        <div style={cardStyle}>
          <h2>Provider Information</h2>

          <div style={fieldStyle}>
            <label style={labelStyle}>Category</label>
            <input type="text" placeholder="e.g., Electrician" style={inputStyle} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Hourly Rate (₹)</label>
            <input type="number" placeholder="e.g., 300" style={inputStyle} />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Bio</label>
            <textarea
              placeholder="Tell customers about yourself..."
              style={{ ...inputStyle, minHeight: '100px', fontFamily: 'inherit' }}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Skills (comma-separated)</label>
            <input
              type="text"
              placeholder="e.g., Electrical repair, Wiring, Installation"
              style={inputStyle}
            />
          </div>

          <button style={buttonStyle}>Update Provider Info</button>

          <div style={statsGridStyle}>
            <div style={statCardStyle}>
              <div style={statLabelStyle}>Rating</div>
              <div style={statValueStyle}>4.8</div>
            </div>
            <div style={statCardStyle}>
              <div style={statLabelStyle}>Jobs Completed</div>
              <div style={statValueStyle}>150</div>
            </div>
            <div style={statCardStyle}>
              <div style={statLabelStyle}>Punctuality</div>
              <div style={statValueStyle}>96%</div>
            </div>
            <div style={statCardStyle}>
              <div style={statLabelStyle}>Completion</div>
              <div style={statValueStyle}>98%</div>
            </div>
          </div>
        </div>
      )}

      <div style={cardStyle}>
        <h2>Preferences</h2>

        <div style={fieldStyle}>
          <label style={{ ...labelStyle, marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
            Receive notifications
          </label>
        </div>

        <div style={fieldStyle}>
          <label style={{ ...labelStyle, marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" defaultChecked style={{ marginRight: '0.5rem' }} />
            Receive job offers
          </label>
        </div>

        <div style={fieldStyle}>
          <label style={{ ...labelStyle, marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" style={{ marginRight: '0.5rem' }} />
            Marketing emails
          </label>
        </div>

        <button style={buttonStyle}>Save Preferences</button>
      </div>

      <div style={cardStyle}>
        <h2>Security</h2>

        <div style={fieldStyle}>
          <label style={labelStyle}>Current Password</label>
          <input type="password" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>New Password</label>
          <input type="password" style={inputStyle} />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Confirm Password</label>
          <input type="password" style={inputStyle} />
        </div>

        <button style={buttonStyle}>Change Password</button>
      </div>
    </div>
  );
};
