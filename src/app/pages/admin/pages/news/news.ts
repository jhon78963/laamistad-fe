import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-news',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News {
  news = [
    { id: 1, title: 'Gran Jornada de Reforestación', date: '15 Oct, 2025' },
    { id: 2, title: 'Inauguración de Nuevas Canchas', date: '10 Oct, 2025' },
    { id: 3, title: 'Festival Cultural "Vive La Amistad"', date: '05 Oct, 2025' },
  ];
  faPlus = faPlus;
  faPencil = faPencil;
  faTrash = faTrash;

  constructor() {
    library.add(faPlus, faPencil, faTrash);
  }

  handleDelete(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar esta noticia?')) {
      this.news.filter((item) => item.id !== id);
    }
  }
}
