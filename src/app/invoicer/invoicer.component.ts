import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { InvoicerService } from './invoicer.service';
import { LoggerService } from '../logger/logger.service';

@Component({
  selector: 'ascii-invoicer',
  templateUrl: './invoicer.component.html',
  styles: []
})
export class InvoicerComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();
  projects;

  constructor(private invoicer: InvoicerService, private logger: LoggerService) { }

  ngOnInit() {
    this._subscription.add(this.invoicer.findAll()
      .subscribe(value => this.projects = value));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
