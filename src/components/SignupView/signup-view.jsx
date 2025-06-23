import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

const SignupView = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    birthday: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    fetch('https://movie-api-1kah.onrender.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Signup failed');
        }
        return response.json();
      })
      .then(() => {
        setMessage('Signup successful! You can now log in.');
      })
      .catch(error => {
        setMessage(error.message);
      });
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-4">Sign Up</h2>

        {message && <Alert variant="info">{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBirthday" className="mb-3">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SignupView;
