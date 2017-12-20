import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { InvoicerService } from './invoicer.service';
import { LoggerService } from '../logger/logger.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ascii-invoicer',
  template: `<router-outlet></router-outlet>`
})
export class InvoicerComponent { }
