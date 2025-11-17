
import React, { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import type { ContentItem } from '../types';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { SearchType } from '../App';

interface HomePageProps {
  searchType: SearchType;
}

const HomePage: React.FC<HomePageProps> = ({ searchType }) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        if (searchType === 'movie') {
          const data = await movieService.getPopularMovies();
          setContent(data.results);
        } else {
          const data = await movieService.getPopularTvShows();
          setContent(data.results);
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

    fetchContent();
  }, [searchType]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        {searchType === 'movie' ? 'Popular Movies' : 'Popular TV Shows'}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {content.map((item) => (
          <MovieCard key={item.id} item={item} type={searchType} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
