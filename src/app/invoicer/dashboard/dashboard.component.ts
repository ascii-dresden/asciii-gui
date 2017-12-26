import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { InvoicerService } from '../invoicer.service';
import { InvoiceDTO } from '../models/invoice.dto';
import { OfferDTO } from '../models/offer.dto';
import { Project } from '../models/project';
import { environment } from '../../../environments/environment';


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
    this.getProjects();
    this.getOffers();
    this.getInvoices();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  sentOffers(): number {
    return this.offers
      .filter(o => o.sent)
      .map(o => o.gross)
      .reduce((a, b) => a + b, 0);
  }

  approvedOffers(): number {
    return this.offers
      .filter(o => o.approved)
      .map(o => o.gross)
      .reduce((a, b) => a + b, 0);
  }

  rejectedOffers(): number {
    return this.offers
      .filter(o => o.rejected)
      .map(o => o.gross)
      .reduce((a, b) => a + b, 0);
  }

  sentInvoices(): number {
    return this.invoices
      .filter(i => i.sent)
      .map(i => i.gross)
      .reduce((a, b) => a + b, 0);
  }

  pbcInvoices(): number {
    return this.invoices
      .filter(i => i.payedByCustomer)
      .map(i => i.gross)
      .reduce((a, b) => a + b, 0);
  }

  peInvoices(): number {
    return this.invoices
      .filter(i => i.payedEmployees)
      .map(i => i.gross)
      .reduce((a, b) => a + b, 0);
  }

  private getOverdue(projects: Project[]): number {
    const now = this._now;

    return projects
      .filter(p => p.invoice.date && !p.payedByCustomer &&
        (now.setTime(now.getTime() - 1209600000) > p.invoice.date)) // 14 Days in Milliseconds
      .map(p => p.invoice.gross)
      .reduce((a, b) => a + b, 0);
  }

  private getProjects() {
    this._subscription.add(this.invoicer.findProjectsByYear(this.currentYear)
      .subscribe(projects => {
        this.projects = projects;
        this.overdue = this.getOverdue(projects);
      }));
  }

  private getOffers() {
    this._subscription.add(this.invoicer.findOffersByYear(this.currentYear)
      .subscribe(offers => this.offers = offers));
  }

  private getInvoices() {
    this._subscription.add(this.invoicer.findInvoicesByYear(this.currentYear)
      .subscribe(invoices => this.invoices = invoices));
  }
}
