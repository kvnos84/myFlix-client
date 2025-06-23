import React, { useState } from 'react';

const SignupView = () => {
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    birthday: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Basic validation function
  const validate = () => {
    const errors = {};

    if (!formData.username) errors.username = 'Username is required';
    if (!formData.password) errors.password = 'Password is required';
    if (!formData.email) errors.email = 'Email is required';
    // Simple email regex
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

    // Clear errors
    setErrors({});

    // Call your API to create the user
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
      .then(data => {
        setMessage('Signup successful! You can now log in.');
        // Optionally, redirect to login page or auto-login
      })
      .catch(error => {
        setMessage(error.message);
      });
  };

  return (
    <div>
      <h2>Sign Up</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div>
          <label>Birthday:</label>
          <input
            name="birthday"
            type="date"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupView;
