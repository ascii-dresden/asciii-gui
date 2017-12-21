import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoicerService } from '../invoicer.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ascii-project-detail',
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();
  private _payedStatus: number;
  project: any;

  constructor(private route: ActivatedRoute, private invoicer: InvoicerService, private location: Location) { }

  ngOnInit() {
    this.getProject();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  private getProject() {
    this._subscription.add(this.invoicer.findByName('2017', this.route.snapshot.paramMap.get('name')).subscribe(project => {
      this.project = project;
      this.getPayedStatus();
    }));
  }

  get payedStatus(): number {
    return this._payedStatus;
  }

  getPayedStatus(): void {
    const payedByCustomer = this.project.checks.payed_by_customer;
    const payedEmployee = this.project.checks.payed_employees;

    if (!payedByCustomer && !payedEmployee) {
      this._payedStatus = 0;
    } else if ((payedByCustomer && !payedEmployee) || !payedByCustomer && payedEmployee) {
      this._payedStatus = 1;
    } else if (payedByCustomer && payedEmployee) {
      this._payedStatus = 2;
    } else {
      this._payedStatus = 0;
    }
  }
}

@Pipe({ name: 'join' })
export class JoinBill implements PipeTransform {

  transform(values: any[]): string {
    return values.map(v => v.name).join(', ');
  }
}
