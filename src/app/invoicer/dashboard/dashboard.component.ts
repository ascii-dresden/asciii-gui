import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../../environments/environment';
import { InvoicerService } from '../invoicer.service';
import { InvoiceDTO, OfferDTO, Project } from '../models';


@Component({
  selector: 'ascii-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();
  private _now = new Date();

  currentYear: number = this._now.getFullYear();
  currencyCode: string = environment.currencyCode;
  overdue: number;
  projects: Project[] = [];
  offers: OfferDTO[] = [];
  invoices: InvoiceDTO[] = [];

  constructor(private invoicer: InvoicerService) { }

  ngOnInit() {
    this.getProjects(projects => {
      this.getOffers(projects);
      this.getInvoices(projects);
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  sentOffers(): number {
    return this.offers
      .filter(o => o.sent)
      .map(o => o.net)
      .reduce((a, b) => a + b, 0);
  }

  approvedOffers(): number {
    return this.offers
      .filter(o => o.approved)
      .map(o => o.net)
      .reduce((a, b) => a + b, 0);
  }

  rejectedOffers(): number {
    return this.offers
      .filter(o => o.rejected)
      .map(o => o.net)
      .reduce((a, b) => a + b, 0);
  }

  sentInvoices(): number {
    return this.invoices
      .filter(i => i.sent)
      .map(i => i.net)
      .reduce((a, b) => a + b, 0);
  }

  pbcInvoices(): number {
    return this.invoices
      .filter(i => i.payedByCustomer)
      .map(i => i.net)
      .reduce((a, b) => a + b, 0);
  }

  peInvoices(): number {
    return this.invoices
      .filter(i => i.payedEmployees)
      .map(i => i.net)
      .reduce((a, b) => a + b, 0);
  }

  getOverdue(projects: Project[]): number {
    return projects
      .filter(p => p.invoice.date && !p.payedByCustomer &&
        (moment().add(-14, 'days').valueOf() > p.invoice.date)) // 14 Days in Milliseconds
      .map(p => p.invoice.net)
      .reduce((a, b) => a + b, 0);
  }

  getProjects(cb) {
    this._subscription.add(this.invoicer.findProjectsByYear(this.currentYear)
      .subscribe(projects => {
        this.projects = projects;
        this.overdue = this.getOverdue(projects);
        cb(projects);
      }));
  }

  getOffers(projects: Project[]) {
    this.offers = this.invoicer.getOffers(projects, 10);
  }

  getInvoices(projects: Project[]) {
    this.invoices = this.invoicer.getInvoices(projects, 10);
  }
}
