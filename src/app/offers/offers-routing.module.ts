import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {OffersComponent} from './offers.component';

const routes: Routes = [
  { path: ':year/:status', component: OffersComponent },
  { path: ':year', redirectTo: ':year/all' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
