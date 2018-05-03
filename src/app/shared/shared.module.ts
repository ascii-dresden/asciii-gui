import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FontAwesomeBoolComponent} from './font-awesome-bool.component';
import {JoinBillPipe} from './join-bill.pipe';
import {DueDatePipe} from './due-date.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FontAwesomeBoolComponent,
    JoinBillPipe,
    DueDatePipe,
  ],
  declarations: [
    FontAwesomeBoolComponent,
    JoinBillPipe,
    DueDatePipe,
  ]
})
export class SharedModule { }
