import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '../components/font-awesome/font-awesome.module';
import { AsciiPipeModule } from '../components/pipes/ascii-pipe.module';
import { DashboardComponent } from './dashboard.component';
import { ForecastMockService } from './forecast/forecast-mock.service';
import { ForecastService } from './forecast/forecast.service';
import { environment } from '../../environments/environment';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    AsciiPipeModule
  ],
  declarations: [DashboardComponent],
  providers: [{ provide: ForecastService, useClass: environment.forecast ? ForecastService : ForecastMockService }]
})
export class DashboardModule {}
