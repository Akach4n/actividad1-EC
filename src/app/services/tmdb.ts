import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { MediaDetail } from '../models/media-detail';
import { MediaItem } from '../models/media-item';
import { Movie } from '../models/movie';
import { MovieDetail } from '../models/movie-detail';
import { PaginatedResponse } from '../models/paginated-response';
import { TvShow } from '../models/tv-show';
import { TvShowDetail } from '../models/tv-show-detail';

@Service()
export class Tmdb {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly imageBaseUrl = 'https://image.tmdb.org/t/p';
  private readonly params = { api_key: environment.apiKey, language: 'es-ES' };

  getTrendingMovies(): Observable<MediaItem[]> {
    return this.http
      .get<PaginatedResponse<Movie>>(`${this.baseUrl}/trending/movie/day`, { params: this.params })
      .pipe(map((response) => response.results.map((movie) => this.movieToMediaItem(movie))));
  }

  getTrendingTvShows(): Observable<MediaItem[]> {
    return this.http
      .get<PaginatedResponse<TvShow>>(`${this.baseUrl}/trending/tv/day`, { params: this.params })
      .pipe(map((response) => response.results.map((tvShow) => this.tvShowToMediaItem(tvShow))));
  }

  searchMovies(query: string): Observable<MediaItem[]> {
    return this.http
      .get<PaginatedResponse<Movie>>(`${this.baseUrl}/search/movie`, {
        params: { ...this.params, query },
      })
      .pipe(map((response) => response.results.map((movie) => this.movieToMediaItem(movie))));
  }

  searchTvShows(query: string): Observable<MediaItem[]> {
    return this.http
      .get<PaginatedResponse<TvShow>>(`${this.baseUrl}/search/tv`, {
        params: { ...this.params, query },
      })
      .pipe(map((response) => response.results.map((tvShow) => this.tvShowToMediaItem(tvShow))));
  }

  getMovieDetail(id: string): Observable<MediaDetail> {
    return this.http
      .get<MovieDetail>(`${this.baseUrl}/movie/${id}`, {
        params: { ...this.params, append_to_response: 'credits' },
      })
      .pipe(
        map((movie) => ({
          id: movie.id,
          type: 'movie',
          title: movie.title,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
          date: movie.release_date,
          voteAverage: movie.vote_average,
          overview: movie.overview,
          tagline: movie.tagline,
          genres: movie.genres.map((genre) => genre.name),
          duration: movie.runtime ? this.formatMinutes(movie.runtime) : '',
          cast: movie.credits.cast.slice(0, 12),
        })),
      );
  }

  getTvShowDetail(id: string): Observable<MediaDetail> {
    return this.http
      .get<TvShowDetail>(`${this.baseUrl}/tv/${id}`, {
        params: { ...this.params, append_to_response: 'credits' },
      })
      .pipe(
        map((tvShow) => ({
          id: tvShow.id,
          type: 'tv',
          title: tvShow.name,
          posterPath: tvShow.poster_path,
          backdropPath: tvShow.backdrop_path,
          date: tvShow.first_air_date,
          voteAverage: tvShow.vote_average,
          overview: tvShow.overview,
          tagline: tvShow.tagline,
          genres: tvShow.genres.map((genre) => genre.name),
          duration: this.formatTvShowDuration(tvShow),
          cast: tvShow.credits.cast.slice(0, 12),
        })),
      );
  }

  getImageUrl(path: string | null, size: string): string | null {
    return path ? `${this.imageBaseUrl}/${size}${path}` : null;
  }

  private movieToMediaItem(movie: Movie): MediaItem {
    return {
      id: movie.id,
      type: 'movie',
      title: movie.title,
      posterPath: movie.poster_path,
      date: movie.release_date,
      voteAverage: movie.vote_average,
    };
  }

  private tvShowToMediaItem(tvShow: TvShow): MediaItem {
    return {
      id: tvShow.id,
      type: 'tv',
      title: tvShow.name,
      posterPath: tvShow.poster_path,
      date: tvShow.first_air_date,
      voteAverage: tvShow.vote_average,
    };
  }

  private formatMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return hours > 0 ? `${hours} h ${rest} min` : `${rest} min`;
  }

  private formatTvShowDuration(tvShow: TvShowDetail): string {
    const seasons = `${tvShow.number_of_seasons} ${tvShow.number_of_seasons === 1 ? 'temporada' : 'temporadas'}`;
    const episodeMinutes = tvShow.episode_run_time[0];
    return episodeMinutes ? `${seasons} · ${episodeMinutes} min por episodio` : seasons;
  }
}
