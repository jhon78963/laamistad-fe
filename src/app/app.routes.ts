import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./pages/login/pages/login').then((m) => m.Login),
  // },
  // {
  //   path: 'registro',
  //   loadComponent: () => import('./pages/register/pages/register').then((m) => m.Register),
  // },
  {
    path: 'festival-navideño',
    loadComponent: () => import('./pages/home/sections/news-section/tree/tree').then((m) => m.Tree),
  },
  {
    path: 'horarios',
    loadComponent: () =>
      import('./pages/home/sections/schedule-section/schedule-section').then(
        (m) => m.ScheduleSection,
      ),
  },
  {
    path: 'reservar',
    loadComponent: () => import('./pages/reservation/reservation').then((m) => m.Reservation),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: 'reservas',
        loadComponent: () =>
          import('./pages/admin/pages/reservation/reservation').then((m) => m.Reservation),
      },
      {
        path: 'noticias',
        loadComponent: () => import('./pages/admin/pages/news/news').then((m) => m.News),
      },
      {
        path: 'noticias/crear',
        loadComponent: () =>
          import('./pages/admin/pages/news/news-form/news-form').then((m) => m.NewsForm),
      },
      {
        path: 'noticias/editar/:id',
        data: { isEditMode: true },
        loadComponent: () =>
          import('./pages/admin/pages/news/news-form/news-form').then((m) => m.NewsForm),
      },
      {
        path: 'galeria',
        loadComponent: () => import('./pages/admin/pages/gallery/gallery').then((m) => m.Gallery),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'reservas',
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
