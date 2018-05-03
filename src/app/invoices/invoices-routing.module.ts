import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {InvoicesComponent} from './invoices.component';

const routes: Routes = [
  { path: ':year/:status', component: InvoicesComponent },
  { path: ':year', redirectTo: ':year/all' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
