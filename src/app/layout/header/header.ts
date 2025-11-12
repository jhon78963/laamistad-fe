import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageStore } from '../../shared/stores/local-storage-store';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isMobileMenuOpen: boolean = false;
  faBars = faBars;
  router = inject(Router);
  localStorageStore = inject(LocalStorageStore);
  isLogin: boolean = false;
  constructor() {
    library.add(faBars);
  }

  ngOnInit(): void {
    this.localStorageStore.watch('tokenData').subscribe((tokenData) => {
      this.isLogin = !!(tokenData && tokenData.accessToken);
    });
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });

    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
