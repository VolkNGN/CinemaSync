import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import './SuggestionsCarousel.css'; // Importation des styles personnalisés

const TMDB_API_URL = 'https://api.themoviedb.org/3';

const SuggestionsCarousel = ({ tmdbApiKey }) => {
  const [movies, setMovies] = useState([]); // État pour stocker les films

  const sortByOptions = [
    'popularity.desc',
    'release_date.desc',
    'revenue.desc',
    'vote_average.desc',
    'vote_count.desc'
  ];

  const genreOptions = [
    '28', // Action
    '12', // Adventure
    '16', // Animation
    '35', // Comedy
    '80', // Crime
    '99', // Documentary
    '18', // Drama
    '10751', // Family
    '14', // Fantasy
    '36', // History
    '27', // Horror
    '10402', // Music
    '9648', // Mystery
    '10749', // Romance
    '878', // Science Fiction
    '10770', // TV Movie
    '53', // Thriller
    '10752', // War
    '37' // Western
  ];

  const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

  // Chargement des films depuis l'API TMDB au montage du composant
  useEffect(() => {
    const fetchSuggestions = async () => {
      const sortBy = getRandomElement(sortByOptions);
      const genre = getRandomElement(genreOptions);
      const page = Math.floor(Math.random() * 10) + 1; // Random page between 1 and 10

      const url = `${TMDB_API_URL}/discover/movie?api_key=${tmdbApiKey}&include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=${sortBy}&with_genres=${genre}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json(); // Récupération des données JSON de la réponse
        setMovies(data.results); // Mise à jour de l'état movies avec les résultats
        console.log(data);
      } else {
        console.error('Failed to fetch movies:', response.statusText); // Affichage d'une erreur si la requête échoue
      }
    };

    fetchSuggestions(); // Appel de la fonction pour récupérer les films
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
