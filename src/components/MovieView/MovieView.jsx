import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../api';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const MovieView = ({ movies, user, onUserUpdate }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);
  const token = localStorage.getItem('token');

  if (!movie) {
    return (
      <Container className="mt-4">
        <p>Movie not found! Please check the movie ID or go back to the main page.</p>
      </Container>
    );
  }

  const isFavorite = user?.FavoriteMovies.includes(movie._id);

  const toggleFavorite = () => {
    const url = `/users/${user.Username}/movies/${movie._id}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const request = isFavorite
      ? api.delete(url, config)
      : api.post(url, {}, config);

    request
      .then((response) => {
        alert(isFavorite ? 'Removed from favorites.' : 'Added to favorites.');
        onUserUpdate(response.data);
      })
      .catch((error) => {
        console.error('Error updating favorite status:', error);
        alert('Failed to update favorite status.');
      });
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={movie.ImagePath || movie.posterUrl}
              alt={movie.Title || movie.title}
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
            <Card.Body>
              <Card.Title>{movie.Title || movie.title}</Card.Title>
              <Card.Text>{movie.Description || movie.description}</Card.Text>
              <Card.Text>
                <strong>Genre:</strong>{' '}
                {(movie.Genre && movie.Genre.Name) || movie.genre}
              </Card.Text>
              <Card.Text>
                <strong>Director:</strong>{' '}
                {(movie.Director && movie.Director.Name) || movie.director}
              </Card.Text>

              {user && (
                <Button
                  variant={isFavorite ? 'danger' : 'primary'}
                  onClick={toggleFavorite}
                  className="me-2 mb-2"
                >
                  {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
                </Button>
              )}

              <Button variant="secondary" as={Link} to="/">
                Back to Movies
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
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
  user: PropTypes.object.isRequired,
  onUserUpdate: PropTypes.func.isRequired
};

export default MovieView;
