import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';

import { NavigationBar } from '../navigation-bar/navigation-bar';  // <-- Import NavigationBar

import LoginView from '../LoginView/login-view.jsx';
import SignupView from '../SignupView/signup-view.jsx';
import MovieView from '../MovieView/movie-view.jsx';
import ProfileView from '../ProfileView/profile-view.jsx';

// New component to list movies, extracted from your previous render logic
const MoviesList = ({ movies, user, handleLogout }) => {
  if (movies.length === 0) {
    return <p>Loading movies...</p>;
  }

  return (
    <>
      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <h1>Welcome to myFlix, {user.Username}!</h1>

          <Button variant="primary" onClick={handleLogout} className="mb-3">
            Logout
          </Button>

          {movies.map((movie) => (
            <Card key={movie._id} className="mb-3 custom-card">
              {movie.ImagePath && <Card.Img variant="top" src={movie.ImagePath} />}
              <Card.Body>
                <Card.Title>{movie.Title || movie.title}</Card.Title>
                <Card.Text>{movie.Description || movie.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

const MainView = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));

      fetch('https://your-api-url/movies', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch movies');
          }
          return response.json();
        })
        .then((data) => {
          setMovies(data);
        })
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

  return (
    <>
      <NavigationBar user={user} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={user ? <MoviesList movies={movies} user={user} handleLogout={handleLogout} /> : <Navigate to="/login" />}
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
                    if (!response.ok) {
                      throw new Error('Failed to fetch movies');
                    }
                    return response.json();
                  })
                  .then((data) => {
                    setMovies(data);
                  })
                  .catch((error) => {
                    console.error('Error fetching movies:', error);
                  });
              }}
            />
          }
        />

        <Route path="/signup" element={<SignupView />} />

        <Route path="/movies/:movieId" element={<MovieView movies={movies} />} />

        <Route path="/profile" element={<ProfileView user={user} />} />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

MainView.propTypes = {
  // No props expected here, internal state used
};

export default MainView;
