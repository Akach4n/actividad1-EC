import { Credits } from './credits';
import { Genre } from './genre';

export interface TvShowDetail {
  id: number;
  name: string;
  overview: string;
  tagline: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  episode_run_time: number[];
  number_of_seasons: number;
  genres: Genre[];
  credits: Credits;
}
