import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '@app/shared';
import {InvoicesRoutingModule} from './invoices-routing.module';
import {InvoicesComponent} from './invoices.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    InvoicesRoutingModule,
  ],
  declarations: [InvoicesComponent]
})
export class InvoicesModule { }
