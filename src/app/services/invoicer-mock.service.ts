import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';

import { LoggerService } from './logger/logger.service';
import { InvoiceDTO, OfferDTO, Project } from '../models/index';

@Injectable()
export class InvoicerMockService {

  private url = 'http://localhost:3001/api/projects';

  constructor(private http: HttpClient, private logger: LoggerService) { }

  findAllProjects(): Observable<Project[]> {
    return this.http.get<any[]>(this.url)
      .map((p: any[]) => {
        p = p.map(o => new Project(o));
        p = p.sort(this.sort);
        return p;
      })
      .pipe(
        tap(() => this.log('fetched projects')),
        catchError(this.handleError('findAllProjects', []))
      );
  }

  findProjectsByYear(year: number): Observable<Project[]> {
    return this.http.get<any[]>(`${this.url}/year/${year}`)
      .map((p: any[]) => {
        p = p.map(o => new Project(o));
        p = p.sort(this.sort);
        return p;
      })
      .pipe(
        tap(() => this.log(`fetched projects w/ year=${year}`)),
        catchError(this.handleError<any[]>(`findProjectsByYear w/ year=${year}`, []))
      );
  }

  findProjectById(id: string): Observable<Project> {
    return this.http.get<any>(`${this.url}/${id}`)
      .map(p => new Project(p))
      .pipe(
        tap(() => this.log(`fetched project w/ id=${id}`)),
        catchError(this.handleError<any>(`findProjectById w/ id=${id}`, {}))
      );
  }

  findOffersByYear(year: number): Observable<OfferDTO[]> {
    return this.http.get<any[]>(`${this.url}/year/${year}`)
      .map((p: any[]) => {
        p = p.map(o => new Project(o));
        p = p.map(o => new OfferDTO(o));
        p = p.sort(this.sort);
        return p;
      })
      .pipe(
        tap(() => this.log(`fetched offers w/ year=${year}`)),
        catchError(this.handleError<any[]>(`findOffersByYear w/ year=${year}`, []))
      );
  }

  getOffers(projects: Project[], allOffers?: (o: OfferDTO[]) => void, maxResults = Number.MAX_VALUE): OfferDTO[] {
    const offers = projects
      .map(o => new OfferDTO(o));

    allOffers(offers);

    return offers
      .sort(this.sort)
      .slice(Math.max(offers.length - maxResults));
  }

  findInvoicesByYear(year: number): Observable<InvoiceDTO[]> {
    return this.http.get<any[]>(`${this.url}/year/${year}`)
      .map((p: any[]) => {
        p = p.map(o => new Project(o));
        p = p.map(o => new InvoiceDTO(o));
        p = p.sort(this.sort);
        return p;
      })
      .pipe(
        tap(() => this.log(`fetched invoices w/ year=${year}`)),
        catchError(this.handleError<any[]>(`findInvoicesByYear w/ year=${year}`, []))
      );
  }

  getInvoices(projects: Project[], allInvoices?: (i: InvoiceDTO[]) => void, maxResults = Number.MAX_VALUE): InvoiceDTO[] {
    const invoices = projects
      .filter(p => !p.canceled && p.invoice.date)
      .map(p => new InvoiceDTO(p));

    allInvoices(invoices);

    return invoices
      .sort(this.sort)
      .slice(Math.max(invoices.length - maxResults));
  }

  private sort(a, b) {
    return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.logger.info(`InvoicerMockService: ${message}`);
  }
}
