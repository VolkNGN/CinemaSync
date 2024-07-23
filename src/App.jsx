import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import FavoriteMovies from './Components/FavoriteMovies';
import MovieList from './Components/MovieList';
import ProfilePage from './Components/profil/ProfilePage';
import SuggestionsCarousel from './Components/SuggestionsCarousel/SuggestionsCarousel';
import TrendCarousel from './Components/TrendCarousel/TrendCarousel';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Footer from './Components/Footer/Footer';
import FavoritesCarousel from './Components/FavoritesCarousel/FavoritesCarousel';
import MyMovies from './Components/MyMovies/MyMovies';
import SearchModal from './Components/SearchModal/SearchModal';
import './App.css';

const App = () => {
    const tmdbApiKey = '7b45af8f71d63d716fa486d7d0abb8bd';
    const youtubeApiKey = 'AIzaSyDIGqLiH3uOgyP3ZekG62cGXWSs-HvsLRs';
    const [movies, setMovies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('');

    const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

    const searchMovies = async (query, page = 1) => {
        try {
            const response = await fetch(`${BASE_URL}?api_key=${tmdbApiKey}&query=${encodeURIComponent(query)}&page=${page}`);
            const data = await response.json();
            if (response.status === 200) {
                setMovies(data.results || []);
                setTotalPages(data.total_pages);
                setCurrentPage(page);
                setShowModal(true);
                setQuery(query);
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

    const handlePageChange = (page) => {
        searchMovies(query, page);
    };

    return (
        <div className="App">
            <Header onSearch={(query) => searchMovies(query, 1)} />
            <Routes>
                <Route path="/" element={
                    <div>
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
            <SearchModal
                show={showModal}
                movies={movies}
                totalPages={totalPages}
                currentPage={currentPage}
                onClose={closeModal}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default App;
