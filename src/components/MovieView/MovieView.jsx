import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  // Find the movie by _id
  const movie = movies.find((movie) => movie._id === movieId);

  return (
    <div className="movie-view">
      {movie ? (
        <>
          <h1>{movie.Title || movie.title}</h1>
          <img src={movie.ImagePath || movie.posterUrl} alt={movie.Title || movie.title} />
          <p>{movie.Description || movie.description}</p>
          <h3>Genre: {(movie.Genre && movie.Genre.Name) || movie.genre}</h3>
          <h3>Director: {(movie.Director && movie.Director.Name) || movie.director}</h3>

          <Button variant="secondary">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Back to Movies
            </Link>
          </Button>
        </>
      ) : (
        <p>Movie not found! Please check the movie ID or go back to the main page.</p>
      )}
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
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
