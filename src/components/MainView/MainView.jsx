import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'react-bootstrap'; // Added Button here

import LoginView from '../LoginView/login-view.jsx';
import SignupView from '../SignupView/signup-view.jsx';

const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
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
    setToken(null);
    setUser(null);
    setMovies([]);
  };

  // Show login or signup if no token
  if (!token) {
    return (
      <div>
        {showSignup ? (
          <SignupView onSignup={() => setShowSignup(false)} />
        ) : (
          <LoginView
            onLogin={(userData, userToken) => {
              setUser(userData);
              setToken(userToken);
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
        )}

        <Button
          variant="secondary"
          onClick={() => setShowSignup(!showSignup)}
          className="mt-3"
        >
          {showSignup ? 'Back to Login' : 'Sign Up'}
        </Button>
      </div>
    );
  }

  // Logged-in view with Bootstrap layout and components
  return (
    <Row className="justify-content-center mt-4">
      <Col md={8}>
        <h1>Welcome to myFlix, {user.Username}!</h1>

        <Button
          variant="primary"
          onClick={handleLogout}
          className="mb-3"
        >
          Logout
        </Button>

        <div>
          {movies.length === 0 ? (
            <p>Loading movies...</p>
          ) : (
            movies.map((movie) => (
              <Card key={movie._id} className="mb-3 custom-card">
                {movie.ImagePath && <Card.Img variant="top" src={movie.ImagePath} />}
                <Card.Body>
                  <Card.Title>{movie.Title || movie.title}</Card.Title>
                  <Card.Text>{movie.Description || movie.description}</Card.Text>
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      </Col>
    </Row>
  );
};

MainView.propTypes = {
  // movies prop is no longer passed from parent; fetched internally
};

export default MainView;
