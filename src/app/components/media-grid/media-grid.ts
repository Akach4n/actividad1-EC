import { Component, input } from '@angular/core';
import { MediaItem } from '../../models/media-item';
import { MediaCard } from '../media-card/media-card';

@Component({
  selector: 'app-media-grid',
  imports: [MediaCard],
  templateUrl: './media-grid.html',
})
export class MediaGrid {
  readonly items = input.required<MediaItem[]>();
  readonly ranked = input(false);
}
