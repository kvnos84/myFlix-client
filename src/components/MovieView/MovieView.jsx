import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieView = ({ movies }) => {
  const { title } = useParams();
  const navigate = useNavigate();

  // Find the movie from the movies prop
  const movie = movies.find((movie) => movie.Title === title || movie.title === title);

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="movie-view">
      {movie ? (
        <>
          <h1>{movie.Title || movie.title}</h1>
          <img src={movie.ImagePath || movie.posterUrl} alt={movie.Title || movie.title} />
          <p>{movie.Description || movie.description}</p>
          <h3>Genre: {(movie.Genre && movie.Genre.Name) || movie.genre}</h3>
          <h3>Director: {(movie.Director && movie.Director.Name) || movie.director}</h3>

          <button onClick={handleBackClick}>Back to Movies</button>
        </>
      ) : (
        <p>Movie not found! Please check the movie title or go back to the main page.</p>
      )}
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      title: PropTypes.string,
      ImagePath: PropTypes.string,
      posterUrl: PropTypes.string,
      Description: PropTypes.string,
      description: PropTypes.string,
      Genre: PropTypes.shape({
        Name: PropTypes.string,
      }),
      genre: PropTypes.string,
      Director: PropTypes.shape({
        Name: PropTypes.string,
      }),
      director: PropTypes.string,
    })
  ).isRequired,
};

export default MovieView;
