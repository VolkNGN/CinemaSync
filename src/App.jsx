import React, { useState } from 'react'; // Importation de React
import { Routes, Route } from 'react-router-dom'; // Importation des composants de routage
import Header from './Components/Header/Header'; // Importation du composant Header
import FavoriteMovies from './Components/FavoriteMovies'; // Importation du composant FavoriteMovies
import MovieList from './Components/MovieList'; // Importation du composant MovieList
import ProfilePage from './Components/profil/ProfilePage'; // Importation du composant ProfilePage
import SuggestionsCarousel from './Components/SuggestionsCarousel/SuggestionsCarousel'; // Importation du composant SuggestionsCarousel
import TrendCarousel from './Components/TrendCarousel/TrendCarousel'; // Importation du composant TrendCarousel
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Footer from './Components/Footer/Footer';
import FavoritesCarousel from './Components/FavoritesCarousel/FavoritesCarousel'; // Importation du composant FavoritesCarousel
import MyMovies from './Components/MyMovies/MyMovies';
import SearchModal from './Components/SearchModal/SearchModal'; // Importation du composant SearchModal
import './App.css'; // Importation des styles de l'application

const App = () => {
    const tmdbApiKey = '7b45af8f71d63d716fa486d7d0abb8bd'; // Assurez-vous que c'est la clé API correcte
    const youtubeApiKey = 'AIzaSyDIGqLiH3uOgyP3ZekG62cGXWSs-HvsLRs'; // Clé API YouTube IFrame
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

    const searchMovies = async (query) => {
        try {
            const response = await fetch(`${BASE_URL}?api_key=${tmdbApiKey}&query=${encodeURIComponent(query)}`);
            const data = await response.json();
            if (response.status === 200) {
                setMovies(data.results || []);
                setShowModal(true); // Affiche la modale avec les résultats de recherche
            } else {
                console.error('Error fetching movies:', data);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return ( 
        <div className="App">
            <Header onSearch={searchMovies} />
            <Routes>
                <Route path="/" element={
                    <div>
                        {/* <h1>Page d'accueil</h1> */}
                        <SuggestionsCarousel tmdbApiKey={tmdbApiKey} youtubeApiKey={youtubeApiKey} />
                        <TrendCarousel tmdbApiKey={tmdbApiKey} youtubeApiKey={youtubeApiKey} />
                        <FavoritesCarousel />
                    </div>
                } />
                <Route path="/favorites" element={<FavoriteMovies />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/movie/:id" element={<MovieDetails tmdbApiKey={tmdbApiKey} />} />
                <Route path="/my-movies" element={<MyMovies />} />
            </Routes>
            <Footer />
            <SearchModal show={showModal} movies={movies} onClose={closeModal} />
        </div>
    );
};

export default App;
