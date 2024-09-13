import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from '../../core/auth/guards/auth.guard';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canMatch: [authGuard],
  }
];