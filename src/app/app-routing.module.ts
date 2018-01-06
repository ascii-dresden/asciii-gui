import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { invoicerRoutes } from './invoicer/invoice-routing.module';
import { InvoicerComponent } from './invoicer/invoicer.component';
import { matematRoutes } from './matemat/matemat-routing.module';
import { MatematComponent } from './matemat/matemat.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'invoicer', component: InvoicerComponent, children: [...invoicerRoutes] },
  { path: 'matemat', component: MatematComponent, children: [...matematRoutes] },
  { path: '', redirectTo: '/invoicer/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
