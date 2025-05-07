import React from 'react';
import MovieList from '../components/MovieList';
import movies from '../data/movies'; 

import '../App.css';

const Home = () => {
  return (
    <>
      <MovieList movies={movies} /> {/* Передаємо масив фільмів у компонент MovieList */}
    </>
  );
};

export default Home;

