import { type Route } from '@angular/router';

export const HOME_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./home.page').then(({ HomePage }) => HomePage),
  },
];
