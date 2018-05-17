import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { LoggerService } from './logger/logger.service';
import { InvoiceDTO, OfferDTO, Project } from '@app/models';

@Injectable()
export class InvoicerService {

  private url = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private logger: LoggerService) { }

  findAllProjects(): Observable<Project[]> {
    return this.http.get<any>(`${this.url}/full_projects`).pipe(
      map((p: any) => {
        let projects: any[] = [];

        for (const entries of Object.entries(p)) {
          const project: any = entries[1];
          project.id = entries[0];
          projects.push(project);
        }

        projects = projects.map(o => new Project(o));
        projects = projects.sort(this.sort);
        return projects;
      }),
      tap(() => this.log('fetched projects')),
      catchError(this.handleError('findAllProjects', []))
    );
  }

  findProjectsByYear(year: number): Observable<Project[]> {
    return this.http.get<any>(`${this.url}/full_projects/year/${year}`).pipe(
      map((p: any) => {
        let projects: any[] = [];

        for (const entries of Object.entries(p)) {
          const project: any = entries[1];
          project.id = entries[0];
          projects.push(project);
        }

        projects = projects.map(o => new Project(o));
        projects = projects.sort(this.sort);
        return projects;
      }),
      tap(() => this.log(`fetched projects w/ year=${year}`)),
      catchError(this.handleError<any[]>(`findProjectsByYear w/ year=${year}`, []))
    );
  }

  findProjectById(id: string): Observable<Project> {
    return this.http.get<any>(`${this.url}/projects/${id}`).pipe(
      map(p => new Project(p)),
      tap(() => this.log(`fetched project w/ id=${id}`)),
      catchError(this.handleError<any>(`findProjectById w/ id=${id}`, {}))
    );
  }

  findOffersByYear(year: number): Observable<OfferDTO[]> {
    return this.http.get<any>(`${this.url}/full_projects/year/${year}`).pipe(
      map((p: any) => {
        let offers: any[] = [];
        for (const entries of Object.entries(p)) {
          const project: any = entries[1];
          project.id = entries[0];
          offers.push(project);
        }
        offers = offers.map(o => new Project(o));
        offers = offers.map(o => new OfferDTO(o));
        offers = offers.sort(this.sort);
        return offers;
      }),
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
    return this.http.get<any>(`${this.url}/full_projects/year/${year}`).pipe(
      map((p: any) => {
        let invoices: any[] = [];

        for (const entries of Object.entries(p)) {
          const project: any = entries[1];
          project.id = entries[0];
          invoices.push(project);
        }

        invoices = invoices.map(o => new Project(o));
        invoices = invoices.filter(o => !o.canceled && o.invoice.date);
        invoices = invoices.map(o => new InvoiceDTO(o));
        invoices = invoices.sort(this.sort);
        return invoices;
      }),
      tap(() => this.log(`fetched invoices w/ year=${year}`)),
      catchError(this.handleError<any[]>(`findInvoicesByYear w/ year=${year}`, []))
    );
  }

  getInvoices(projects: Project[], allInvoices?: (i: InvoiceDTO[]) => void, maxResults = Number.MAX_VALUE): InvoiceDTO[] {
    const invoices = projects
      .filter(p => !p.canceled && p.invoice.number)
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
    this.logger.info(`InvoicerService: ${message}`);
  }
}
