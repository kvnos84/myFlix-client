import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.Title || movie.title}`}>
        <img src={movie.ImagePath || movie.posterUrl} alt={movie.Title || movie.title} />
        <h2>{movie.Title || movie.title}</h2>
        <p>{movie.Genre?.Name || movie.genre}</p>
        <p>{movie.Director?.Name || movie.director}</p>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    title: PropTypes.string,
    ImagePath: PropTypes.string,
    posterUrl: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    genre: PropTypes.string,
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
    director: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
