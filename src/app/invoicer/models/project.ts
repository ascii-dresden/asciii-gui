import { Bill, BillType } from './bill';
import { Client } from './client';
import { Invoice } from './invoice';
import { InvoicerUtils } from './invoicer-utils';
import { Offer } from './offer';
import { Service } from './service';

export class Project {

  private _id: string;
  private _name: string;
  private _date: number;
  private _manager: string;
  private _client: Client;
  private _service: Service;
  private _offer: Offer;
  private _invoice: Invoice;
  private _bills: Bill[] = [];
  private _readyForOffer: boolean;
  private _readyForInvoice: boolean;
  private _readyForArchive: boolean;
  private _payedByCustomer: boolean;
  private _payedEmployees: boolean;
  private _canceled: boolean;

  constructor(project) {
    this._id = project.id;
    this._name = project.event.name;
    this._date = InvoicerUtils.parseDate(project.event.date);
    this._manager = project.event.manager;
    this._client = new Client(
      project.client.full_name,
      project.client.address,
      project.client.email
    );
    this._service = new Service(
      project.service.time,
      project.service.tax,
      project.service.salary,
      project.service.employees
    );
    this._offer = new Offer(project);
    this._invoice = new Invoice(project);
    project.bills.offer.forEach(b => this._bills.push(new Bill(BillType.Offered, b.name, b.price, b.unit, b.amount, b.tax)));
    project.bills.invoice.forEach(b => this._bills.push(new Bill(BillType.Invoiced, b.name, b.price, b.unit, b.amount, b.tax)));
    this._readyForOffer = project.checks.ready_for_offer;
    this._readyForInvoice = project.checks.ready_for_invoice;
    this._readyForArchive = project.checks.ready_for_archive;
    this._payedByCustomer = project.checks.payed_by_customer;
    this._payedEmployees = project.checks.payed_employees;
    this._canceled = project.checks.canceled;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get date(): number {
    return this._date;
  }

  get manager(): string {
    return this._manager;
  }

  get client(): Client {
    return this._client;
  }

  get service(): Service {
    return this._service;
  }

  get offer(): Offer {
    return this._offer;
  }

  get invoice(): Invoice {
    return this._invoice;
  }

  get bills(): Bill[] {
    return this._bills;
  }

  get readyForOffer(): boolean {
    return this._readyForOffer;
  }

  get readyForInvoice(): boolean {
    return this._readyForInvoice;
  }

  get readyForArchive(): boolean {
    return this._readyForArchive;
  }

  get payedByCustomer(): boolean {
    return this._payedByCustomer;
  }

  get payedEmployees(): boolean {
    return this._payedEmployees;
  }

  get canceled(): boolean {
    return this._canceled;
  }
}
