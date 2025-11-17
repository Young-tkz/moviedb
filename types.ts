
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

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

export interface PaginatedMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
