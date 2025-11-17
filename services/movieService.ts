
import { TMDB_API_KEY, TMDB_BASE_URL } from '../constants';
import type { MovieDetail, PaginatedMoviesResponse } from '../types';

const fetchFromApi = async <T,>(endpoint: string): Promise<T> => {
  if (TMDB_API_KEY === "YOUR_TMDB_API_KEY" || !TMDB_API_KEY) {
    throw new Error("Please replace 'YOUR_TMDB_API_KEY' in constants.ts with your actual TMDB API key.");
  }
  
  const url = `${TMDB_BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}&language=en-US`;
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status_message || 'Failed to fetch data from TMDB API.');
  }
  
  return response.json();
};

export const movieService = {
  getPopularMovies: (): Promise<PaginatedMoviesResponse> => {
    return fetchFromApi<PaginatedMoviesResponse>('movie/popular');
  },
  
  getMovieDetails: (id: string): Promise<MovieDetail> => {
    return fetchFromApi<MovieDetail>(`movie/${id}`);
  },
  
  searchMovies: (query: string): Promise<PaginatedMoviesResponse> => {
    return fetchFromApi<PaginatedMoviesResponse>(`search/movie&query=${encodeURIComponent(query)}`);
  },
};
