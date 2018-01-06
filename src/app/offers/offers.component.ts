import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { environment } from '../../environments/environment';
import { CookieService } from '../services/cookie.service';
import { EmitterService } from '../services/emitter.service';
import { InvoicerService } from '../services/invoicer.service';
import { OfferDTO, OfferStatus } from '../models';

@Component({
  selector: 'ascii-offers',
  templateUrl: './offers.component.html'
})
export class OffersComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  year: number;
  currencyCode: string = environment.currencyCode;
  offers: OfferDTO[] = [];

  constructor(private cookieService: CookieService, private router: Router, private route: ActivatedRoute,
              private invoicer: InvoicerService) {
    this.year = +this.route.snapshot.paramMap.get('year');
  }

  ngOnInit() {
    let data: OfferDTO[] = [];
    let status: string;

    this.getOffers(offers => {
      this.offers = offers;
      data = offers;
      this.changeState(status, data);
    });

    this.getYear(year => {
      this.year = year;
      this.router.navigate(['/offers', this.year, status]);
      this.getOffers(offers => {
        this.offers = offers;
        data = offers;
        this.changeState(status, data);
      });
    });

    this.getStatus(newStatus => {
      status = newStatus;
      this.changeState(status, data);
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  getStatus(next: (status: string) => void): void {
    this._subscription.add(this.route.paramMap.subscribe(params => next(params.get('status'))));
  }

  getOffers(next: (offers: OfferDTO[]) => void): void {
    this._subscription.add(this.invoicer.findOffersByYear(this.year).subscribe(offers => next(offers)));
  }

  getYear(next: (year: number) => void): void {
    this._subscription.add(EmitterService.get('activeYear').subscribe(year => next(year)));
  }

  private changeState(status: string, offers: OfferDTO[]) {
    switch (status) {
      case 'pending':
        this.offers = offers.filter(o => o.status === OfferStatus.Pending);
        break;
      case 'approved':
        this.offers = offers.filter(o => o.status === OfferStatus.Approved);
        break;
      case 'canceled':
        this.offers = offers.filter(o => o.status === OfferStatus.Canceled);
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
