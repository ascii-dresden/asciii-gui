import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import localeDe from '@angular/common/locales/de';

import { AppRoutingModule } from './app-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { InvoicerModule } from './invoicer/invoicer.module';
import { MatematModule } from './matemat/matemat.module';
import { LoggerService } from './logger/logger.service';
import { ConsoleLoggerService } from './logger/console-logger.service';
import { SettingsService } from './settings.service';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';


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

function getLanguage(settings: SettingsService) {
  return settings.language;
}
