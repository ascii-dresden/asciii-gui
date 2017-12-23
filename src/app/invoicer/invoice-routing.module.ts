import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsComponent } from './projects/projects.component';

export const invoicerRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'projects/:year', component: ProjectsComponent },
  { path: 'project/:name', component: ProjectDetailComponent }
];
