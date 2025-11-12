import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery-section',
  imports: [],
  templateUrl: './gallery-section.html',
  styleUrl: './gallery-section.scss',
})
export class GallerySection {
  galleryImages = [
    {
      src: 'https://upload-la-amistad.zerogroups.net.pe/storage/images/imagen1.jpeg',
      alt: 'Galería Parque 1',
      width: 500,
      height: 800,
    },
    {
      src: 'https://upload-la-amistad.zerogroups.net.pe/storage/images/imagen2.jpeg',
      alt: 'Galería Parque 2',
      width: 500,
      height: 500,
    },
    {
      src: 'https://upload-la-amistad.zerogroups.net.pe/storage/images/imagen3.jpeg',
      alt: 'Galería Parque 3',
      width: 500,
      height: 500,
    },
    {
      src: 'https://upload-la-amistad.zerogroups.net.pe/storage/images/imagen4.jpeg',
      alt: 'Galería Parque 4',
      width: 500,
      height: 800,
    },
    {
      src: 'https://upload-la-amistad.zerogroups.net.pe/storage/images/imagen5.jpeg',
      alt: 'Galería Parque 5',
      width: 500,
      height: 800,
    },
    {
      src: 'https://upload-la-amistad.zerogroups.net.pe/storage/images/imagen6.jpeg',
      alt: 'Galería Parque 6',
      width: 500,
      height: 500,
    },
    {
      src: 'https://upload-la-amistad.zerogroups.net.pe/storage/images/imagen7.jpeg',
      alt: 'Galería Parque 7',
      width: 500,
      height: 500,
    },
  ];
}
