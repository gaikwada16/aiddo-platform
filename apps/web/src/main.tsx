import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (
  <main style={{ fontFamily: 'sans-serif', padding: '2rem', lineHeight: 1.6 }}>
    <h1>AIDDO Platform</h1>
    <p>AI-powered person-to-person service marketplace.</p>
    <p>Web app foundation is running.</p>
  </main>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
