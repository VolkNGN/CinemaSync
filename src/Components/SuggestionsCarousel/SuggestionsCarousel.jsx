import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import './SuggestionsCarousel.css'; // Importation des styles personnalisés

const TMDB_API_URL = 'https://api.themoviedb.org/3';

const SuggestionsCarousel = ({ tmdbApiKey }) => {
  const [movies, setMovies] = useState([]); // État pour stocker les films
  const [isDragging, setIsDragging] = useState(false); // État pour vérifier le glissement

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

  // Fonction pour filtrer les films indésirables
  const filterMovies = (movies) => {
    return movies.filter(movie => 
      movie.vote_average > 0 && 
      movie.vote_average < 10 &&
      movie.overview &&
      movie.poster_path
    );
  };

  // Fonction pour charger les suggestions
  const fetchSuggestions = async () => {
    const sortBy = getRandomElement(sortByOptions);
    const genre = getRandomElement(genreOptions);
    let page = 1;
    let allMovies = [];
    let filteredMovies = [];

    while (filteredMovies.length < 10 && page <= 3) {
      const url = `${TMDB_API_URL}/discover/movie?api_key=${tmdbApiKey}&include_adult=false&include_video=false&language=fr-FR&page=${page}&sort_by=${sortBy}&with_genres=${genre}&primary_release_date.gte=2000-01-01&primary_release_date.lte=${new Date().getFullYear()}-12-31&vote_count.gte=50`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const newMovies = data.results;
        allMovies = allMovies.concat(newMovies);
        filteredMovies = filterMovies(allMovies);
        console.log(`Page ${page}: Fetched ${newMovies.length} movies, ${filteredMovies.length} after filtering`);
        page++;
      } else {
        console.error('Failed to fetch movies:', response.statusText);
        break;
      }
    }

    // Assouplir les critères si aucune suggestion n'est trouvée
    if (filteredMovies.length === 0) {
      filteredMovies = allMovies.filter(movie => movie.poster_path);
      console.log('Total movies after relaxed filtering:', filteredMovies.length);
    }

    setMovies(filteredMovies);
  };

  // Chargement des films depuis l'API TMDB au montage du composant
  useEffect(() => {
    fetchSuggestions();
  }, [tmdbApiKey]);

  // Gestionnaires d'événements pour gérer le drag
  const handleMouseDown = () => {
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const handleClick = (event, movieId) => {
    if (isDragging) {
      event.preventDefault();
      return;
    }
    window.location.href = `/movie/${movieId}`;
  };

  // Configuration du carrousel slick
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 5000,
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
            <Link
              to="#"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onClick={(event) => handleClick(event, movie.id)}
              draggable="false"
            >
              <img src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`} alt={movie.title} />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>Note : {movie.vote_average}</p>
                <Link to={`/movie/${movie.id}`} className="details-link">détails</Link>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SuggestionsCarousel;
