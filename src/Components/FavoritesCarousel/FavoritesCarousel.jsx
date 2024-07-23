import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import './FavoritesCarousel.css';

const FavoritesCarousel = () => {
  const [favorites, setFavorites] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const uniqueFavorites = filterUniqueFavorites(savedFavorites);
    const filteredFavorites = filterMovies(uniqueFavorites);
    setFavorites(filteredFavorites);
  }, []);

  const filterUniqueFavorites = (favorites) => {
    const uniqueFavorites = [];
    const movieIds = new Set();

    favorites.forEach((movie) => {
      if (!movieIds.has(movie.id)) {
        movieIds.add(movie.id);
        uniqueFavorites.push(movie);
      }
    });

    return uniqueFavorites;
  };

  const filterMovies = (favorites) => {
    return favorites.filter((movie) =>
      movie.vote_average >= 6 &&
      movie.overview &&
      movie.poster_path
    );
  };

  const handleClick = (event, movieId) => {
    if (isDragging) {
      event.preventDefault();
      return;
    }
    window.location.href = `/movie/${movieId}`;
  };

  const handleMouseDown = () => {
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    draggable: true
  };

  return (
    <div className="favorites-carousel">
      <h2>Mes favoris</h2>
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
                <Link to={`/movie/${movie.id}`} className="details-link">Détails</Link>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FavoritesCarousel;
