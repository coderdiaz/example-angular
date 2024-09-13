import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes')
      .then((routes) => routes.authRoutes)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./features/tickets/tickets.routes')
      .then((routes) => routes.ticketRoutes),
  }
];
