import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InvoicerComponent } from './invoicer.component';
import { InvoicerService } from './invoicer.service';
import { AsciiPipeModule } from '../components/pipes/ascii-pipe.module';
import { FontAwesomeModule } from '../components/font-awesome/font-awesome.module';
import { PayedComponent } from './components/payed.component';
import { JoinBill, ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectComponent } from './project/project.component';
import { AppRoutingModule } from '../app-routing.module';

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
    JoinBill
  ],
  providers: [InvoicerService]
})
export class InvoicerModule { }
