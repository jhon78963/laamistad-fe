import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gallery',
  imports: [FontAwesomeModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class Gallery {
  faTrash = faTrash;
  faUpload = faUpload;
  images = [
    'https://placehold.co/500x500/a7f3d0?text=Parque+1',
    'https://placehold.co/500x500/d1fae5?text=Parque+2',
    'https://placehold.co/500x500/6ee7b7?text=Parque+3',
    'https://placehold.co/500x500/d1fae5?text=Parque+4',
  ];
  constructor() {
    library.add(faTrash, faUpload);
  }

  setNewImageUrl(event: any) {
    console.log(event);
  }

  handleDelete = (url: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
      // En Firebase, aquí llamarías a deleteObject() y deleteDoc()
      console.log('Eliminando imagen:', url);
      this.images = this.images.filter((image) => image !== url);
    }
  };
}
