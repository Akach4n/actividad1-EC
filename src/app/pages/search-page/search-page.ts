import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loader } from '../../components/loader/loader';
import { MediaGrid } from '../../components/media-grid/media-grid';
import { MediaItem } from '../../models/media-item';
import { Tmdb } from '../../services/tmdb';

@Component({
  selector: 'app-search-page',
  imports: [Loader, MediaGrid],
  templateUrl: './search-page.html',
})
export class SearchPage implements OnInit {
  private readonly tmdb = inject(Tmdb);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly query = signal('');
  protected readonly type = signal('pelicula');
  protected readonly results = signal<MediaItem[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal(false);
  protected readonly searched = signal(false);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const query = params.get('q') ?? '';
      const type = params.get('tipo') === 'serie' ? 'serie' : 'pelicula';
      this.query.set(query);
      this.type.set(type);

      if (query) {
        this.search(query, type);
      } else {
        this.results.set([]);
        this.searched.set(false);
      }
    });
  }

  protected onSubmit(event: Event, query: string, type: string): void {
    event.preventDefault();
    const text = query.trim();
    if (!text) {
      return;
    }
    this.router.navigate(['/buscar'], { queryParams: { q: text, tipo: type } });
  }

  private search(query: string, type: string): void {
    this.loading.set(true);
    this.error.set(false);

    const request = type === 'serie' ? this.tmdb.searchTvShows(query) : this.tmdb.searchMovies(query);

    request.subscribe({
      next: (results) => {
        this.results.set(results);
        this.searched.set(true);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}
