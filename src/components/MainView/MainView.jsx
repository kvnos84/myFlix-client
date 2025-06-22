import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MainView = ({ movies }) => {
  return (
    <div>
      <h1>Welcome to myFlix</h1>
      <div>
        {movies.length === 0 ? (
          <p>Loading movies...</p>
        ) : (
          movies.map((movie) => (
            <div key={movie._id || movie._id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
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
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      Title: PropTypes.string,
      title: PropTypes.string,
      Description: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default MainView;
