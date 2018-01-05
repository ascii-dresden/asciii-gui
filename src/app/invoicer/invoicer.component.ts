import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../emitter.service';

@Component({
  selector: 'ascii-invoicer',
  templateUrl: './invoicer.component.html'
})
export class InvoicerComponent implements OnInit {

  years: number[] = [];
  activeYear: number;

  ngOnInit() {
    for (let i = 2013; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }
    this.activeYear = this.years[this.years.length - 1];
  }

  changeYear(year) {
    EmitterService.get('activeYear').emit(year);
  }
}
