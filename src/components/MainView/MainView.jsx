import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import LoginView from '../LoginView/login-view.jsx';
import SignupView from '../SignupView/signup-view.jsx';

const MainView = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // Load token and user from localStorage on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));

      // Fetch movies with token authorization
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
          // Optionally handle invalid token by logging out
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
          <SignupView
            onSignup={() => setShowSignup(false)} // switch back to login after signup
          />
        ) : (
          <LoginView
            onLogin={(userData, userToken) => {
              setUser(userData);
              setToken(userToken);
              localStorage.setItem('token', userToken);
              localStorage.setItem('user', JSON.stringify(userData));

              // Fetch movies after login
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

        <button onClick={() => setShowSignup(!showSignup)} style={{ marginTop: '1rem' }}>
          {showSignup ? 'Back to Login' : 'Sign Up'}
        </button>
      </div>
    );
  }

  // When logged in, show movies and logout button
  return (
    <div>
      <h1>Welcome to myFlix, {user.Username}!</h1>

      <button onClick={handleLogout} style={{ marginBottom: '1rem' }}>
        Logout
      </button>

      <div>
        {movies.length === 0 ? (
          <p>Loading movies...</p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie._id}
              style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}
            >
              <h2>{movie.Title || movie.title}</h2>
              <p>{movie.Description || movie.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

MainView.propTypes = {
  // movies prop is no longer passed from parent; fetched internally
};

export default MainView;
