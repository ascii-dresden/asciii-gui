import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { OffersComponent } from './offers/offers.component';
import { InvoicesComponent } from './invoices/invoices.component';

export const invoicerRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { breadcrumb: 'Invoicer' } },
  { path: 'projects/:year', component: ProjectsComponent },
  { path: 'offers/:year/:status', component: OffersComponent },
  { path: 'offers/:year', redirectTo: 'offers/:year/all' },
  { path: 'invoices/:year/:status', component: InvoicesComponent },
  { path: 'invoices/:year', redirectTo: 'invoices/:year/all' },
  { path: 'project/:name', component: ProjectComponent }
];
