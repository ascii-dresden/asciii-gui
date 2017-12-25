import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsComponent } from './projects/projects.component';
import { OffersComponent } from './offers/offers.component';

export const invoicerRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'projects/:year', component: ProjectsComponent },
  { path: 'offer/:year', component: OffersComponent },
  { path: 'project/:name', component: ProjectDetailComponent }
];
