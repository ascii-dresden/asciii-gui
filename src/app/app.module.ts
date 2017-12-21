import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { InvoicerModule } from './invoicer/invoicer.module';
import { ConsoleLoggerService } from './logger/console-logger.service';
import { LoggerService } from './logger/logger.service';
import { MatematModule } from './matemat/matemat.module';
import { NavigationComponent } from './navigation/navigation.component';
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
    { provide: LoggerService, useClass: ConsoleLoggerService },
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function getLanguage(settings: SettingsService) {
  return settings.language;
}
