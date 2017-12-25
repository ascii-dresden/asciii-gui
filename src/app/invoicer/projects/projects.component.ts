import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { InvoicerService } from '../invoicer.service';

@Component({
  selector: 'ascii-project',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  currentYear: number;
  projects: any[] = [];

  constructor(private route: ActivatedRoute, private invoicer: InvoicerService) {
    this.currentYear = +this.route.snapshot.paramMap.get('year');
  }

  ngOnInit() {
    this._subscription.add(this.invoicer.findProjectsByYear(this.currentYear)
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
