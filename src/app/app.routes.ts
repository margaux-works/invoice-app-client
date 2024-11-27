import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserLoginFormComponent } from './login/login.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: UserLoginFormComponent },
  { path: 'invoice/:id', component: InvoiceDetailsComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
];
