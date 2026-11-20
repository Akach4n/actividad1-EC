import { Component, computed, inject, input } from '@angular/core';
import { MediaItem } from '../../models/media-item';
import { Favorites } from '../../services/favorites';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.html',
})
export class FavoriteButton {
  readonly item = input.required<MediaItem>();
  readonly showText = input(false);

  private readonly favorites = inject(Favorites);
  protected readonly isFavorite = computed(() => this.favorites.isFavorite(this.item()));

  protected readonly colorClasses = computed(() =>
    this.isFavorite()
      ? 'border-accent bg-accent text-cream'
      : 'border-ink bg-cream hover:bg-ink hover:text-cream',
  );

  protected readonly sizeClasses = computed(() =>
    this.showText() ? 'w-full px-4 py-3' : 'h-9 w-9 rounded-full shadow-md',
  );

  protected toggle(): void {
    this.favorites.toggle(this.item());
  }
}
