import { inject, Injectable } from '@angular/core';
import { ApiStore } from '../../../shared/stores/api-store';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TokenResponse } from '../interfaces/token';
import { RefreshToken, RefreshTokenResponse } from '../interfaces/refresh-token.interface';
import { LocalStorageStore } from '../../../shared/stores/local-storage-store';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginStore {
  apiStore = inject(ApiStore);
  router = inject(Router);
  localStorageStore = inject(LocalStorageStore);

  private setAuthentication(token: TokenResponse): boolean {
    this.localStorageStore.set('tokenData', token);
    return true;
  }

  login(login: Login): Observable<TokenResponse> {
    return this.apiStore.post<TokenResponse>('auth/login', login).pipe(
      tap((resp: TokenResponse) => {
        this.setAuthentication(resp);
        this.router.navigateByUrl('/admin');
      }),
    );
  }

  googleLogin(googleToken: string): Observable<TokenResponse> {
    return this.apiStore.post<TokenResponse>('auth/google', { token: googleToken }).pipe(
      tap((resp: TokenResponse) => {
        this.setAuthentication(resp);
        this.router.navigateByUrl('/admin');
      }),
    );
  }

  refreshToken(refreshToken: RefreshToken): Observable<RefreshTokenResponse> {
    return this.apiStore.post<RefreshTokenResponse>('auth/refresh-token', refreshToken);
  }
}
