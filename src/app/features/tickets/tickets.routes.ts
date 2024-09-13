import { Routes } from '@angular/router';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { authGuard } from '../../core/auth/guards/auth.guard';

export const ticketRoutes: Routes = [
  {
    path: '',
    component: TicketListComponent,
    canMatch: [authGuard],
  },
];