import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("React is rendering...");

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Enable performance reporting
reportWebVitals();
