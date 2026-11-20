import { Routes } from '@angular/router';
import { DetailPage } from './pages/detail-page/detail-page';
import { FavoritesPage } from './pages/favorites-page/favorites-page';
import { HomePage } from './pages/home-page/home-page';
import { NotFoundPage } from './pages/not-found-page/not-found-page';
import { SearchPage } from './pages/search-page/search-page';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Películas Manolo' },
  { path: 'buscar', component: SearchPage, title: 'Buscar | Películas Manolo' },
  {
    path: 'pelicula/:id',
    component: DetailPage,
    data: { type: 'movie' },
    title: 'Película | Películas Manolo',
  },
  {
    path: 'serie/:id',
    component: DetailPage,
    data: { type: 'tv' },
    title: 'Serie | Películas Manolo',
  },
  { path: 'favoritos', component: FavoritesPage, title: 'Favoritos | Películas Manolo' },
  { path: '**', component: NotFoundPage, title: 'Página no encontrada | Películas Manolo' },
];
