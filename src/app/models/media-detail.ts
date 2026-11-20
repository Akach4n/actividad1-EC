import { CastMember } from './credits';
import { MediaItem } from './media-item';

export interface MediaDetail extends MediaItem {
  overview: string;
  tagline: string;
  backdropPath: string | null;
  genres: string[];
  duration: string;
  cast: CastMember[];
}
