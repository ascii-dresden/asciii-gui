import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';
import { InvoicerService } from '../services/invoicer.service';
import { Bill, Client, Employee, Invoice, Item, Offer, Project, Service } from '../models';

@Component({
  selector: 'ascii-project-detail',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  currencyCode: string = environment.currencyCode;
  project: Project = <Project>{};
  client: Client = <Client>{};
  service: Service = <Service>{};
  offer: Offer = <Offer>{};
  offerItems: Item[] = [];
  invoice: Invoice = <Invoice>{};
  invoiceItems: Item[] = [];
  employees: Employee[] = [];
  offered: Bill[] = [];
  invoiced: Bill[] = [];

  constructor(private route: ActivatedRoute, private invoicer: InvoicerService, private location: Location) { }

  ngOnInit() {
    this.getProject();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private getProject() {
    this._subscription.add(this.invoicer.findProjectById(this.route.snapshot.paramMap.get('name')).subscribe(project => {
      this.project = project;
      this.client = project.client;
      this.service = project.service;
      this.offer = project.offer;
      this.offerItems = project.offer.items;
      this.invoice = project.invoice;
      this.invoiceItems = project.invoice.items;
      this.employees = project.service.employees;
      this.offered = project.bills.filter(o => o.type === 0);
      this.invoiced = project.bills.filter(o => o.type === 1);
    }));
  }
}
