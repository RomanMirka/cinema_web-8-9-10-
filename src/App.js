import React from 'react';
import MovieList from './components/MovieList.jsx';
import movies from './data/movies';

import './App.css';

const App = () => {
  return (
    <div className="app">
      <MovieList movies={movies} />
    </div>
  );
};

export default App;