import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projects/:year', component: ProjectsComponent },
  { path: 'offers/:year/:status', component: OffersComponent },
  { path: 'offers/:year', redirectTo: 'offers/:year/all' },
  { path: 'invoices/:year/:status', component: InvoicesComponent },
  { path: 'invoices/:year', redirectTo: 'invoices/:year/all' },
  { path: 'project/:name', component: ProjectComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];*/

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'projects', loadChildren: () => import('src/app/projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'offers', loadChildren: () => import('src/app/offers/offers.module').then(m => m.OffersModule) },
  { path: 'invoices', loadChildren: () => import('src/app/invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'project', loadChildren: () => import('src/app/project/project.module').then(m => m.ProjectModule) },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
