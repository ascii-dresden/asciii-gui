import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { InvoicerService } from '../invoicer.service';
import { InvoiceDTO } from '../models/invoice.dto';
import { OfferDTO } from '../models/offer.dto';
import { Location } from '@angular/common';

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
    this._subscription.add(this.invoicer.findInvoicesByYear(this.currentYear, 9999)
      .subscribe(data => {
        invoices = data;
        this.changeState(status, invoices);
      }));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  private changeState(status: string, invoices: InvoiceDTO[]) {
    const now = new Date();

    switch (status) {
      case 'sent':
        this.invoices = invoices.filter(o => o.sent);
        break;
      case 'paid-by-customer':
        this.invoices = invoices.filter(o => o.payedByCustomer);
        break;
      case 'paid-employees':
        this.invoices = invoices.filter(o => o.payedEmployees);
        break;
      case 'overdue':
        this.invoices = invoices.filter(p => p.date && !p.payedByCustomer &&
          (now.setTime(now.getTime() - 1209600000) > p.date));
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
