import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';

import {environment} from '@env/environment';
import {LoggerService} from './logger/logger.service';
import {ConsoleLoggerService} from './logger/console-logger.service';
import {InvoicerService} from './invoicer.service';
import {InvoicerMockService} from './invoicer-mock.service';
import {CookieService} from './cookie.service';
import {EmitterService} from './emitter.service';
import {HttpClientModule} from '@angular/common/http';

registerLocaleData(localeDe, 'de');

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    EmitterService,
    { provide: LoggerService, useClass: ConsoleLoggerService },
    { provide: InvoicerService, useClass: environment.invoicerMockApi ? InvoicerMockService : InvoicerService }
  ],
  declarations: []
})
export class CoreModule {

  // Make sure CoreModule is only imported once.
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded.');
    }
  }
}
