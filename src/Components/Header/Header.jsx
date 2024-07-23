import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../Assets/logo.png';
import profileImage from '../Assets/token Sidney.png';

const Header = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search query:', query); // Ajout du console.log pour vérifier la recherche
        onSearch(query);
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <p className="moviesync">Moviesync</p>
            <nav>
                <ul className="header-nav">
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/my-movies">Ma Watchlist</Link></li>
                </ul>
            </nav>
            <div className="search">
                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="search"
                        name="search"
                        value={query}
                        onChange={handleInputChange}
                        required
                    />
                    <button className="search-btn" type="submit">
                        <span>Search</span>
                    </button>
                </form>
            </div>
            <div className="profile">
                <Link to="/profile">
                    <img src={profileImage} alt="Profile" />
                </Link>
            </div>
        </header>
    );
};

export default Header;
