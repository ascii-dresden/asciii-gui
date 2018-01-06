import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../../environments/environment';
import { CookieService } from '../../cookie.service';
import { EmitterService } from '../../emitter.service';
import { InvoicerService } from '../invoicer.service';
import { InvoiceDTO, InvoiceStatus } from '../models';

@Component({
  selector: 'ascii-invoices',
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  year: number;
  currencyCode: string = environment.currencyCode;
  invoices: InvoiceDTO[] = [];

  constructor(private cookieService: CookieService, private router: Router,
              private route: ActivatedRoute, private invoicer: InvoicerService) {
    this.year = +this.route.snapshot.paramMap.get('year');
  }

  ngOnInit() {
    let data: InvoiceDTO[] = [];
    let status: string;

    this.getInvoices(invoices => {
      this.invoices = invoices;
      data = invoices;
      this.changeState(status, data);
    });

    this.getYear(year => {
      this.year = year;
      this.router.navigate(['/invoicer/invoices', this.year, status]);
      this.getInvoices(invoices => {
        this.invoices = invoices;
        data = invoices;
        this.changeState(status, data);
      });
    });

    this.getStatus(newStatus => {
      status = newStatus;
      this.changeState(status, data);
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  getStatus(next: (status: string) => void): void {
    this._subscription.add(this.route.paramMap.subscribe(params => next(params.get('status'))));
  }

  getInvoices(next: (invoices: InvoiceDTO[]) => void): void {
    this._subscription.add(this.invoicer.findInvoicesByYear(this.year).subscribe(invoices => next(invoices)));
  }

  getYear(next: (year: number) => void): void {
    this._subscription.add(EmitterService.get('activeYear').subscribe(year => next(year)));
  }

  private changeState(status: string, invoices: InvoiceDTO[]) {
    switch (status) {
      case 'open':
        this.invoices = invoices.filter(o =>
          o.status === InvoiceStatus.Open ||
          o.status === InvoiceStatus.Overdue
        );
        break;
      case 'paid':
        this.invoices = invoices.filter(o =>
          o.status === InvoiceStatus.OpenPaymentToEmployees ||
          o.status === InvoiceStatus.PaidAll);
        break;
      case 'all':
        this.invoices = invoices;
        break;
      default:
        this.invoices = invoices;
        break;
    }
  }
}
