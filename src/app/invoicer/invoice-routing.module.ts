import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsComponent } from './projects/projects.component';
import { OffersComponent } from './offers/offers.component';
import { InvoicesComponent } from './invoices/invoices.component';

export const invoicerRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'projects/:year', component: ProjectsComponent },
  { path: 'offers/:year', component: OffersComponent },
  { path: 'offers/:year/:status', component: OffersComponent },
  { path: 'invoices/:year', component: InvoicesComponent },
  { path: 'invoices/:year/:status', component: InvoicesComponent },
  { path: 'project/:name', component: ProjectDetailComponent }
];
