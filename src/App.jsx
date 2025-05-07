import React from 'react';
import './App.css'; // Your styles, if any
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Router components
import MainView from './components/MainView/MainView'; // Import your MainView component
import MovieView from './components/MovieView/MovieView'; // Import your MovieView component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Adding a simple heading to confirm the app is rendering */}
        <h1>Welcome to MyFlix!</h1>

        {/* Define the routes for different views */}
        <Routes>
          {/* Route for MainView */}
          <Route path="/" element={<MainView />} />
          
          {/* Route for MovieView with a dynamic title */}
          <Route path="/movie/:title" element={<MovieView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
