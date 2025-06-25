import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import MainView from './components/MainView/MainView';

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(
  <Router>
    <MainView />
  </Router>
);
