import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../emitter.service';
import { CookieService } from '../cookie.service';

@Component({
  selector: 'ascii-invoicer',
  templateUrl: './invoicer.component.html'
})
export class InvoicerComponent implements OnInit {

  years: number[] = [];
  activeYear: number;

  constructor(private cookieService: CookieService) { }

  ngOnInit() {
    for (let i = 2012; i <= new Date().getFullYear(); i++) {
      this.years.push(i);
    }

    if (this.cookieService.check('activeYear')) {
      this.activeYear = +this.cookieService.get('activeYear');
    } else {
      this.activeYear = this.years[this.years.length - 1];
    }

    EmitterService.get('activeYear').emit(this.activeYear);
  }

  changeYear(year) {
    this.activeYear = year;
    EmitterService.get('activeYear').emit(year);
    this.cookieService.set('activeYear', year, 2592000000, '/invoicer');
  }
}
