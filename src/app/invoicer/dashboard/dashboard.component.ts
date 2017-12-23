import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SettingsService } from '../../settings.service';
import { InvoicerService } from '../invoicer.service';
import { Invoice } from '../models/invoice';
import { Offer } from '../models/offer';


@Component({
  selector: 'ascii-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();
  private _now = new Date();

  currentYear: number = this._now.getFullYear();
  currentQuarter: number = Math.floor((this._now.getMonth() + 3) / 3);
  currencyCode: string;
  projects: any[] = [];
  offers: Offer[] = [];
  invoices: Invoice[] = [];

  constructor(private invoicer: InvoicerService, private settings: SettingsService) {
    this.currencyCode = this.settings.currencyCode;
  }

  ngOnInit() {
    this.getProjects((projects: any[]) => {
      this.getRecentOffers(projects);
      this.getRecentInvoices(projects);
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  sentOffers(): string[] {
    return this.offers
      .filter(o => o.sent)
      .map(o => o.balance);
  }

  approvedOffers(): string[] {
    return this.offers
      .filter(o => o.approved)
      .map(o => o.balance);
  }

  rejectedOffers(): string[] {
    return this.offers
      .filter(o => o.rejected)
      .map(o => o.balance);
  }

  sentInvoices(): string[] {
    return this.invoices
      .filter(i => i.sent)
      .map(i => i.balance);
  }

  pbcInvoices(): string[] {
    return this.invoices
      .filter(i => i.payedByCustomer)
      .map(i => i.balance);
  }

  peInvoices(): string[] {
    return this.invoices
      .filter(i => i.payedEmployees)
      .map(i => i.balance);
  }

  overdue(): string[] {
    const now = new Date();

    return this.projects
      .filter(p => p.invoice.date && !p.checks.payed_by_customer &&
        (now.setDate(now.getDate() - 14) > p.invoice.date.getDate()))
      .map(p => p.invoice.net_total);
  }

  private getProjects(next: any) {
    this._subscription.add(this.invoicer.findByYear(this.currentYear).subscribe(data => {
      next(data);
      this.projects = data.sort((a, b) => a.offer.date < b.offer.date ? -1 : a.offer.date > b.offer.date ? 1 : 0);
    }));
  }

  private getRecentOffers(projects: any[]) {
    this.offers = projects
      .map(p => new Offer(p))
      .sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0)
      .slice(Math.max(projects.length - 10, 1));
  }

  private getRecentInvoices(projects: any[]) {
    this.invoices = projects
      .map(p => new Invoice(p))
      .filter(p => (null !== p.date))
      .sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);

    this.invoices = this.invoices.slice(Math.max(this.invoices.length - 10, 1));
  }
}
