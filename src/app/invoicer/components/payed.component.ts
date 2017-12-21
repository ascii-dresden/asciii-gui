import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ascii-payed',
  template: `
    <i aria-hidden="true" [ngClass]="cssClasses" *ngIf="icon"></i>
    <span [ngClass]="cssClasses" *ngIf="!icon">{{ currency }}</span>
  `
})
export class PayedComponent implements OnInit {

  private _currencyCode = environment.currencyCode;
  private _icon: boolean;
  private _cssClasses = [];

  @Input() status: number;
  @Input() colorized? = true;
  pipe = new CurrencyPipe(environment.language);
  currency: string;

  ngOnInit() {
    this.currency = this.pipe.transform(0, this._currencyCode, 'symbol', '1.0-2');
    this.currency = this.currency.replace(/[0-9]/g, '');

    switch (this.status) {
      case 0:
        this._icon = true;
        this.addToCssClasses('fa fa-times');
        if (this.colorized) {
          this.addToCssClasses('text-danger');
        }
        return;
      case 1:
        this._icon = false;
        if (this.colorized) {
          this.addToCssClasses('text-warning');
        }
        return;
      case 2:
        this._icon = true;
        this.addToCssClasses('fa fa-check');
        if (this.colorized) {
          this.addToCssClasses('text-success');
        }
        return;
      default:
        throw new Error(`Status may be 0, 1 or 2. Found ${this.status}`);
    }
  }

  get icon() {
    return this._icon;
  }

  get cssClasses() {
    return this._cssClasses;
  }

  private addToCssClasses(cssClass: string): void {
    this._cssClasses.push(cssClass);
  }
}
