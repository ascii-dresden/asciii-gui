import { Injectable } from '@angular/core';

export abstract class Logger {
  log: any;
  info: any;
  warn: any;
  error: any;
}

/**
 * Use LoggerService instead of console.log().
 */
@Injectable()
export class LoggerService implements Logger {

  log: any;
  info: any;
  warn: any;
  error: any;

  invokeConsoleMethod(type: string, args?: any): void { }
}
