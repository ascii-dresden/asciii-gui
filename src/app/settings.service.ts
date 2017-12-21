import { Injectable } from '@angular/core';
import { settings } from '../environments/settings';

@Injectable()
export class SettingsService {

  private _language: string;
  private _currencyCode: string;
  private _forecast;
  private _modules: string[] = [];

  constructor() {
    this._language = settings.language;
    this._currencyCode = settings.currencyCode;
    this._forecast = settings.forecastIo;
    this._modules = settings.modules;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }

  get currencyCode(): string {
    return this._currencyCode;
  }

  set currencyCode(value: string) {
    this._currencyCode = value;
  }

  get forecast() {
    return this._forecast;
  }

  set forecast(value) {
    this._forecast = value;
  }

  get modules(): string[] {
    return this._modules;
  }

  set modules(value: string[]) {
    this._modules = value;
  }
}
