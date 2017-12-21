import { Injectable } from '@angular/core';
import { settings } from '../environments/settings';

@Injectable()
export class SettingsService {

  constructor() {
    this._language = settings.language;
    this._currencyCode = settings.currencyCode;
    this._forecast = settings.forecastIo;
    this._modules = settings.modules;
  }

  private _language: string;

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }

  private _currencyCode: string;

  get currencyCode(): string {
    return this._currencyCode;
  }

  set currencyCode(value: string) {
    this._currencyCode = value;
  }

  private _forecast;

  get forecast() {
    return this._forecast;
  }

  set forecast(value) {
    this._forecast = value;
  }

  private _modules: string[] = [];

  get modules(): string[] {
    return this._modules;
  }

  set modules(value: string[]) {
    this._modules = value;
  }
}
