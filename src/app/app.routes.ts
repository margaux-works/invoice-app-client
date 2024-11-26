import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'invoice/:id', component: InvoiceDetailsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
