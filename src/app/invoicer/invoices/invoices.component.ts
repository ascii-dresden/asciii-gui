import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../../environments/environment';
import { InvoicerService } from '../invoicer.service';
import { InvoiceDTO } from '../models';
import { InvoiceStatus } from '../models/invoice.dto';

@Component({
  selector: 'ascii-invoices',
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  currentYear: number;
  currencyCode: string = environment.currencyCode;
  invoices: InvoiceDTO[] = [];

  constructor(private route: ActivatedRoute, private location: Location, private invoicer: InvoicerService) {
    this.currentYear = +this.route.snapshot.paramMap.get('year');
  }

  ngOnInit() {
    let invoices: InvoiceDTO[] = [];
    let status: string;

    this._subscription.add(this.route.paramMap
      .subscribe(params => {
        status = params.get('status');
        this.changeState(status, invoices);
      }));
    this._subscription.add(this.invoicer.findInvoicesByYear(this.currentYear)
      .subscribe(data => {
        invoices = data;
        this.changeState(status, invoices);
      }));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
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
