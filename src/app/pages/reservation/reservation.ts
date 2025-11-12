import { Component, inject, OnInit } from '@angular/core';
import { ReservationForm } from './reservation-form/reservation-form';
import { LocalStorageStore } from '../../shared/stores/local-storage-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation',
  imports: [ReservationForm, RouterLink],
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss',
})
export class Reservation implements OnInit {
  localStorageStore = inject(LocalStorageStore);
  isLogin: boolean = false;
  ngOnInit(): void {
    this.localStorageStore.watch('tokenData').subscribe((tokenData) => {
      this.isLogin = !!(tokenData && tokenData.accessToken);
    });
  }
}
