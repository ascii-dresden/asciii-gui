import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';
import 'rxjs/add/operator/map';
import * as moment from 'moment/moment';


@Injectable()
export class InvoicerMockService {

  private url = 'http://localhost:3000/projects';

  constructor(private http: HttpClient, private logger: LoggerService) { }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url).map(this.parseDates).pipe(
      tap(() => this.log('fetched projects')),
      catchError(this.handleError('find projects', []))
    );
  }

  findByYear(year: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/year/${year}`).map(this.parseDates).pipe(
      tap(() => this.log(`fetched projects w/ year=${year}`)),
      catchError(this.handleError<any[]>('findAll projects', []))
    );
  }

  findById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`).map(this.parseDates).pipe(
      tap(() => this.log(`fetched project w/ id=${id}`)),
      catchError(this.handleError(`find project by id=${id}`, {}))
    );
  }

  private parseDates(projects: any | any[]) {
    for (const project of projects) {
      project.event.date = moment(project.event.date, 'DD.MM.YYYY').isValid()
        ? moment(project.event.date, 'DD.MM.YYYY').toDate() : project.event.name;
      project.offer.date = moment(project.offer.date, 'DD.MM.YYYY').isValid()
        ? moment(project.offer.date, 'DD.MM.YYYY').toDate() : project.offer.date;
      project.invoice.date = moment(project.invoice.date, 'DD.MM.YYYY').isValid()
        ? moment(project.invoice.date, 'DD.MM.YYYY').toDate() : project.invoice.date;
    }

    return projects;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.logger.info(`InvoicerMockService: ${message}`);
  }
}
