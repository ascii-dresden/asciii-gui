import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeBoolComponent } from './components/font-awesome-bool.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { OffersComponent } from './offers/offers.component';
import { DueDatePipe } from './pipes/due-date.pipe';
import { JoinBillPipe } from './pipes/join-bill.pipe';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { CookieService } from './services/cookie.service';
import { EmitterService } from './services/emitter.service';
import { InvoicerMockService } from './services/invoicer-mock.service';
import { InvoicerService } from './services/invoicer.service';
import { ConsoleLoggerService } from './services/logger/console-logger.service';
import { LoggerService } from './services/logger/logger.service';


registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ProjectsComponent,
    DashboardComponent,
    DueDatePipe,
    JoinBillPipe,
    OffersComponent,
    InvoicesComponent,
    FontAwesomeBoolComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    CookieService,
    EmitterService,
    { provide: LOCALE_ID, useFactory: getLanguage },
    { provide: LoggerService, useClass: ConsoleLoggerService },
    { provide: InvoicerService, useClass: environment.invoicerMockApi ? InvoicerMockService : InvoicerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function getLanguage() {
  return environment.language;
}
