import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoicerService } from '../invoicer.service';
import { Subscription } from 'rxjs/Subscription';
import { LoggerService } from '../../logger/logger.service';

@Component({
  selector: 'ascii-project',
  templateUrl: './project.component.html',
  styles: []
})
export class ProjectComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();
  projects;

  constructor(private route: ActivatedRoute, private invoicer: InvoicerService) { }

  ngOnInit() {
    this._subscription.add(this.invoicer.findByYear(this.route.snapshot.paramMap.get('year'))
      .subscribe(value => this.projects = value));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  getPayedStatus(payedByCustomer: boolean, payedEmployee: boolean): number {
    if (!payedByCustomer && !payedEmployee) {
      return 0;
    } else if ((payedByCustomer && !payedEmployee) || !payedByCustomer && payedEmployee) {
      return 1;
    } else if (payedByCustomer && payedEmployee) {
      return 2;
    } else {
      return 0;
    }
  }
}
