import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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
  { path: 'dashboard', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
  { path: 'projects', loadChildren: 'app/projects/projects.module#ProjectsModule' },
  { path: 'offers', loadChildren: 'app/offers/offers.module#OffersModule' },
  { path: 'invoices', loadChildren: 'app/invoices/invoices.module#InvoicesModule' },
  { path: 'project', loadChildren: 'app/project/project.module#ProjectModule' },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
