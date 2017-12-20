import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { forecast_io } from '../../../environments/forecast';
import { LoggerService } from '../../logger/logger.service';
import { Forecast } from './forecast';


@Injectable()
export class ForecastService {

  private forecastUrl = 'https://api.darksky.net/forecast';
  private apiKey = forecast_io.apiKey;
  private location = forecast_io.location;
  private params = Object.keys(forecast_io.params).map(key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(forecast_io.params[key])}`;
  }).join('&');

  constructor(private http: HttpClient, private logger: LoggerService) { }

  getForecast(): Observable<Forecast> {
    this.logger.info();
    return this.http
      .get<Forecast>(`${this.forecastUrl}/${this.apiKey}/${this.location.latitude},${this.location.longitude}?${this.params}`).pipe(
        tap(() => {
          this.logger.info(`${this.forecastUrl}/${this.apiKey}/${this.location.latitude},${this.location.longitude}?${this.params}`);
          this.log('fetched forecast');
        }),
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
    this.logger.info(`ForecastService: ${message}`);
  }
}
