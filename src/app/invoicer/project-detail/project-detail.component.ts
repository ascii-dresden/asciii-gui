import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { InvoicerService } from '../invoicer.service';

@Component({
  selector: 'ascii-project-detail',
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  project: any;
  private _subscription = new Subscription();

  constructor(private route: ActivatedRoute, private invoicer: InvoicerService, private location: Location) { }

  private _payedStatus: number;

  get payedStatus(): number {
    return this._payedStatus;
  }

  ngOnInit() {
    this.getProject();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  goBack() {
    this.location.back();
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

  private getProject() {
    this._subscription.add(this.invoicer.findById(this.route.snapshot.paramMap.get('name')).subscribe(project => {
      this.project = project;
      this.getPayedStatus();
    }));
  }
}

@Pipe({ name: 'join' })
export class JoinBill implements PipeTransform {

  transform(values: any[]): string {
    return values.map(v => v.name).join(', ');
  }
}
