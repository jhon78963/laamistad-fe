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
    {
      id: 1,
      imgSrc: 'https://placehold.co/600x400/cffafe/0e7490?text=Servicios+Abiertos',
      date: '13 Nov, 2025',
      title: 'Apertura de Servicios Higiénicos',
      excerpt:
        '¡Buenas noticias! Como resultado de la última reunión, la directiva informa que se aperturarán los servicios higiénicos del parque para la comodidad de todos.',
      link: '',
    },
    {
      id: 2,
      imgSrc: 'https://placehold.co/600x400/d1fae5/166534?text=Jornada+Limpieza',
      date: '19 Nov, 2025',
      title: 'Gran Jornada de Limpieza Vecinal',
      excerpt:
        'Se convoca a todos los vecinos a participar en la jornada de limpieza de nuestro parque este martes 19 de noviembre a las 8:00 PM. ¡Unámonos por un parque más limpio!',
      link: '',
    },
    {
      id: 3,
      imgSrc: 'https://placehold.co/600x400/fecdd3/b91c1c?text=Festival+Navideño',
      date: '01 Dic, 2025',
      title: 'Festival del Árbol Navideño en el Parque La Amistad',
      excerpt:
        'Celebraremos el inicio de la navidad este 1 de diciembre con nuestro festival. Se invita a los vecinos de todos los cuadrantes y a los equipos de vóley a participar.',
      link: 'festival-navideño',
    },
    {
      id: 4,
      imgSrc: 'https://placehold.co/600x400/e0e7ff/3730a3?text=Chocolatada',
      date: '15 Dic, 2025',
      title: 'Gran Chocolatada y Compartir Vecinal',
      excerpt:
        'La gestión directiva invita a toda la comunidad a un compartir navideño con chocolatada este 15 de diciembre. ¡No faltes!',
      link: '',
    },
  ];
}
