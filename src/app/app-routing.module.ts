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
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  /*private _modules: string[] = [];

  constructor(private router: Router, private settings: SettingsService) {
    this._modules = settings.modules;

    if (this.contains('ascii-invoicer')) {
      routes.push({ path: 'invoicer', component: InvoicerComponent, children: [...invoicerRoutes] });
    }
    if (this.contains('ascii-matemat')) {
      routes.push({ path: 'matemat', component: MatematComponent, children: [...matematRoutes] });
    }

    this.router.resetConfig(routes);
  }

  private contains(value: string, array?: string[]): boolean {
    if (array) {
      return (array.indexOf(value) > -1);
    } else {
      return (this._modules.indexOf(value) > -1);
    }
  }*/
}
