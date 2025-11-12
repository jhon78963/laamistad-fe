import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Subject, switchMap, throwError } from 'rxjs';
import { TokenResponse } from '../../pages/login/interfaces/token';
import { RefreshTokenResponse } from '../../pages/login/interfaces/refresh-token.interface';
import { RefreshToken } from '../../pages/login/interfaces/refresh-token.interface';
import { LoginStore } from '../../pages/login/services/login-store';

let refreshTokenInProgress = false;
let refreshTokenSubject: Subject<any> = new Subject<any>();

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const loginStore = inject(LoginStore);
  const excludedEndpoints: string[] = [
    'login',
    'refresh-token',
    'forget-password',
    'change-password',
  ];
  const excludedEndpointsAfterRefresh: string[] = ['refresh-token', 'logout', 'forget-password'];
  const tokenData: TokenResponse = JSON.parse(localStorage.getItem('tokenData') || '{}');
  const hasCustomTokenFlag = req.headers.has('X-Use-Custom-Token');

  if (hasCustomTokenFlag) {
    const cleanedHeaders = req.headers.delete('X-Use-Custom-Token');
    req = req.clone({ headers: cleanedHeaders });
  }

  if (excludedEndpoints.some((endpoint) => req.url.includes(endpoint))) {
    return next(req);
  }

  const alreadyHasAuthorization = req.headers.has('Authorization');
  if (!hasCustomTokenFlag && !alreadyHasAuthorization && tokenData && tokenData.accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenData.accessToken}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const is401 = error.status === 401;
      const isNotExcludedAfterRefresh = !excludedEndpointsAfterRefresh.some((endpoint) =>
        req.url.includes(endpoint),
      );
      const hasRefreshToken = tokenData && tokenData.refreshToken;

      if (is401 && isNotExcludedAfterRefresh && hasRefreshToken) {
        if (refreshTokenInProgress) {
          return refreshTokenSubject.pipe(
            switchMap((token) => {
              return next(
                req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token}`,
                  },
                }),
              );
            }),
          );
        } else {
          refreshTokenInProgress = true;
          refreshTokenSubject = new Subject<any>();
          const refreshToken: RefreshToken = {
            accessToken: tokenData.accessToken,
            refreshToken: tokenData.refreshToken,
          };
          return loginStore.refreshToken(refreshToken).pipe(
            switchMap((response: RefreshTokenResponse) => {
              refreshTokenInProgress = false;
              refreshTokenSubject.next(response);
              refreshTokenSubject.complete();

              localStorage.setItem('tokenData', JSON.stringify(response));

              return next(
                req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.accessToken}`,
                  },
                }),
              );
            }),
            catchError((refreshError) => {
              refreshTokenInProgress = false;
              refreshTokenSubject.error(refreshError);
              console.error('Error refreshing token:', refreshError);
              localStorage.clear();
              router.navigate(['auth']);
              return throwError(() => refreshError);
            }),
          );
        }
      }

      return throwError(() => error);
    }),
  );
};
