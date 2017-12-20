import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from '../../logger/logger.service';
import { Currently, Forecast } from './forecast';

const forecast: Forecast = new Forecast(51.05, 13.737, 'Europe/Berlin', new Currently(new Date().getMilliseconds(),
  'Nebel', 'fog', 0.0279, 0.07, 'rain', 0.77, 0.77, -0.43, 0.92, 1032, 0.47, 1.09, 235, 0.81, 0, 1, 298.3), 1);

@Injectable()
export class ForecastMockService {

  constructor(private logger: LoggerService) { }

  getForecast(): Observable<Forecast> {
    return new Observable<Forecast>(sub => sub.next(forecast)).pipe(
      tap(() => this.log('fetched forecast')),
      catchError(this.handleError<Forecast>('fetch forecast'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.logger.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.logger.info(`ForecastMockService: ${message}`);
  }
}
