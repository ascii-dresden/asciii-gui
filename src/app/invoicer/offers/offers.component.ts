import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../../environments/environment';
import { InvoicerService } from '../invoicer.service';
import { OfferDTO } from '../models';

@Component({
  selector: 'ascii-offers',
  templateUrl: './offers.component.html'
})
export class OffersComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  currentYear: number;
  currencyCode: string = environment.currencyCode;
  offers: OfferDTO[] = [];

  constructor(private route: ActivatedRoute, private location: Location, private invoicer: InvoicerService) {
    this.currentYear = +this.route.snapshot.paramMap.get('year');
  }

  ngOnInit() {
    let data: OfferDTO[] = [];
    let status: string;

    this._subscription.add(this.route.paramMap
      .subscribe(params => {
        status = params.get('status');
        this.changeState(status, data);
      }));

    this._subscription.add(this.invoicer.findOffersByYear(this.currentYear)
      .subscribe(offers => {
        data = offers;
        this.changeState(status, data);
      }));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  goBack() {
    this.location.back();
  }

  private changeState(status: string, offers: OfferDTO[]) {
    switch (status) {
      case 'sent':
        this.offers = offers.filter(o => o.sent);
        break;
      case 'approved':
        this.offers = offers.filter(o => o.approved);
        break;
      case 'rejected':
        this.offers = offers.filter(o => o.rejected);
        break;
      case 'all':
        this.offers = offers;
        break;
      default:
        this.offers = offers;
        break;
    }
  }
}
