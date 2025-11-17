
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../services/movieService';
import type { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchResultsPage: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      try {
        setLoading(true);
        setError(null);
        const data = await movieService.searchMovies(query);
        setMovies(data.results);
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

    fetchMovies();
  }, [query]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-12">No movies found matching your search.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
