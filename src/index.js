import React from 'react';
import ReactDOM from 'react-dom/client';
import MainView from './components/MainView/MainView';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("React is rendering...");

root.render(<MainView />);
