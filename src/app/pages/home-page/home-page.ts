import { Component, OnInit, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Loader } from '../../components/loader/loader';
import { MediaGrid } from '../../components/media-grid/media-grid';
import { MediaItem } from '../../models/media-item';
import { Tmdb } from '../../services/tmdb';

@Component({
  selector: 'app-home-page',
  imports: [Loader, MediaGrid],
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit {
  private readonly tmdb = inject(Tmdb);

  protected readonly movies = signal<MediaItem[]>([]);
  protected readonly tvShows = signal<MediaItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  ngOnInit(): void {
    forkJoin({
      movies: this.tmdb.getTrendingMovies(),
      tvShows: this.tmdb.getTrendingTvShows(),
    }).subscribe({
      next: ({ movies, tvShows }) => {
        this.movies.set(movies);
        this.tvShows.set(tvShows);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}
