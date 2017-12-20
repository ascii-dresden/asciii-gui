import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicerComponent } from './invoicer/invoicer.component';
import { MatematComponent } from './matemat/matemat.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'invoicer', component: InvoicerComponent },
  { path: 'matemat', component: MatematComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
