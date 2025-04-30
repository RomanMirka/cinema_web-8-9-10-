import React from 'react';
import MovieList from './components/MovieList.jsx';
import movies from './data/movies';

import './App.css';

const App = () => {
  return (
    <>
      <MovieList movies={movies} /> // Передаю у компонент MovieList массив movies 
    </>
  );
};

export default App;

