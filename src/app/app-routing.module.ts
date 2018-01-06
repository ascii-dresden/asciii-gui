import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { OffersComponent } from './offers/offers.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projects/:year', component: ProjectsComponent },
  { path: 'offers/:year/:status', component: OffersComponent },
  { path: 'offers/:year', redirectTo: 'offers/:year/all' },
  { path: 'invoices/:year/:status', component: InvoicesComponent },
  { path: 'invoices/:year', redirectTo: 'invoices/:year/all' },
  { path: 'project/:name', component: ProjectComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
