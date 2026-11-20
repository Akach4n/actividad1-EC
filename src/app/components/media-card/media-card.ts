import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaItem } from '../../models/media-item';
import { Tmdb } from '../../services/tmdb';
import { FavoriteButton } from '../favorite-button/favorite-button';

@Component({
  selector: 'app-media-card',
  imports: [RouterLink, DecimalPipe, FavoriteButton],
  templateUrl: './media-card.html',
})
export class MediaCard {
  readonly item = input.required<MediaItem>();
  readonly rank = input<number | null>(null);

  private readonly tmdb = inject(Tmdb);
  protected readonly posterUrl = computed(() => this.tmdb.getImageUrl(this.item().posterPath, 'w342'));
  protected readonly detailLink = computed(() => [
    this.item().type === 'movie' ? '/pelicula' : '/serie',
    this.item().id,
  ]);
  protected readonly year = computed(() => this.item().date.slice(0, 4));
  protected readonly rankLabel = computed(() => String(this.rank()).padStart(2, '0'));
}
