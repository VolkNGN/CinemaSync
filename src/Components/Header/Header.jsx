// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <img src="src\\Components\\Assets\\logo.png" alt="Logo" />
        <a href="#">Accueil</a>
        <a href="#">Mes films</a>
        <a href="#">Mes séries</a>
      </nav>
      <div className="search">
        <form action="" className="search-bar">
          <input type="search" name="search" pattern=".*\S.*" required />
          <button className="search-btn" type="submit">
            <span>Search</span>
          </button>
        </form>
        <div className="profile"></div>
      </div>
    </header>
  );
};

export default Header;
