import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainView from './components/MainView/MainView';
import MovieView from './components/MovieView/MovieView';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://movie-api-1kah.onrender.com/movies')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then(data => {
        setMovies(data);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to MyFlix!</h1>
        </header>

        <Routes>
          <Route path="/" element={<MainView movies={movies} />} />
          <Route path="/movie/:title" element={<MovieView movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
