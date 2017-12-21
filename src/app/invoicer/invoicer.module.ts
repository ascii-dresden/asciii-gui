import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { settings } from '../../environments/settings';
import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule } from '../components/font-awesome/font-awesome.module';
import { AsciiPipeModule } from '../components/pipes/ascii-pipe.module';
import { LoggerService } from '../logger/logger.service';
import { PayedComponent } from './components/payed.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicerMockService } from './invoicer-mock.service';
import { InvoicerComponent } from './invoicer.component';
import { InvoicerService } from './invoicer.service';
import { ConvertBalancePipe } from './pipes/convert-balance.pipe';
import { ConvertDatePipe } from './pipes/convert-date.pipe';
import { DueDatePipe } from './pipes/due-date.pipe';
import { JoinBill, ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectComponent } from './project/project.component';


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
    DueDatePipe,
    ConvertDatePipe
  ],
  providers: [
    {
      provide: InvoicerService,
      useFactory: (http: HttpClient, logger: LoggerService) =>
        environment.production ? new InvoicerService(http, logger) : settings.os === 'linux'
          ? new InvoicerService(http, logger) : new InvoicerMockService(http, logger),
      deps: [HttpClient, LoggerService]
    }
  ]
})
export class InvoicerModule {}
