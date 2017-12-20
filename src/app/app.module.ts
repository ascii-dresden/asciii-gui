import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import localeDe from '@angular/common/locales/de';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { InvoicerModule } from './invoicer/invoicer.module';
import { ConsoleLoggerService } from './logger/console-logger.service';
import { LoggerService } from './logger/logger.service';
import { MatematModule } from './matemat/matemat.module';
import { NavigationComponent } from './navigation/navigation.component';
import { registerLocaleData } from '@angular/common';
import { SettingsService } from './settings.service';


registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    InvoicerModule,
    MatematModule
  ],
  providers: [
    { provide: LOCALE_ID, deps: [SettingsService], useFactory: getLanguage },
    { provide: LoggerService, useClass: ConsoleLoggerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function getLanguage(settings: SettingsService) {
  return settings.language;
}
