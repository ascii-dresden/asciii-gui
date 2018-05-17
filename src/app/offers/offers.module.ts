import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OffersRoutingModule
  ],
  declarations: [OffersComponent]
})
export class OffersModule { }
