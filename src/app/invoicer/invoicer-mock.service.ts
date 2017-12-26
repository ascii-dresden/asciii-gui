import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';
import 'rxjs/add/operator/map';
import { InvoiceDTO } from './models/invoice.dto';
import { OfferDTO } from './models/offer.dto';
import { Project } from './models/project';


@Injectable()
export class InvoicerMockService {

  private url = 'http://localhost:3000/projects';

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

  findOffersByYear(year: number, maxResults = 10): Observable<OfferDTO[]> {
    return this.http.get<any[]>(`${this.url}/year/${year}`)
      .map((p: any[]) => {
        p = p.map(o => new OfferDTO(o));
        p = p.sort(this.sort);
        p = p.slice(Math.max(p.length - maxResults, 1));
        return p;
      })
      .pipe(
        tap(() => this.log(`fetched offers w/ year=${year}`)),
        catchError(this.handleError<any[]>(`findOffersByYear w/ year=${year}`, []))
      );
  }

  findInvoicesByYear(year: number, maxResults = 10): Observable<InvoiceDTO[]> {
    return this.http.get<any[]>(`${this.url}/year/${year}`)
      .map((p: any[]) => {
        p = p.map(o => new InvoiceDTO(o));
        p = p.sort(this.sort);
        p = p.slice(Math.max(p.length - maxResults, 1));
        return p;
      })
      .pipe(
        tap(() => this.log(`fetched invoices w/ year=${year}`)),
        catchError(this.handleError<any[]>(`findInvoicesByYear w/ year=${year}`, []))
      );
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
