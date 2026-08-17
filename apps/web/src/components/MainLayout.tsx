import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const navLinksStyle: React.CSSProperties = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  };

  const linkStyle = (active: boolean): React.CSSProperties => ({
    textDecoration: 'none',
    color: active ? '#007bff' : '#666',
    fontWeight: active ? 'bold' : 'normal',
    borderBottom: active ? '2px solid #007bff' : 'none',
    paddingBottom: '0.5rem',
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <nav style={navigationStyle}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ margin: 0, color: '#007bff', fontSize: '1.5rem' }}>AIDDO</h1>
        </Link>

        {user ? (
          <div style={navLinksStyle}>
            {user.role === 'CUSTOMER' && (
              <>
                <Link to="/dashboard" style={linkStyle(isActive('/dashboard'))}>
                  Home
                </Link>
                <Link to="/find-help" style={linkStyle(isActive('/find-help'))}>
                  Find Help
                </Link>
                <Link to="/my-requests" style={linkStyle(isActive('/my-requests'))}>
                  My Requests
                </Link>
              </>
            )}

            {user.role === 'PROVIDER' && (
              <>
                <Link to="/provider-dashboard" style={linkStyle(isActive('/provider-dashboard'))}>
                  Home
                </Link>
                <Link to="/find-work" style={linkStyle(isActive('/find-work'))}>
                  Find Work
                </Link>
                <Link to="/my-jobs" style={linkStyle(isActive('/my-jobs'))}>
                  My Jobs
                </Link>
                <Link to="/earnings" style={linkStyle(isActive('/earnings'))}>
                  Earnings
                </Link>
              </>
            )}

            <Link to="/profile" style={linkStyle(isActive('/profile'))}>
              👤 Profile
            </Link>

            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={navLinksStyle}>
            <Link to="/login" style={linkStyle(isActive('/login'))}>
              Login
            </Link>
            <Link to="/register" style={linkStyle(isActive('/register'))}>
              Register
            </Link>
          </div>
        )}
      </nav>

      <main style={{ padding: '2rem' }}>{children}</main>
    </div>
  );
};
