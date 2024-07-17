import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TrendCarousel.css'; // Importation des styles personnalisés

const TMDB_API_URL = 'https://api.themoviedb.org/3';

const TrendCarousel = ({ tmdbApiKey }) => {
  const [movies, setMovies] = useState([]); // État pour stocker les films

  // Chargement des films populaires depuis l'API TMDB au montage du composant
  useEffect(() => {
    const fetchTrends = async () => {
      const response = await fetch(`${TMDB_API_URL}/trending/movie/day?api_key=${tmdbApiKey}&language=fr-FR`);
      if (response.ok) {
        const data = await response.json(); // Récupération des données JSON de la réponse
        setMovies(data.results); // Mise à jour de l'état movies avec les résultats
      } else {
        console.error('Failed to fetch movies:', response.statusText); // Affichage d'une erreur si la requête échoue
      }
    };

    fetchTrends(); // Appel de la fonction pour récupérer les films populaires
  }, [tmdbApiKey]); // Dépendance à la clé API TMDB

  // Configuration du carrousel slick  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false, // Supprimer les flèches de navigation
    draggable: true // Activer le drag and move
  };
  return (
    <div className="tendances-container">
      <h2>Tendances</h2>
      <Slider {...settings}>
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>Note : {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendCarousel;
