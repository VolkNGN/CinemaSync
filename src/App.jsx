// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import FavoriteMovies from './Components/FavoriteMovies';
import ProfilePage from './Components/profil/ProfilePage';
import SuggestionsCarousel from './Components/SuggestionsCarousel/SuggestionsCarousel';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Footer from './Components/Footer/Footer';
import './App.css';

const App = () => {
    const tmdbApiKey = '7b45af8f71d63d716fa486d7d0abb8bd'; // Clé API TMDB
    const youtubeApiKey = 'AIzaSyDIGqLiH3uOgyP3ZekG62cGXWSs-HvsLRs'; // Clé API YouTube IFrame

    return (
        
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<SuggestionsCarousel tmdbApiKey={tmdbApiKey} youtubeApiKey={youtubeApiKey} />} />
                    <Route path="/favorites" element={<FavoriteMovies />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/movie/:id" element={<MovieDetails tmdbApiKey={tmdbApiKey} />} />
                </Routes>
                <Footer />
            </div>
        
    );
};

export default App;

