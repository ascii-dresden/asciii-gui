import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from '../../logger/logger.service';

const forecast = {
  latitude: 51.05,
  longitude: 13.737,
  timezone: 'Europe/Berlin',
  currently: {
    time: new Date().getMilliseconds(),
    summary: 'Nebel',
    icon: 'fog',
    precipIntensity: 0.0279,
    precipProbability: 0.07,
    precipType: 'rain',
    temperature: 0.77,
    apparentTemperature: 0.77,
    dewPoint: -0.43,
    humidity: 0.92,
    pressure: 1032,
    windSpeed: 0.47,
    windGust: 1.09,
    windBearing: 235,
    cloudCover: 0.81,
    uvIndex: 0,
    visibility: 1,
    ozone: 298.3
  },
  offset: 1
};

@Injectable()
export class ForecastMockService {

  constructor(private logger: LoggerService) { }

  getForecast(): Observable<any> {
    return new Observable<any>(sub => sub.next(forecast)).pipe(
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
    this.logger.info(`ForecastMockService: ${message}`);
  }
}
