import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import FavoriteMovies from './Components/FavoriteMovies';
import MovieList from './Components/MovieList';
import ProfilePage from './Components/profil/ProfilePage';
import './App.css';

const App = () => {
  const accountId = 'votre_account_id';
  const sessionId = 'votre_session_id';
  const apiKey = '7b45af8f71d63d716fa486d7d0abb8bd';

  const addFavoriteMovie = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          media_type: 'movie',
          media_id: movieId,
          favorite: true
        })
      });

      if (response.ok) {
        console.log(`Movie ${movieId} added to favorites`);
      } else {
        console.error('Failed to add movie to favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<div>Page d'accueil</div>} />
        <Route path="/favorites" element={<FavoriteMovies accountId={accountId} sessionId={sessionId} apiKey={apiKey} />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      
    </div>
  );
};

export default App;
