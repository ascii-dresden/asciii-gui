import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { InvoicerService } from '../invoicer.service';
import { Offer } from '../models/offer';
import { Invoice } from '../models/invoice';
import { SettingsService } from '../../settings.service';
import { LoggerService } from '../../logger/logger.service';


@Component({
  selector: 'ascii-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  currentQuarter: number;
  currencyCode: string;
  projects: any[] = [];
  offers: Offer[] = [];
  invoices: Invoice[] = [];

  constructor(private invoicer: InvoicerService, private settings: SettingsService, private logger: LoggerService) {
    this.currencyCode = this.settings.currencyCode;
    this.currentQuarter = this.getQuarter(new Date().getMonth());
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
        (now.setDate(now.getDate() - 14) > this.parseDate(p.invoice.date, 'dd.mm.yyyy')))
      .map(p => p.invoice.net_total);
  }

  private getProjects(next: any) {
    this._subscription.add(this.invoicer.findByYear(new Date().getFullYear().toString()).subscribe(data => {
      next(data);
      this.projects = data.sort((a: any, b: any) => {
        const a1 = this.parseDate(a.offer.date, 'dd.mm.yyyy');
        const b1 = this.parseDate(b.offer.date, 'dd.mm.yyyy');
        return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
      });
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

  private getQuarter(month: number): number {
    return Math.floor((month + 3) / 3);
  }

  private parseDate(input, format) {
    const parts = input.match(/(\d+)/g), fmt = {};
    let i = 0;
    format = format || 'yyyy-mm-dd';
    format.replace(/(yyyy|dd|mm)/g, function (part) { fmt[part] = i++; });

    return new Date(parts[fmt['yyyy']], parts[fmt['mm']] - 1, parts[fmt['dd']]);
  }
}
