import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { forecast_io } from '../../environments/forecast';
import { Forecast } from './forecast/forecast';
import { ForecastService } from './forecast/forecast.service';

declare var Skycons: any;

@Component({
  selector: 'ascii-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  private _subscription = new Subscription();

  forecast: Forecast;
  locale = forecast_io.params.lang;
  scyconId = 'skycon' + Math.floor((Math.random() * 1000) + 1);
  skycons = new Skycons({ color: '#212529', resizeClear: true });

  constructor(private forecastService: ForecastService) { }

  ngOnInit() {
    this._subscription.add(this.forecastService.getForecast()
      .subscribe(forecast => this.forecast = forecast));
  }

  ngAfterViewInit() {
    this.skycons.set(this.scyconId, this.forecast.currently.icon);
    this.skycons.play();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
