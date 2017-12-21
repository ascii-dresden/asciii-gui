import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectComponent } from './project/project.component';

export const invoicerRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'projects/:year', component: ProjectComponent },
  { path: 'project/:name', component: ProjectDetailComponent }
];
