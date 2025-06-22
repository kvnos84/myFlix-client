import React from 'react';
import { Link } from 'react-router-dom';  // Import Link component

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.title}`}>
        <img src={movie.posterUrl} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>{movie.genre}</p>
        <p>{movie.director}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
