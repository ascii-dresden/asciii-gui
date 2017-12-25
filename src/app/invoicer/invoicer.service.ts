import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';
import 'rxjs/add/operator/map';
import * as moment from 'moment/moment';
import { OfferDTO } from './models/offer.dto';
import { InvoiceDTO } from './models/invoice.dto';
import { Project } from './models/project';


@Injectable()
export class InvoicerService {

  private url = 'http://localhost:8000/api/projects';

  constructor(private http: HttpClient, private logger: LoggerService) { }

  findAllProjects(): Observable<Project[]> {
    return this.http.get(this.url)
      .map(this.parseDates)
      .map(p => new Project(p))
      .map(this.sort)
      .pipe(
        tap(() => this.log('fetched projects')),
        catchError(this.handleError('findAllProjects', []))
      );
  }

  findProjectsByYear(year: number): Observable<Project[]> {
    return this.http.get(`${this.url}/year/${year}`)
      .map(this.parseDates)
      .map(p => new Project(p))
      .map(this.sort)
      .pipe(
        tap(() => this.log(`fetched projects w/ year=${year}`)),
        catchError(this.handleError<any[]>(`findProjectsByYear w/ year=${year}`, []))
      );
  }

  findProjectById(id: string): Observable<Project> {
    return this.http.get(`${this.url}/${id}`)
      .map(this.parseDates)
      .map(p => new Project(p))
      .pipe(
        tap(() => this.log(`fetched project w/ id=${id}`)),
        catchError(this.handleError<any>(`findProjectById w/ id=${id}`, {}))
      );
  }

  findOffersByYear(year: number, maxResults = 10): Observable<OfferDTO[]> {
    return this.http.get(`${this.url}/year/${year}`)
      .map(this.parseDates)
      .map(p => new OfferDTO(p))
      .map(this.sort)
      .map(o => this.slice(o, maxResults))
      .pipe(
        tap(() => this.log(`fetched offers w/ year=${year}`)),
        catchError(this.handleError<any[]>(`findOffersByYear w/ year=${year}`, []))
      );
  }

  findInvoicesByYear(year: number, maxResults = 10): Observable<InvoiceDTO[]> {
    return this.http.get(`${this.url}/year/${year}`)
      .map(this.parseDates)
      .map(p => new InvoiceDTO(p))
      .map(this.sort)
      .map(i => this.slice(i, maxResults))
      .pipe(
        tap(() => this.log(`fetched invoices w/ year=${year}`)),
        catchError(this.handleError<any[]>(`findInvoicesByYear w/ year=${year}`, []))
      );
  }

  private slice(data, maxResults: number) {
    return data.slice(Math.max(data.length - maxResults, 1));
  }

  private sort(data) {
    return data.sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
  }

  private parseDates(data: any[] | any): any[] | any {
    for (const o of data) {
      o.event.date = moment(o.event.date, 'DD.MM.YYYY').isValid()
        ? moment(o.event.date, 'DD.MM.YYYY').toDate() : o.event.name;
      o.offer.date = moment(o.offer.date, 'DD.MM.YYYY').isValid()
        ? moment(o.offer.date, 'DD.MM.YYYY').toDate() : o.offer.date;
      o.invoice.date = moment(o.invoice.date, 'DD.MM.YYYY').isValid()
        ? moment(o.invoice.date, 'DD.MM.YYYY').toDate() : o.invoice.date;
    }

    return data;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.logger.info(`InvoicerService: ${message}`);
  }
}
