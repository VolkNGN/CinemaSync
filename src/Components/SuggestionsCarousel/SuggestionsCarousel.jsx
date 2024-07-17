import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import './SuggestionsCarousel.css'; // Importation des styles personnalisés

const TMDB_API_URL = 'https://api.themoviedb.org/3';

const SuggestionsCarousel = ({ tmdbApiKey }) => {
  const [movies, setMovies] = useState([]); // État pour stocker les films

  // Chargement des films populaires depuis l'API TMDB au montage du composant
  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await fetch(`${TMDB_API_URL}/movie/popular?api_key=${tmdbApiKey}&language=fr-FR`);
      if (response.ok) {
        const data = await response.json(); // Récupération des données JSON de la réponse
        setMovies(data.results); // Mise à jour de l'état movies avec les résultats
      } else {
        console.error('Failed to fetch movies:', response.statusText); // Affichage d'une erreur si la requête échoue
      }
    };

    fetchSuggestions(); // Appel de la fonction pour récupérer les films populaires
  }, [tmdbApiKey]); // Dépendance à la clé API TMDB

  // Configuration du carrousel slick
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    arrows: false, // Supprimer les flèches de navigation
    draggable: true // Activer le drag and move
  };

  return (
    <div className="suggestions-container">
      <h2>Suggestions</h2>
      <Slider {...settings}>
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>Note : {movie.vote_average}</p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SuggestionsCarousel;
