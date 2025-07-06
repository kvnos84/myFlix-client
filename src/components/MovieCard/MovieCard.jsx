import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import api from '../../api';

const MovieCard = ({ movie, user, onUserUpdate }) => {
  const isFavorite = user?.FavoriteMovies?.includes(movie._id);

  const toggleFavorite = () => {
    const url = `/users/${user.Username}/movies/${movie._id}`;
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    const request = isFavorite
      ? api.delete(url, config)
      : api.post(url, {}, config);

    request
      .then((response) => {
        onUserUpdate(response.data);
      })
      .catch((error) => {
        console.error('Error updating favorite status:', error);
        alert('Failed to update favorites.');
      });
  };

  return (
    <Card className="h-100">
      <Link to={`/movies/${movie._id}`}>
        <Card.Img
          variant="top"
          src={movie.ImagePath || movie.posterUrl}
          alt={movie.Title || movie.title}
          style={{ height: '300px', objectFit: 'cover' }}
        />
      </Link>

      <Card.Body>
        <Link to={`/movies/${movie._id}`} className="text-decoration-none text-dark">
          <Card.Title>{movie.Title || movie.title}</Card.Title>
          <Card.Text className="mb-1 text-muted">
            Genre: {movie.Genre?.Name || movie.genre}
          </Card.Text>
          <Card.Text className="mb-2 text-muted">
            Director: {movie.Director?.Name || movie.director}
          </Card.Text>
        </Link>

        {user && (
          <Button
            variant={isFavorite ? 'danger' : 'primary'}
            onClick={toggleFavorite}
            className="w-100 mt-2"
          >
            {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
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
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string)
  }),
  onUserUpdate: PropTypes.func
};

export default MovieCard;
