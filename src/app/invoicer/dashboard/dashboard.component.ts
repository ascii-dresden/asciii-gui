import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { InvoicerService } from '../invoicer.service';

@Component({
  selector: 'ascii-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  projects;
  offers;
  invoices;

  constructor(private invoicer: InvoicerService) { }

  ngOnInit() {
    this.getProjects((projects: any[]) => {
      this.getRecentOffers(projects);
      this.getRecentInvoices(projects);
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private getProjects(next: any) {
    this._subscription.add(this.invoicer.findByYear(new Date().getFullYear().toString()).subscribe(data => {
      this.projects = data;
      next(data);
    }));
  }

  private getRecentOffers(projects: any[]) {
    this.offers = projects.map(p => p.offer).sort((a, b) => {
      const dA = this.parseDate(a.date, 'dd.mm.yyyy');
      const dB = this.parseDate(b.date, 'dd.mm.yyyy');
      return dA < dB ? -1 : dA > dB ? 1 : 0;
    }).slice(Math.max(projects.length - 10, 1));
  }

  private getRecentInvoices(projects: any[]) {
    this.invoices = projects.map(p => p.invoice).sort((a, b) => {
      console.log(projects.map(p => p.invoice));
      const dA = this.parseDate(a.date, 'dd.mm.yyyy');
      const dB = this.parseDate(b.date, 'dd.mm.yyyy');
      return dA < dB ? -1 : dA > dB ? 1 : 0;
    }).slice(Math.max(projects.length - 10, 1));
  }

  private parseDate(input, format) {
    if (!input) {
      return;
    }
    const parts = input.match(/(\d+)/g), fmt = {};
    let i = 0;
    format = format || 'yyyy-mm-dd';
    format.replace(/(yyyy|dd|mm)/g, function (part) { fmt[part] = i++; });

    return new Date(parts[fmt['yyyy']], parts[fmt['mm']] - 1, parts[fmt['dd']]);
  }
}
