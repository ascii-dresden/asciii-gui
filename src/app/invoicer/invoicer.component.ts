import { Component } from '@angular/core';

@Component({
  selector: 'ascii-invoicer',
  templateUrl: './invoicer.component.html'
})
export class InvoicerComponent {
  year = new Date().getFullYear();
}
