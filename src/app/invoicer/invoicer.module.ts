import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InvoicerComponent } from './invoicer.component';
import { InvoicerService } from './invoicer.service';

@NgModule({
  imports: [CommonModule],
  declarations: [InvoicerComponent],
  providers: [InvoicerService]
})
export class InvoicerModule {}
