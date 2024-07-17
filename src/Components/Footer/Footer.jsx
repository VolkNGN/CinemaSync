// src/Components/Footer/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Assurez-vous que le fichier CSS est correctement importé
import logo from '../Assets/logo.png'; // Assurez-vous que le chemin du logo est correct

const Footer = () => {
    return (
        <footer className="footer">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="footer-nav">
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/about">À propos</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
