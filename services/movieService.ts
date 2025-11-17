import { TMDB_API_KEY, TMDB_BASE_URL } from '../constants';
import type { MovieDetail, PaginatedMoviesResponse, PaginatedTVShowsResponse, TVShowDetail } from '../types';

const fetchFromApi = async <T,>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
  // FIX: The check for a placeholder API key was removed.
  // It caused a TypeScript error because TMDB_API_KEY is a constant,
  // making the comparison `TMDB_API_KEY === "YOUR_TMDB_API_KEY"` always false and thus redundant.
  
  const queryParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: 'en-US',
    ...params,
  });

  const url = `${TMDB_BASE_URL}/${endpoint}?${queryParams.toString()}`;
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

  getPopularTvShows: (): Promise<PaginatedTVShowsResponse> => {
    return fetchFromApi<PaginatedTVShowsResponse>('tv/popular');
  },
  
  getMovieDetails: (id: string): Promise<MovieDetail> => {
    return fetchFromApi<MovieDetail>(`movie/${id}`);
  },

  getTvShowDetails: (id: string): Promise<TVShowDetail> => {
    return fetchFromApi<TVShowDetail>(`tv/${id}`);
  },
  
  searchMovies: (query: string): Promise<PaginatedMoviesResponse> => {
    return fetchFromApi<PaginatedMoviesResponse>('search/movie', { query });
  },

  searchTvShows: (query: string): Promise<PaginatedTVShowsResponse> => {
    return fetchFromApi<PaginatedTVShowsResponse>('search/tv', { query });
  },
};
