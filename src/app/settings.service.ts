import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class SettingsService {

  private _language: string;

  constructor() {
    this.language = environment.language;
  }


  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }
}
