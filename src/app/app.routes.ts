import { Router, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from './core/auth/services/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes')
      .then((routes) => routes.authRoutes),
    canActivate: [
      () => {
        // TODO: Move to a specific guard
        const authService = inject(AuthService);
        const router = inject(Router)
        return authService.isAuthenticated
          .pipe(
            map(isAuthenticated => {
              if (!isAuthenticated) {
                return true;
              }
        
              return router.createUrlTree(['/']);
            })
          )
      }
    ],
  },
  {
    path: 'tickets',
    loadChildren: () => import('./features/tickets/tickets.routes')
      .then((routes) => routes.ticketRoutes),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes')
      .then((routes) => routes.dashboardRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
