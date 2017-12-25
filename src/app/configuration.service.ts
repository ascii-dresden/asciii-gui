import { Injectable } from '@angular/core';
import { config } from '../environments/config';

@Injectable()
export class ConfigurationService {

  private _language: string;
  private _forecast;

  constructor() {
    this._language = config.language;
    this._forecast = config.forecastIo;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }

  get forecast() {
    return this._forecast;
  }

  set forecast(value) {
    this._forecast = value;
  }
}
