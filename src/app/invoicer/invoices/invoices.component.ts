import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { InvoicerService } from '../invoicer.service';
import { InvoiceDTO } from '../models/invoice.dto';

@Component({
  selector: 'ascii-invoices',
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  currentYear: number;
  currencyCode: string = environment.currencyCode;
  invoices: InvoiceDTO[] = [];

  constructor(private route: ActivatedRoute, private invoicer: InvoicerService) {
    this.currentYear = +this.route.snapshot.paramMap.get('year');
  }

  ngOnInit() {
    this._subscription.add(this.invoicer.findInvoicesByYear(this.currentYear, 9999)
      .subscribe(invoices => this.invoices = invoices));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
