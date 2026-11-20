import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MediaGrid } from '../../components/media-grid/media-grid';
import { Favorites } from '../../services/favorites';

@Component({
  selector: 'app-favorites-page',
  imports: [RouterLink, MediaGrid],
  templateUrl: './favorites-page.html',
})
export class FavoritesPage {
  protected readonly favorites = inject(Favorites);
}
