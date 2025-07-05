import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from '../NavigationBar/NavigationBar';
import LoginView from '../LoginView/LoginView';
import SignupView from '../SignupView/SignupView';
import MovieView from '../MovieView/MovieView';
import ProfileView from '../ProfileView/ProfileView';
import MovieCard from '../MovieCard/MovieCard';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { apiUrl } from '../../../env';

const MoviesList = ({ movies, user, handleLogout, onUserUpdate }) => {
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
                <MovieCard movie={movie} user={user} onUserUpdate={onUserUpdate} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

const MainView = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = (token) => {
  console.log("🎯 Fetching movies with token:", token); // ✅ log the token
  setLoading(true);
  fetch(`${apiUrl}/movies`, {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      if (!response.ok) {
        console.error("❌ Server responded with:", response.status, response.statusText);
        throw new Error('Failed to fetch movies');
      }
      return response.json();
    })
    .then((data) => {
      console.log("✅ Movies fetched:", data);
      setMovies(data);
    })
    .catch((error) => {
      console.error('🚨 Error fetching movies:', error.message || error);
      handleLogout();
    })
    .finally(() => setLoading(false));
  };


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchMovies(storedToken);
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

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={
          <LoginView
            onLogin={(userData, userToken) => {
              setUser(userData);
              localStorage.setItem('token', userToken);
              localStorage.setItem('user', JSON.stringify(userData));
              fetchMovies(userToken);
            }}
          />
        } />
        <Route path="/signup" element={<SignupView />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (loading || movies.length === 0) {
    return (
      <>
        <NavigationBar user={user} onLogout={handleLogout} />
        <Container className="text-center mt-5">
          <Spinner animation="border" />
          <p>Loading movies...</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavigationBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={
          <MoviesList
            movies={movies}
            user={user}
            handleLogout={handleLogout}
            onUserUpdate={handleUserUpdate}
          />
        } />
        <Route path="/movies/:movieId" element={
          <MovieView movies={movies} user={user} onUserUpdate={handleUserUpdate} />
        } />
        <Route path="/profile" element={
          <ProfileView user={user} movies={movies} onUserUpdate={handleUserUpdate} onLogout={handleLogout} />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default MainView;
