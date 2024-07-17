// src/Components/MovieDetails/MovieDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css'; // Importation des styles

const TMDB_API_URL = 'https://api.themoviedb.org/3';

const MovieDetails = ({ tmdbApiKey }) => {
  const { id } = useParams(); // Récupère l'ID du film depuis les paramètres de l'URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`${TMDB_API_URL}/movie/${id}?api_key=${tmdbApiKey}&language=fr-FR`);
      if (response.ok) {
        const data = await response.json();
        setMovie(data);
      } else {
        console.error('Failed to fetch movie details:', response.statusText);
      }
    };

    fetchMovieDetails();
  }, [id, tmdbApiKey]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}>
      <div className="movie-details-content">
        <h1 className="movie-title">{movie.title}</h1>
        <div className="movie-buttons">
          <button className="movie-button">Lire</button>
          <button className="movie-button">Ajouter à mes favoris</button>
          <button className="movie-button">Note : {movie.vote_average * 10}%</button>
        </div>
        <div className="movie-info">
          <p>Age : {movie.adult ? "18+" : "Tout public"}</p>
          <p>Date de sortie : {movie.release_date}</p>
          <p>Durée : {movie.runtime} minutes</p>
          <p>Type : {movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
        <p className="movie-synopsis">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
