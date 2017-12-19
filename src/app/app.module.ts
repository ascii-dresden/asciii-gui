import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { LoggerService } from './logger/logger.service';
import { ConsoleLoggerService } from './logger/console-logger.service';
import { InvoicerModule } from './invoicer/invoicer.module';
import { MatematModule } from './matemat/matemat.module';
import { DashboardModule } from './dashboard/dashboard.module';


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
    { provide: LoggerService, useClass: ConsoleLoggerService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
