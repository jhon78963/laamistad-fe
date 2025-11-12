import { Component, Input } from '@angular/core';
import { NewsCardProps } from '../interfaces/news-card.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-news-card',
  imports: [RouterLink],
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss',
})
export class NewsCard {
  @Input() newsCard!: NewsCardProps;
}
