import React from 'react';

const formatShowtime = (Newdate) => {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return new Date(Newdate).toLocaleDateString('en-US', options);
};

const MovieCard = ({ movie }) => {
  return (
    <div 
      className="movie-card" 
      style={{ backgroundImage: `url(${movie.poster})` }}
    >
      <div className="movie-details">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-description">{movie.description}</p>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-showtime">Showtime: {formatShowtime(movie.showtime)}</p>
      </div>
    </div>
  );
};

export default MovieCard;
