import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import './FavoritesCarousel.css'; // Assurez-vous de créer et de styliser ce fichier

const MAX_FAVORITES = 50;

const filterUniqueFavorites = (movies) => {
  const movieMap = new Map();
  movies.forEach(movie => {
    if (!movieMap.has(movie.id)) {
      movieMap.set(movie.id, movie);
    }
  });
  return Array.from(movieMap.values());
};

const FavoritesCarousel = () => {
  const [favorites, setFavorites] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const uniqueFavorites = filterUniqueFavorites(savedFavorites);
    setFavorites(uniqueFavorites);
  }, []);

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    draggable: true
  };

  return (
    <div className="favorites-carousel">
      <Slider {...settings}>
        {favorites.map(movie => (
          <div key={movie.id} className="carousel-item">
            <div
              className="movie-card"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onClick={(event) => handleClick(event, movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-overview">{movie.overview}</p>
              <Link to={`/movie/${movie.id}`} className="details-link">Voir les détails</Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FavoritesCarousel;
