import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { InvoicerService } from '../invoicer.service';
import { Project } from '../models/project';
import { environment } from '../../../environments/environment';
import { Bill } from '../models/bill';
import { Client } from '../models/client';
import { Service } from '../models/serice';
import { Offer } from '../models/offer';
import { Invoice } from '../models/invoice';
import { Employee } from '../models/employee';
import { Item } from '../models/item';

@Component({
  selector: 'ascii-project-detail',
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

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

  goBack() {
    this.location.back();
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

@Pipe({ name: 'join' })
export class JoinBill implements PipeTransform {

  transform(values: any[]): string {
    return values.map(v => v.name).join(', ');
  }
}
