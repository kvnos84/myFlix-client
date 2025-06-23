import { createRoot } from 'react-dom/client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Bootstrap styles
import './index.scss';
import App from './App';
import { Container } from 'react-bootstrap'; // ✅ Import Container
import MainView from './components/MainView/MainView'; // ✅ Adjust path if needed

const MyFlixApplication = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

// Find root and render app
const container = document.querySelector('#root');
const root = createRoot(container);

// You can switch this to MyFlixApplication if you're not using App yet
root.render(<App />);
