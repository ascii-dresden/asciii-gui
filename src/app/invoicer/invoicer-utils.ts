import * as moment from 'moment/moment';

export class InvoicerUtils {

  static parseDate(date: string): number | null {
    const parsedDate = moment(date, 'DD.MM.YYYY');
    return parsedDate.isValid() ? parsedDate.valueOf() : null;
  }

  static parseCurrency(currency: string): number {
    currency = currency.replace(',', '.');
    currency = currency.replace(/\$[0-9,]+(?:\.\d\d)?/g, '');
    currency = currency.replace('€', '');
    return +currency;
  }
}
