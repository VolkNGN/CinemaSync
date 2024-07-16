// src/Components/FavoriteMovies.jsx
import React, { useState, useEffect } from 'react';
import './FavoriteMovies.css';

const FavoriteMovies = ({ accountId, sessionId, apiKey }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  const fetchFavoriteMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${apiKey}&session_id=${sessionId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch favorite movies');
      }
      const data = await response.json();
      setFavoriteMovies(data.results || []);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching favorite movies:", error);
    }
  };

  return (
    <div className="favorite-movies">
      <h1 className="title">Ma liste</h1>
      {error ? (
        <div className="error-message">Erreur : {error}</div>
      ) : (
        <div className="movies-grid">
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map(movie => (
              <div key={movie.id} className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              </div>
            ))
          ) : (
            <div>Aucun film favori trouvé</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoriteMovies;
