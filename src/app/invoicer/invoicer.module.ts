import { CommonModule } from '@angular/common';
import { isDevMode, NgModule } from '@angular/core';
import { settings } from '../../environments/settings';
import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule } from '../components/font-awesome/font-awesome.module';
import { AsciiPipeModule } from '../components/pipes/ascii-pipe.module';
import { PayedComponent } from './components/payed.component';
import { InvoicerMockService } from './invoicer-mock.service';
import { InvoicerComponent } from './invoicer.component';
import { InvoicerService } from './invoicer.service';
import { JoinBill, ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectComponent } from './project/project.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConvertBalancePipe } from './pipes/convert-balance.pipe';
import { DueDatePipe } from './pipes/due-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FontAwesomeModule,
    AsciiPipeModule
  ],
  declarations: [
    InvoicerComponent,
    PayedComponent,
    ProjectDetailComponent,
    ProjectComponent,
    JoinBill,
    DashboardComponent,
    ConvertBalancePipe,
    DueDatePipe
  ],
  providers: [
    { provide: InvoicerService, useClass: (isDevMode() && settings.os === 'windows') ? InvoicerMockService : InvoicerService }
  ]
})
export class InvoicerModule { }
