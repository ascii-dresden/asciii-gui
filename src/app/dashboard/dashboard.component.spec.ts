import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { TemperaturePipe } from '../components/pipes/temperature.pipe';

import { DashboardComponent } from './dashboard.component';
import { ForecastService } from './forecast/forecast.service';

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

class FakeForecastService {
  getForecast(): Observable<any> {
    return new Observable(subscriber => subscriber.next(forecast));
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, TemperaturePipe],
      providers: [
        { provide: ForecastService, useClass: FakeForecastService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
