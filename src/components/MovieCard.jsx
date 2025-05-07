import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate(); 

  const handleBookingClick = () => {
    navigate(`/booking/${movie.id}`); 
  };

  return (
    <div 
      className="movie-card" 
      style={{ backgroundImage: `url(${movie.poster})` }}
      onClick={handleBookingClick} 
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
