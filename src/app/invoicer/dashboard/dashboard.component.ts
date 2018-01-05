import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../../environments/environment';
import { EmitterService } from '../../emitter.service';
import { InvoicerService } from '../invoicer.service';
import { InvoiceDTO, OfferDTO, Project } from '../models';
import { InvoiceStatus } from '../models/invoice.dto';
import { OfferStatus } from '../models/offer.dto';
import { CookieService } from '../../cookie.service';


@Component({
  selector: 'ascii-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  year: number = new Date().getFullYear();
  currencyCode: string = environment.currencyCode;
  projects: Project[] = [];
  offers: OfferDTO[] = [];
  invoices: InvoiceDTO[] = [];

  offerPending: number;
  offerApproved: number;
  offerCanceled: number;

  invoiceDue: number;
  invoicePaid: number;
  invoiceOpenPaymentToEmployee: number;
  invoiceOverdue: number;

  constructor(private cookieService: CookieService, private invoicer: InvoicerService) { }

  ngOnInit() {
    this.getYear(() => {
      this.getProjects(projects => {
        this.getOffers(projects);
        this.getInvoices(projects);
      });
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  getYear(next: () => void) {
    this._subscription.add(EmitterService.get('activeYear')
      .subscribe(data => {
        this.year = data;
        next();
      }));
  }

  getProjects(cb) {
    this._subscription.add(this.invoicer.findProjectsByYear(this.year)
      .subscribe(projects => {
        this.projects = projects;
        cb(projects);
      }));
  }

  getOffers(projects: Project[]) {
    this.offers = this.invoicer.getOffers(projects, offers => {
      this.offerPending = this.countNet(offers.filter(o =>
        o.status === OfferStatus.Pending
      ));
      this.offerApproved = this.countNet(offers.filter(o =>
        o.status === OfferStatus.Approved
      ));
      this.offerCanceled = this.countNet(offers.filter(o =>
        o.status === OfferStatus.Canceled
      ));
    }, 10);
  }

  getInvoices(projects: Project[]) {
    this.invoices = this.invoicer.getInvoices(projects, invoices => {
      this.invoiceDue = this.countNet(invoices.filter(i =>
        i.status === InvoiceStatus.Open ||
        i.status === InvoiceStatus.Overdue
      ));
      this.invoicePaid = this.countNet(invoices.filter(i =>
        i.status === InvoiceStatus.PaidAll
      ));
      this.invoiceOpenPaymentToEmployee = invoices.filter(i =>
        i.status === InvoiceStatus.OpenPaymentToEmployees
      ).map(i => i.serviceWage).reduce((a, b) => a + b, 0);
      this.invoiceOverdue = this.countNet(invoices.filter(i =>
        i.status === InvoiceStatus.Overdue
      ));
    }, 10);
  }

  countNet(data): number {
    return data.map(i => i.net).reduce((a, b) => a + b, 0);
  }
}
