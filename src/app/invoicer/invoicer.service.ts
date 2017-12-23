import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggerService } from '../logger/logger.service';
import 'rxjs/add/operator/map';
import * as moment from 'moment/moment';


@Injectable()
export class InvoicerService {

  private url = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private logger: LoggerService) { }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/projects`).map(this.parseDates).pipe(
      tap(() => this.log('fetched projects')),
      catchError(this.handleError('find projects', []))
    );
  }

  findByYear(year: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/projects/year/${year}`).map(this.parseDates).pipe(
      tap(() => this.log(`fetched projects w/ year=${year}`)),
      catchError(this.handleError<any[]>('findAll projects', []))
    );
  }

  findByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.url}/projects/${name}`).map(this.parseDates).pipe(
      tap(() => this.log(`fetched project w/ name=${name}`)),
      catchError(this.handleError(`find project by name=${name}`, {}))
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

  private parseDate(input, format?) {
    const parts = input.match(/(\d+)/g), fmt = {};
    let i = 0;
    format = format || 'dd.mm.yyyy';
    format.replace(/(yyyy|dd|mm)/g, function (part) { fmt[part] = i++; });

    return new Date(parts[fmt['yyyy']], parts[fmt['mm']] - 1, parts[fmt['dd']]);
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
