import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'ascii-payed',
  template: `
    <i aria-hidden="true" [ngClass]="cssClasses" *ngIf="icon"></i>
    <span [ngClass]="cssClasses" *ngIf="!icon">{{ currency }}</span>
  `
})
export class PayedComponent implements OnInit {

  @Input() status: number;
  @Input() colorized? = true;
  pipe;
  currency: string;
  private _currencyCode;

  constructor(private settings: SettingsService) {
    this._currencyCode = this.settings.currencyCode;
    this.pipe = new CurrencyPipe(settings.language);
  }

  private _icon: boolean;

  get icon() {
    return this._icon;
  }

  private _cssClasses = [];

  get cssClasses() {
    return this._cssClasses;
  }

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

  private addToCssClasses(cssClass: string): void {
    this._cssClasses.push(cssClass);
  }
}
