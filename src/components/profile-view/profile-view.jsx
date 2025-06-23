import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Row, Col, Container } from 'react-bootstrap';
import MovieCard from '../movie-card/movie-card';

export const ProfileView = ({ user, movies, onUserUpdate, onLogout }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  });

  useEffect(() => {
    if (user) {
      axios.get(`/users/${user.Username}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(response => {
        setUserInfo(response.data);
        setFormData({
          Username: response.data.Username,
          Password: '',
          Email: response.data.Email,
          Birthday: response.data.Birthday ? response.data.Birthday.substring(0,10) : '',
        });
      })
      .catch(e => console.error(e));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUserUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      Username: formData.Username,
      Email: formData.Email,
      Birthday: formData.Birthday,
    };

    if (formData.Password) {
      updatedData.Password = formData.Password;
    }

    axios.put(`/users/${user.Username}`, updatedData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then(response => {
      alert('Profile updated successfully!');
      setUserInfo(response.data);
      onUserUpdate(response.data);
    })
    .catch(e => alert('Update failed.'));
  };

  const handleUserDelete = () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return;

    axios.delete(`/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then(() => {
      alert('Account deleted.');
      onLogout();
    })
    .catch(e => alert('Deletion failed.'));
  };

  const favoriteMovies = movies.filter(m => userInfo?.FavoriteMovies.includes(m._id));

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Profile Info</Card.Title>
              <Form onSubmit={handleUserUpdate}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="Username"
                    value={formData.Username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBirthday" className="mb-3">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    name="Birthday"
                    value={formData.Birthday}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">Update Profile</Button>
              </Form>

              <Button variant="danger" className="mt-3" onClick={handleUserDelete}>
                Delete Account
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mt-4 mt-md-0">
          <h3>Favorite Movies</h3>
          <Row>
            {favoriteMovies.map(movie => (
              <Col key={movie._id} sm={6} md={4} className="mb-3">
                <MovieCard movie={movie} user={user} onUserUpdate={onUserUpdate} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
