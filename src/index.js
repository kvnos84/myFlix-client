import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss'; // or './styles/custom.scss' depending on your file path

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("React is rendering...");

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Enable performance reporting
reportWebVitals();
