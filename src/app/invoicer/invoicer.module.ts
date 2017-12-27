import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule } from '../components/font-awesome/font-awesome.module';
import { AsciiPipeModule } from '../components/pipes/ascii-pipe.module';
import { DashboardComponent } from './dashboard/dashboard.component';
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
  providers: [InvoicerService]
})
export class InvoicerModule { }
