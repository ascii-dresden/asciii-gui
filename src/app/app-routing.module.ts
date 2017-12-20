import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicerComponent } from './invoicer/invoicer.component';
import { MatematComponent } from './matemat/matemat.component';
import { invoicerRoutes } from './invoicer/invoice-routing.module';
import { matematRoutes } from './matemat/matemat-routing.module';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'invoicer', component: InvoicerComponent, children: [...invoicerRoutes] },
  { path: 'matemat', component: MatematComponent, children: [...matematRoutes] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
