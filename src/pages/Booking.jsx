import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import Header from '../components/Header';
import BookingService from '../components/BookingService';
import movies from '../data/movies';

import '../App.css';

const Booking = () => {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null); 
  const [seats, setSeats] = useState([]); 

  useEffect(() => {
    const fetchMovieAndSeats = async () => {
      const fetchedMovie = movies.find((movie) => movie.id === parseInt(id)); 
      setMovie(fetchedMovie);

      try {
        const seatsData = await BookingService.getSeats(id);
        setSeats(seatsData);
      } catch (error) {
        console.error("Error loading seats:", error);
      }
    };

    fetchMovieAndSeats();
  }, [id]);

  return (
    <>
      <Header title={`Now booking: ${movie?.title}`} />
      <CinemaHall seats={seats} />
    </>
  );
};

export default Booking;
