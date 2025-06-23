import { createRoot } from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import App from './App'; // You can remove this import if not using App now
import { Container } from 'react-bootstrap';
import MainView from './components/MainView/MainView';
import { BrowserRouter as Router } from 'react-router-dom';

const MyFlixApplication = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(
  <Router>
    <MyFlixApplication />
  </Router>
);
