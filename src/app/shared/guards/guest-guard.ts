import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LocalStorageStore } from '../stores/local-storage-store';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const localStorageStore = inject(LocalStorageStore);
  const tokenData = localStorageStore.get('tokenData');

  if (tokenData && tokenData.accessToken) {
    return router.createUrlTree(['/']);
  }

  return true;
};
