
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

export interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
  vote_average: number;
  first_air_date: string;
}

export type ContentItem = Movie | TVShow;

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail extends Movie {
  overview: string;
  genres: Genre[];
  runtime: number;
  backdrop_path: string | null;
}

export interface TVShowDetail extends TVShow {
  overview: string;
  genres: Genre[];
  episode_run_time: number[];
  number_of_seasons: number;
  number_of_episodes: number;
  backdrop_path: string | null;
}

export interface PaginatedMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface PaginatedTVShowsResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}
