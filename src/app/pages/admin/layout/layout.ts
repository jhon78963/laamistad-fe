import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendarCheck,
  faNewspaper,
  faImages,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { LocalStorageStore } from '../../../shared/stores/local-storage-store';

@Component({
  selector: 'app-layout',
  imports: [FontAwesomeModule, RouterOutlet, RouterLinkWithHref],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  router = inject(Router);
  localStorageStore = inject(LocalStorageStore);
  faCalendarCheck = faCalendarCheck;
  faNewspaper = faNewspaper;
  faImages = faImages;
  faRightFromBracket = faRightFromBracket;

  constructor() {
    library.add(faCalendarCheck, faNewspaper, faImages, faRightFromBracket);
  }

  getLinkClass(path: string): string {
    const currentPath = this.router.url;
    return currentPath === path
      ? 'block p-2 rounded-lg bg-green-100 text-green-700 font-bold'
      : 'block p-2 rounded-lg hover:bg-gray-100';
  }

  logout(): void {
    this.localStorageStore.remove('tokenData');
    this.router.navigate(['/login']);
  }
}
