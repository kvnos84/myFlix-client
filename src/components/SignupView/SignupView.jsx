import api from '../../api';
import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignupView = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    birthday: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

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
  setMessage('');
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});
  setSubmitting(true);

  // 🔧 Create payload with capitalized keys
  const payload = {
    Username: formData.username,
    Password: formData.password,
    Email: formData.email,
    Birthday: new Date(formData.birthday).toISOString().split('T')[0] // format to 'YYYY-MM-DD'
  };

  api.post('/users', payload)
    .then(response => {
      setMessage('Signup successful! Please log in.');
      setSubmitting(false);
      setTimeout(() => navigate('/login'), 1500);
    })
    .catch(error => {
      console.error('Signup error:', error);
      setMessage('Signup failed. Please try again.');
      setSubmitting(false);
    });
};

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-4">Sign Up</h2>
        {message && <Alert variant={message.startsWith('Signup successful') ? 'success' : 'danger'}>{message}</Alert>}
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
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
          <div className="d-grid">
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default SignupView;
