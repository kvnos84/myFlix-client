import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Import useParams and useNavigate

const MovieView = () => {
  const { title } = useParams();  // Extract the movie title from the URL
  const navigate = useNavigate();  // Get the navigate function

  // Here, we would normally fetch movie data from state or an API, but for simplicity, let's assume you have the movie data locally.
  const movies = [
    {
      title: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years...',
      genre: 'Drama',
      director: 'Frank Darabont',
      posterUrl: 'https://path-to-your-poster-image.jpg'  // Replace with a valid image URL
    },
    {
      title: 'The Godfather',
      description: 'The aging patriarch of an organized crime dynasty...',
      genre: 'Crime',
      director: 'Francis Ford Coppola',
      posterUrl: 'https://path-to-your-poster-image.jpg'  // Replace with a valid image URL
    },
    {
      title: 'The Dark Knight',
      description: 'When the menace known as The Joker emerges from his mysterious past...',
      genre: 'Action',
      director: 'Christopher Nolan',
      posterUrl: 'https://path-to-your-poster-image.jpg'  // Replace with a valid image URL
    }
  ];

  // Find the movie based on the title from the URL
  const movie = movies.find((movie) => movie.title === title);

  // Navigate back to the main view
  const handleBackClick = () => {
    navigate('/');  // Navigate to the root URL (MainView)
  };

  return (
    <div className="movie-view">
      {movie ? (
        <>
          <h1>{movie.title}</h1>
          <img src={movie.posterUrl} alt={movie.title} />
          <p>{movie.description}</p>
          <h3>Genre: {movie.genre}</h3>
          <h3>Director: {movie.director}</h3>

          {/* Back Button */}
          <button onClick={handleBackClick}>Back to Movies</button>
        </>
      ) : (
        <p>Movie not found! Please check the movie title or go back to the main page.</p>
      )}
    </div>
  );
};

export default MovieView;
