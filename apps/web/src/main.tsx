import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/auth';
import { MainLayout } from './components/MainLayout';
import { AuthPage } from './components/AuthPage';
import { LandingPage } from './pages/LandingPage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { ProviderDashboard } from './pages/ProviderDashboard';
import { EarningsPage } from './pages/EarningsPage';
import { ProfilePage } from './pages/ProfilePage';

const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: string }> = ({
  children,
  role,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={user ? <Navigate to={user.role === 'CUSTOMER' ? '/dashboard' : '/provider-dashboard'} /> : <LandingPage />}
      />

      <Route
        path="/login"
        element={
          user ? <Navigate to={user.role === 'CUSTOMER' ? '/dashboard' : '/provider-dashboard'} /> : <AuthPage onAuthSuccess={() => {}} />
        }
      />

      <Route
        path="/register"
        element={
          user ? <Navigate to={user.role === 'CUSTOMER' ? '/dashboard' : '/provider-dashboard'} /> : <AuthPage onAuthSuccess={() => {}} />
        }
      />

      {/* Protected customer routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="CUSTOMER">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/find-help"
        element={
          <ProtectedRoute role="CUSTOMER">
            <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
              <h1>Find Help</h1>
              <p>Search for services coming soon...</p>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-requests"
        element={
          <ProtectedRoute role="CUSTOMER">
            <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
              <h1>My Requests</h1>
              <p>Your job requests will appear here.</p>
            </div>
          </ProtectedRoute>
        }
      />

      {/* Protected provider routes */}
      <Route
        path="/provider-dashboard"
        element={
          <ProtectedRoute role="PROVIDER">
            <ProviderDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/find-work"
        element={
          <ProtectedRoute role="PROVIDER">
            <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
              <h1>Find Work</h1>
              <p>Available work opportunities coming soon...</p>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-jobs"
        element={
          <ProtectedRoute role="PROVIDER">
            <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
              <h1>My Jobs</h1>
              <p>Your accepted jobs will appear here.</p>
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/earnings"
        element={
          <ProtectedRoute role="PROVIDER">
            <EarningsPage />
          </ProtectedRoute>
        }
      />

      {/* Protected shared routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </AuthProvider>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
