import {Injectable, isDevMode} from '@angular/core';
import {Logger} from './logger.service';

const noop = (): any => undefined;

@Injectable()
export class ConsoleLoggerService implements Logger {

  get log() {
    if (isDevMode) {
      return console.log.bind(console);
    } else {
      return noop;
    }
  }

  get info() {
    if (isDevMode) {
      return console.info.bind(console);
    } else {
      return noop;
    }
  }

  get warn() {
    if (isDevMode) {
      return console.warn.bind(console);
    } else {
      return noop;
    }
  }

  get error() {
    if (isDevMode) {
      return console.error.bind(console);
    } else {
      return noop;
    }
  }

  invokeConsoleMethod(type: string, args?: any): void {
    const logFn: Function = (console)[type] || console.log || noop;
    logFn.apply(console, [args]);
  }
}
