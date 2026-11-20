export interface TvShow {
  id: number;
  name: string;
  original_name: string;
  original_language: string;
  origin_country: string[];
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  media_type?: 'tv';
}
