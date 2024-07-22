import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import './TrendCarousel.css';

const TMDB_API_URL = 'https://api.themoviedb.org/3';

const TrendCarousel = ({ tmdbApiKey }) => {
  const [movies, setMovies] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const fetchTrends = async () => {
      const response = await fetch(`${TMDB_API_URL}/trending/movie/day?api_key=${tmdbApiKey}&language=fr-FR`);
      if (response.ok) {
        const data = await response.json();
        setMovies(data.results);
      } else {
        console.error('Failed to fetch movies:', response.statusText);
      }
    };

    fetchTrends();
  }, [tmdbApiKey]);

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
    <div className="trend-carousel-container">
      <h2>Tendances</h2>
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
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendCarousel;
