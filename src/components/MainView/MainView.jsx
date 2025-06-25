import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';

import { NavigationBar } from '../navigation-bar/navigation-bar';
import LoginView from './components/LoginView/LoginView';
import SignupView from './components/SignupView/SignupView';
import MovieView from '../MovieView/movie-view.jsx';
import ProfileView from '../ProfileView/profile-view.jsx';
import MovieCard from '../movie-card/movie-card';

const MoviesList = ({ movies, user, handleLogout, onUserUpdate }) => {
  if (movies.length === 0) {
    return (
      <Container className="mt-5">
        <p>Loading movies...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Welcome to myFlix, {user.Username}!</h2>
          <Button variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row>
        {movies.map((movie) => (
          <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="p-2">
                <MovieCard
                  movie={movie}
                  user={user}
                  onUserUpdate={onUserUpdate}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  onUserUpdate: PropTypes.func.isRequired,
};

const MainView = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      fetch('https://your-api-url/movies', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((response) => {
          if (!response.ok) throw new Error('Failed to fetch movies');
          return response.json();
        })
        .then((data) => setMovies(data))
        .catch((error) => {
          console.error('Error fetching movies:', error);
          handleLogout();
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setMovies([]);
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <>
      <NavigationBar user={user} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <MoviesList
                movies={movies}
                user={user}
                handleLogout={handleLogout}
                onUserUpdate={handleUserUpdate}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={
            <LoginView
              onLogin={(userData, userToken) => {
                setUser(userData);
                localStorage.setItem('token', userToken);
                localStorage.setItem('user', JSON.stringify(userData));

                fetch('https://your-api-url/movies', {
                  headers: { Authorization: `Bearer ${userToken}` },
                })
                  .then((response) => {
                    if (!response.ok) throw new Error('Failed to fetch movies');
                    return response.json();
                  })
                  .then((data) => setMovies(data))
                  .catch((error) => console.error('Error fetching movies:', error));
              }}
            />
          }
        />

        <Route path="/signup" element={<SignupView />} />

        <Route
          path="/movies/:movieId"
          element={
            <MovieView
              movies={movies}
              user={user}
              onUserUpdate={handleUserUpdate}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <ProfileView
              user={user}
              movies={movies}
              onUserUpdate={handleUserUpdate}
              onLogout={handleLogout}
            />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default MainView;
