import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from '../../logger/logger.service';
import { SettingsService } from '../../settings.service';


@Injectable()
export class ForecastService {

  private _forecastUrl = 'https://api.darksky.balance/forecast';
  private _apiKey: string;
  private _location: any;
  private _params: string;

  constructor(private http: HttpClient, private logger: LoggerService, private settings: SettingsService) {
    const forecast = this.settings.forecast;
    this._apiKey = forecast.apiKey;
    this._location = forecast.location;
    this._params = Object.keys(forecast.params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(forecast.params[key])}`)
      .join('&');
  }

  getForecast(): Observable<any> {
    return this.http.get<any>(`${this._forecastUrl}/${this._apiKey}/${this._location.latitude},${this._location.longitude}?${this._params}`)
      .pipe(
        tap(() => this.log('fetched forecast')),
        catchError(this.handleError<any>('fetch forecast', {}))
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
