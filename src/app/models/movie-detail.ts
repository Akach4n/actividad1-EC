import { Credits } from './credits';
import { Genre } from './genre';

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  tagline: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number | null;
  genres: Genre[];
  credits: Credits;
}
