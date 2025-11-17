
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../services/movieService';
import type { TVShowDetail } from '../types';
import { TMDB_IMAGE_BASE_URL } from '../constants';
import LoadingSpinner from '../components/LoadingSpinner';
import StarRating from '../components/StarRating';

const TVShowDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<TVShowDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await movieService.getTvShowDetails(id);
        setShow(data);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</div>;
  }

  if (!show) {
    return <div className="text-center">TV Show not found.</div>;
  }

  const backdropUrl = show.backdrop_path ? `${TMDB_IMAGE_BASE_URL}/original${show.backdrop_path}` : '';
  const posterUrl = show.poster_path ? `${TMDB_IMAGE_BASE_URL}/w500${show.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div className="animate-fade-in">
      <div className="relative h-64 md:h-96 -mx-4 sm:-mx-6 md:-mx-8">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        {backdropUrl && <img src={backdropUrl} alt="" className="w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="container mx-auto -mt-32 relative px-4">
        <div className="md:flex md:space-x-8">
          <div className="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0">
            <img src={posterUrl} alt={show.name} className="rounded-lg shadow-2xl w-full" />
          </div>
          <div className="mt-6 md:mt-24 text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold">{show.name}</h1>
            <div className="flex items-center justify-center md:justify-start space-x-4 mt-4 text-gray-400">
              <span>{show.first_air_date.split('-')[0]}</span>
              <span>•</span>
              <span>{show.number_of_seasons} Seasons</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2 mt-4">
              <StarRating rating={show.vote_average} />
              <span className="text-yellow-400 font-bold text-lg">{show.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              {show.genres.map(genre => (
                <span key={genre.id} className="bg-gray-700 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">{genre.name}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl">{show.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetailPage;
