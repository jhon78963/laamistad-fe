import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './shared/stores/token-interceptor';
import { loadingInterceptor } from './shared/stores/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([tokenInterceptor, loadingInterceptor])),
    provideRouter(
      routes,
      withHashLocation(),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // Mantener el scroll al navegar hacia atrás/adelante
        anchorScrolling: 'enabled', // CLAVE: Habilita el desplazamiento automático a la ancla (#fragment)
      }),
    ),
  ],
};
