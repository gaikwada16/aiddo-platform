import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider, useAuth } from './lib/auth';
import { AuthPage } from './components/AuthPage';
import { JobDashboard } from './components/JobDashboard';

const AppContent = () => {
  const { user } = useAuth();
  const [showDashboard, setShowDashboard] = React.useState(!!user);

  React.useEffect(() => {
    setShowDashboard(!!user);
  }, [user]);

  return showDashboard && user ? (
    <JobDashboard />
  ) : (
    <AuthPage
      onAuthSuccess={() => {
        setShowDashboard(true);
      }}
    />
  );
};

const App = () => (
  <AuthProvider>
    <div style={{ fontFamily: 'sans-serif', lineHeight: 1.6, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AppContent />
    </div>
  </AuthProvider>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
