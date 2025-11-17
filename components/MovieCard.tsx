
import React from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../types';
import { TMDB_IMAGE_BASE_URL } from '../constants';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link to={`/movie/${movie.id}`} className="group block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img src={imageUrl} alt={movie.title} className="w-full h-auto object-cover aspect-[2/3]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-2 left-2 right-2">
            <h3 className="text-white text-sm font-bold truncate group-hover:whitespace-normal">{movie.title}</h3>
            <div className="flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white text-xs font-semibold">{movie.vote_average.toFixed(1)}</span>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
