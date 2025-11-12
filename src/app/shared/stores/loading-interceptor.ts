import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingStore } from './loading-store';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingStore = inject(LoadingStore);
  const skip = req.headers.get('X-Skip-Loading') === 'true';

  if (!skip) loadingStore.show();

  return next(req).pipe(
    finalize(() => {
      if (!skip) loadingStore.hide();
    }),
  );
};
