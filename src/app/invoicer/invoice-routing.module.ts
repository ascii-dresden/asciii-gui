import { Routes } from '@angular/router';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectComponent } from './project/project.component';

export const invoicerRoutes: Routes = [
  { path: '', component: ProjectComponent },
  { path: 'details/:id', component: ProjectDetailComponent }
];
