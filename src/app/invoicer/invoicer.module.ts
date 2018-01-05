import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { config } from '../../environments/config';

import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule } from '../components/font-awesome/font-awesome.module';
import { AsciiPipeModule } from '../components/pipes/ascii-pipe.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicerMockService } from './invoicer-mock.service';
import { InvoicerComponent } from './invoicer.component';
import { InvoicerService } from './invoicer.service';
import { InvoicesComponent } from './invoices/invoices.component';
import { OffersComponent } from './offers/offers.component';
import { DueDatePipe } from './pipes/due-date.pipe';
import { JoinBillPipe } from './pipes/join-bill.pipe';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    AsciiPipeModule
  ],
  declarations: [
    InvoicerComponent,
    ProjectComponent,
    ProjectsComponent,
    DashboardComponent,
    DueDatePipe,
    JoinBillPipe,
    OffersComponent,
    InvoicesComponent
  ],
  providers: [
    { provide: InvoicerService, useClass: config.invoicerMockApi ? InvoicerMockService : InvoicerService }
  ]
})
export class InvoicerModule { }
