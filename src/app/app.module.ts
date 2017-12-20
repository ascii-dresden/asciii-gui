import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { InvoicerModule } from './invoicer/invoicer.module';
import { ConsoleLoggerService } from './logger/console-logger.service';
import { LoggerService } from './logger/logger.service';
import { MatematModule } from './matemat/matemat.module';
import { NavigationComponent } from './navigation/navigation.component';


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
    { provide: LoggerService, useClass: ConsoleLoggerService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
