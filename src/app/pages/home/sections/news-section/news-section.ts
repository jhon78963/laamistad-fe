import { Component } from '@angular/core';
import { NewsCard } from './news-card/news-card';
import { NewsCardProps } from './interfaces/news-card.interface';

@Component({
  selector: 'app-news-section',
  imports: [NewsCard],
  templateUrl: './news-section.html',
  styleUrl: './news-section.scss',
})
export class NewsSection {
  newsData: NewsCardProps[] = [
    // {
    //   id: 1,
    //   imgSrc: 'https://placehold.co/600x400/d1fae5/166534?text=Evento+Comunitario',
    //   date: '15 Oct, 2025',
    //   title: 'Gran Jornada de Reforestación',
    //   excerpt:
    //     'Vecinos y voluntarios se unieron para plantar más de 100 árboles nuevos en el parque.',
    //   link: '#',
    // },
    // {
    //   id: 2,
    //   imgSrc: 'https://placehold.co/600x400/a7f3d0/166534?text=Deporte',
    //   date: '10 Oct, 2025',
    //   title: 'Inauguración de Nuevas Canchas Deportivas',
    //   excerpt:
    //     'El parque ahora cuenta con modernas canchas de fulbito y vóley para todos los visitantes.',
    //   link: '#',
    // },
    // {
    //   id: 3,
    //   imgSrc: 'https://placehold.co/600x400/6ee7b7/166534?text=Cultura',
    //   date: '05 Oct, 2025',
    //   title: 'Festival Cultural "Vive La Amistad"',
    //   excerpt: 'Un fin de semana lleno de música, danza y arte que congregó a cientos de familias.',
    //   link: '#',
    // },
  ];
}
