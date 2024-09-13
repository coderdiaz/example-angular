import { Routes } from '@angular/router';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { inject } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';

export const ticketRoutes: Routes = [
  {
    path: '',
    component: TicketListComponent,
    canActivate: [
      () => inject(AuthService).isAuthenticated,
    ],
  },
];