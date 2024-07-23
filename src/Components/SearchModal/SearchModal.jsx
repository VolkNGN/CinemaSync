import React from 'react';
import { Link } from 'react-router-dom';
import './SearchModal.css';

const SearchModal = ({ show, movies, onClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <h2>Search Results</h2>
                <div className="movie-list">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <div key={movie.id} className="movie-item">
                                <Link to={`/movie/${movie.id}`} onClick={onClose}>
                                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
