import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa'; // Import de l'icône d'étoile
import './MovieDetails.css'; // Importation des styles

const TMDB_API_URL = 'https://api.themoviedb.org/3';

const MovieDetails = ({ tmdbApiKey }) => {
  const { id } = useParams(); // Récupère l'ID du film depuis les paramètres de l'URL
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      // Fetch les détails du film
      const response = await fetch(`${TMDB_API_URL}/movie/${id}?api_key=${tmdbApiKey}&language=fr-FR`);
      if (response.ok) {
        const data = await response.json();
        setMovie(data);

        // Fetch les vidéos du film
        const videoResponse = await fetch(`${TMDB_API_URL}/movie/${id}/videos?api_key=${tmdbApiKey}&language=fr-FR`);
        if (videoResponse.ok) {
          const videoData = await videoResponse.json();
          const trailer = videoData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
          if (trailer) {
            setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
          }
        }
      } else {
        console.error('Failed to fetch movie details:', response.statusText);
      }
    };

    fetchMovieDetails();
  }, [id, tmdbApiKey]);

  useEffect(() => {
    // Charger les favoris depuis le localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleFavoriteToggle = () => {
    let updatedFavorites;
    if (favorites.some(fav => fav.id === movie.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const openTrailerModal = () => {
    const modal = document.getElementById('trailer-modal');
    modal.style.display = 'block';
  };

  const closeTrailerModal = () => {
    const modal = document.getElementById('trailer-modal');
    modal.style.display = 'none';
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  // Arrondir la note du film pour obtenir un nombre entier
  const roundedVoteAverage = Math.round(movie.vote_average);

  return (
    <div className="movie-details-container">
      <div className="movie-background" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}></div>
      <div className="movie-details-content">
        <h1 className="movie-title">{movie.title}</h1>
        <div className="movie-buttons">
          <button className="movie-button" onClick={openTrailerModal}>Lire</button>
          <button className="movie-button" onClick={handleFavoriteToggle}>
            <FaStar color={favorites.some(fav => fav.id === movie.id) ? 'yellow' : 'white'} />
          </button>
          <button className="movie-button">Note : {roundedVoteAverage * 10}%</button>
        </div>
        <div className="movie-info1">
          <p>Age : {movie.adult ? "18+" : "Tout public"}</p>
          <p>Date de sortie : {movie.release_date}</p>
          <p>Durée : {movie.runtime} minutes</p>
          <p>Type : {movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
        <p className="movie-synopsis">{movie.overview}</p>
      </div>

      {/* Modal pour la bande-annonce */}
      <div id="trailer-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeTrailerModal}>&times;</span>
          <iframe
            width="560"
            height="315"
            src={trailerUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
