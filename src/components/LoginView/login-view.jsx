import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export function LoginView({ onLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here you would do your authentication logic (e.g., API call)
    // For now, let's just simulate success and call onLoggedIn:

    const userData = { Username: username }; // adjust if your user object is different
    const token = 'mock-token'; // replace with real token from API

    onLoggedIn(userData, token);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <Form.Group controlId="formUsername" className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}
