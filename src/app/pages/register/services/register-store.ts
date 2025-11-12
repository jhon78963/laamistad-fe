import { inject, Injectable } from '@angular/core';
import { ApiStore } from '../../../shared/stores/api-store';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LocalStorageStore } from '../../../shared/stores/local-storage-store';
import { TokenResponse } from '../../login/interfaces/token';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterStore {
  apiStore = inject(ApiStore);
  router = inject(Router);
  localStorageStore = inject(LocalStorageStore);

  private setAuthentication(token: TokenResponse): boolean {
    this.localStorageStore.set('tokenData', token);
    return true;
  }

  register(user: User): Observable<TokenResponse> {
    return this.apiStore.post<TokenResponse>('auth/register', user).pipe(
      tap((resp: TokenResponse) => {
        this.setAuthentication(resp);
        this.router.navigateByUrl('/admin');
      }),
    );
  }
}
