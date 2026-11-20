import { DatePipe, DecimalPipe, Location } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FavoriteButton } from '../../components/favorite-button/favorite-button';
import { Loader } from '../../components/loader/loader';
import { MediaDetail } from '../../models/media-detail';
import { Tmdb } from '../../services/tmdb';

@Component({
  selector: 'app-detail-page',
  imports: [DatePipe, DecimalPipe, RouterLink, FavoriteButton, Loader],
  templateUrl: './detail-page.html',
})
export class DetailPage implements OnInit {
  private readonly tmdb = inject(Tmdb);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  protected readonly detail = signal<MediaDetail | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') ?? '';
      const type = this.route.snapshot.data['type'];

      this.loading.set(true);
      this.error.set(false);

      const request = type === 'tv' ? this.tmdb.getTvShowDetail(id) : this.tmdb.getMovieDetail(id);

      request.subscribe({
        next: (detail) => {
          this.detail.set(detail);
          this.loading.set(false);
        },
        error: () => {
          this.error.set(true);
          this.loading.set(false);
        },
      });
    });
  }

  protected imageUrl(path: string | null, size: string): string | null {
    return this.tmdb.getImageUrl(path, size);
  }

  protected goBack(): void {
    this.location.back();
  }
}
