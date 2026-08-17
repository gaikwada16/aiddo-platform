import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (
  <main style={{ fontFamily: 'sans-serif', padding: '2rem', lineHeight: 1.6 }}>
    <h1>AIDDO Admin</h1>
    <p>Operations and compliance dashboard.</p>
  </main>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
