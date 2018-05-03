import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable()
export class CookieService {

  private documentIsAccessible: boolean;

  constructor(@Inject(DOCUMENT) private document: any) {
    this.documentIsAccessible = document;
  }

  check(name: string): boolean {
    if (!this.documentIsAccessible) {
      return false;
    }

    name = encodeURIComponent(name);
    const regExp: RegExp = this.getCookieRegExp(name);

    return regExp.test(this.document.cookie);
  }

  get(name: string): string {
    if (this.documentIsAccessible && this.check(name)) {
      name = encodeURIComponent(name);

      const regExp: RegExp = this.getCookieRegExp(name);
      const result: RegExpExecArray = regExp.exec(this.document.cookie);

      return decodeURIComponent(result[1]);
    } else {
      return '';
    }
  }

  getAll(): {} {
    if (!this.documentIsAccessible) {
      return {};
    }

    const cookies: {} = {};
    const document: any = this.document;

    if (document.cookie) {
      const split: Array<string> = document.cookie.split(';');

      for (let i = 0; i < split.length; i++) {
        const currentCookie: Array<string> = split[i].split('=');

        currentCookie[0] = currentCookie[0].replace(/^ /, '');
        cookies[decodeURIComponent(currentCookie[0])] = decodeURIComponent(currentCookie[1]);
      }
    }

    return cookies;
  }

  set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean): void {
    if (!this.documentIsAccessible) {
      return;
    }

    let cookieString: string = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';

    if (expires) {
      if (typeof expires === 'number') {
        const dateExpires: Date = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);

        cookieString += 'expires=' + dateExpires.toUTCString() + ';';
      } else {
        cookieString += 'expires=' + expires.toUTCString() + ';';
      }
    }

    if (path) {
      cookieString += 'path=' + path + ';';
    }

    if (domain) {
      cookieString += 'domain=' + domain + ';';
    }

    if (secure) {
      cookieString += 'secure;';
    }

    this.document.cookie = cookieString;
  }

  delete(name: string, path?: string, domain?: string): void {
    if (!this.documentIsAccessible) {
      return;
    }

    this.set(name, '', -1, path, domain);
  }

  deleteAll(path?: string, domain?: string): void {
    if (!this.documentIsAccessible) {
      return;
    }

    const cookies: any = this.getAll();

    for (const cookieName in cookies) {
      if (cookies.hasOwnProperty(cookieName)) {
        this.delete(cookieName, path, domain);
      }
    }
  }

  private getCookieRegExp(name: string): RegExp {
    const escapedName: string = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/ig, '\\$1');

    return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
  }
}
