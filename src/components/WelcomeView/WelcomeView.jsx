// src/components/WelcomeView/WelcomeView.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const WelcomeView = () => (
  <Container className="text-center mt-5">
    <h1>Welcome to myFlix!</h1>
    <p>Sign up or log in to get started.</p>
    <div className="d-flex justify-content-center gap-3 mt-3">
      <Link to="/login"><Button variant="primary">Login</Button></Link>
      <Link to="/signup"><Button variant="secondary">Sign Up</Button></Link>
    </div>
  </Container>
);

export default WelcomeView;