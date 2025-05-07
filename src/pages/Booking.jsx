import React from 'react';
import CinemaHall from '../components/CinemaHall';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import movies from '../data/movies'; 

import '../App.css';

const Booking = () => {
  const { id } = useParams(); // Отримуємо id з маршруту
  const movie = movies.find((movie) => movie.id === parseInt(id)); // Знаходимо фільм за id

  return (
    <>
      <Header title={`Now booking: ${movie.title}`} />
      <CinemaHall />
    </>
  );
};

export default Booking;
