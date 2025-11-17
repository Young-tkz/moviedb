
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../services/movieService';
import type { ContentItem } from '../types';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { SearchType } from '../App';

const SearchResultsPage: React.FC = () => {
  const { type, query } = useParams<{ type: SearchType; query: string }>();
  const [results, setResults] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query || !type) return;
      try {
        setLoading(true);
        setError(null);
        if (type === 'movie') {
            const data = await movieService.searchMovies(query);
            setResults(data.results);
        } else {
            const data = await movieService.searchTvShows(query);
            setResults(data.results);
        }
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

    fetchResults();
  }, [query, type]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</div>;
  }

  const typeLabel = type === 'movie' ? 'Movies' : 'TV Shows';

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}" in {typeLabel}</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {results.map((item) => (
            <MovieCard key={item.id} item={item} type={type} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-12">No results found matching your search.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
