import React from 'react'; // Importation de React
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
import './App.css'; // Importation des styles de l'application

const App = () => {
    const tmdbApiKey = '7b45af8f71d63d716fa486d7d0abb8bd'; // Clé API TMDB
    const youtubeApiKey = 'AIzaSyDIGqLiH3uOgyP3ZekG62cGXWSs-HvsLRs'; // Clé API YouTube IFrame

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={
          <div>
            {/* <h1>Page d'accueil</h1> */}
            <SuggestionsCarousel tmdbApiKey={tmdbApiKey} youtubeApiKey={youtubeApiKey} />
            <TrendCarousel tmdbApiKey={tmdbApiKey} youtubeApiKey={youtubeApiKey} />
            <FavoritesCarousel /> {/* Ajout du carousel des favoris */}
          </div>
        } />
        <Route path="/favorites" element={<FavoriteMovies />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/movie/:id" element={<MovieDetails tmdbApiKey={tmdbApiKey} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
