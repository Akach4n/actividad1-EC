export type MediaType = 'movie' | 'tv';

export interface MediaItem {
  id: number;
  type: MediaType;
  title: string;
  posterPath: string | null;
  date: string;
  voteAverage: number;
}
