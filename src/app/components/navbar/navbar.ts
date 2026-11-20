import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Favorites } from '../../services/favorites';

@Component({
  selector: 'app-navbar',
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar {
  protected readonly favorites = inject(Favorites);
  protected readonly today = new Date();
}
