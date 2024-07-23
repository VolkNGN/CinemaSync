import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../Assets/logo.png';
import profileImage from '../Assets/token Sidney.png';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <p className="moviesync">Moviesync</p>
            <nav>
    <ul class="header-nav">
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/my-movies">Ma Watchlist</Link></li>
    </ul>
</nav>
            <div className="search">
                <form action="" className="search-bar">
                    <input type="search" name="search" pattern=".*\\S.*" required />
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
