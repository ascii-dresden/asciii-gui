import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';
import { EmitterService } from '../services/emitter.service';
import { InvoicerService } from '../services/invoicer.service';
import { Project } from '../models';

@Component({
  selector: 'ascii-project',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  year: number;
  currencyCode: string = environment.currencyCode;
  projects: Project[] = [];

  constructor(private route: ActivatedRoute, private invoicer: InvoicerService) {
    this.year = +this.route.snapshot.paramMap.get('year');
  }

  ngOnInit() {
    this.getProjects();
    this.getYear();
  }

  getYear(): void {
    this._subscription.add(EmitterService.get('activeYear')
      .subscribe(data => {
        this.year = data;
        this.getProjects();
      }));
  }

  getProjects(): void {
    this._subscription.add(this.invoicer.findProjectsByYear(this.year).subscribe(projects => this.projects = projects));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
