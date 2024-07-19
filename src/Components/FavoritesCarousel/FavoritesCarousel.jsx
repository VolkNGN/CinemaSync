import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import './FavoritesCarousel.css'; // Assurez-vous de créer et de styliser ce fichier

const MAX_FAVORITES = 50;

const FavoritesCarousel = () => {
  const [favorites, setFavorites] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const uniqueFavorites = filterUniqueFavorites(savedFavorites);
    setFavorites(uniqueFavorites);
  }, []);

  const filterUniqueFavorites = (movies) => {
    const movieMap = new Map();
    
    movies.forEach(movie => {
      if (!movieMap.has(movie.id)) {
        movieMap.set(movie.id, movie);
      }
    });
    
    return Array.from(movieMap.values());
  };

  const handleFavorite = (movie, event) => {
    event.stopPropagation(); // Empêche la propagation du clic vers le lien parent
    let updatedFavorites;
    if (favorites.some(fav => fav.id === movie.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
    } else {
      if (favorites.length >= MAX_FAVORITES) {
        alert(`Vous avez atteint la limite maximale de ${MAX_FAVORITES} favoris.`);
        return;
      }
      updatedFavorites = filterUniqueFavorites([...favorites, movie]);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

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
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    draggable: true,
  };

  return (
    <div className="favorites-carousel-container">
      <h2>Ma liste</h2>
      <Slider {...settings}>
        {favorites.map(movie => (
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
                <button className="favorite-button" onClick={(e) => handleFavorite(movie, e)}>
                  {favorites.some(fav => fav.id === movie.id) ? '★' : '☆'}
                </button>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FavoritesCarousel;
