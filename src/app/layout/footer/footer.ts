import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faTiktok = faTiktok;
  constructor() {
    library.add(faFacebookF, faInstagram, faTiktok);
  }
}
