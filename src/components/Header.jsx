import React from 'react';
import '../App.css';

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <header className="header">
      <h1 className="header-title">ScreenSpot</h1>
      <input
        type="text"
        placeholder="Search for a movie"
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </header>
  );
};

export default Header;
