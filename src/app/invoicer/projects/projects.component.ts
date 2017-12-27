import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../../environments/environment';
import { InvoicerService } from '../invoicer.service';
import { Project } from '../models/project';

@Component({
  selector: 'ascii-project',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  currencyCode: string = environment.currencyCode;
  currentYear: number;
  projects: Project[] = [];

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
}
