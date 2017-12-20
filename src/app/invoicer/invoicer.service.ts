import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { LoggerService } from '../logger/logger.service';
import 'rxjs/add/operator/map';

@Injectable()
export class InvoicerService {

  private url = 'http://localhost:8000/api/projects/year/2017';

  constructor(private http: HttpClient, private logger: LoggerService) { }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      tap(() => this.log('fetched projects')),
      catchError(this.handleError('findAll projects', []))
    );
  }

  findById(id: string | number): Observable<any> {
    const id = typeof id === 'number' ? id : Number(id);

    // TODO: Server endpoint
    return this.http.get<any>(`${this.url}/${id - 1}`).pipe(
      tap(() => this.logger.info(`fetched project w/ id=${id}`)),
      catchError(this.handleError(`find project by id=${id}`, {}))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.logger.info(`PersonService: ${message}`);
  }
}
