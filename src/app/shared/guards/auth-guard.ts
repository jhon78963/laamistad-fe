import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageStore } from '../stores/local-storage-store';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const localStorageStore = inject(LocalStorageStore);
  const tokenData = localStorageStore.get('tokenData');

  if (tokenData && tokenData.accessToken) {
    return true;
  }

  return router.createUrlTree(['auth/login']);
};
