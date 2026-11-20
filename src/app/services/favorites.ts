import { Service, signal } from '@angular/core';
import { MediaItem } from '../models/media-item';

@Service()
export class Favorites {
  private readonly storageKey = 'peliculas-manolo-favoritos';
  readonly items = signal<MediaItem[]>(this.load());

  isFavorite(item: MediaItem): boolean {
    return this.items().some((favorite) => favorite.id === item.id && favorite.type === item.type);
  }

  toggle(item: MediaItem): void {
    if (this.isFavorite(item)) {
      this.items.update((items) =>
        items.filter((favorite) => !(favorite.id === item.id && favorite.type === item.type)),
      );
    } else {
      const favorite: MediaItem = {
        id: item.id,
        type: item.type,
        title: item.title,
        posterPath: item.posterPath,
        date: item.date,
        voteAverage: item.voteAverage,
      };
      this.items.update((items) => [...items, favorite]);
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.items()));
  }

  private load(): MediaItem[] {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) {
      return [];
    }
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
}
