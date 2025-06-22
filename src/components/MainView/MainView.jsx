import React, { useState } from 'react';

const MainView = () => {
  const [movies] = useState([
    { _id: 1, title: 'Inception', description: 'A mind-bending thriller by Christopher Nolan.' },
    { _id: 2, title: 'The Matrix', description: 'A hacker discovers the nature of reality.' },
    { _id: 3, title: 'Interstellar', description: 'Explorers travel through a wormhole in space.' }
  ]);

  return (
    <div>
      <h1>Welcome to myFlix</h1>
      <div>
        {movies.map((movie) => (
          <div key={movie._id} style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainView;
