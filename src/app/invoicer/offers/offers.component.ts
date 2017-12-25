import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvoicerService } from '../invoicer.service';
import { OfferDTO } from '../models/offer.dto';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ascii-offers',
  templateUrl: './offers.component.html'
})
export class OffersComponent implements OnInit, OnDestroy {

  private _subscription = new Subscription();

  currentYear: number;
  currencyCode: string = environment.currencyCode;
  offers: OfferDTO[] = [];

  constructor(private route: ActivatedRoute, private invoicer: InvoicerService) {
    this.currentYear = +this.route.snapshot.paramMap.get('year');
  }

  ngOnInit() {
    this._subscription.add(this.invoicer.findOffersByYear(this.currentYear, 9999)
      .subscribe(offers => this.offers = offers));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
