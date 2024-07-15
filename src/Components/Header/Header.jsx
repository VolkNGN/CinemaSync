// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      
      <nav>
      <img src="src\Components\Assets\logo.png" alt="Logo" />
        <a href="#">Accueil</a>
        <a href="#">Mes films</a>
        <a href="#">Mes séries</a>
      </nav>
      <div className="search">
        <input type="text" placeholder="Rechercher..." />
        <div className="profile"></div>
      </div>
    </header>
  );
};

export default Header;
