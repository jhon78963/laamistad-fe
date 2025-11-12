import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-section',
  imports: [FontAwesomeModule],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
})
export class ContactSection {
  faMapMarkerAlt = faMapMarkerAlt;
  faClock = faClock;
  constructor() {
    library.add(faMapMarkerAlt, faClock);
  }
}
