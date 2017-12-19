import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicerComponent } from './invoicer.component';
import { InvoicerService } from './invoicer.service';
import { CheckPipe } from './check.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [InvoicerComponent, CheckPipe],
  providers: [InvoicerService]
})
export class InvoicerModule { }
