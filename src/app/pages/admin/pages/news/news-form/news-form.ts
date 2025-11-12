import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-news-form',
  imports: [RouterLink],
  templateUrl: './news-form.html',
  styleUrl: './news-form.scss',
})
export class NewsForm implements OnInit {
  @Input() isEditMode: boolean = false;
  isLoading: boolean = false;
  id?: number;
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.isEditMode = data['isEditMode'] || false;
    });

    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
        this.isEditMode = true;
        // aquí puedes cargar los datos del item con this.id
        console.log('Editando noticia con ID:', this.id);
      }
    });
  }
}
