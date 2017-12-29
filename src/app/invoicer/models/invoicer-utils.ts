import * as moment from 'moment';

export class InvoicerUtils {

  static parseDate(date: string): number | undefined {
    const parsedDate = moment(date, 'DD.MM.YYYY');
    return parsedDate.isValid() ? parsedDate.valueOf() : undefined;
  }

  static parseCurrency(currency: string): number {
    currency = currency.replace(',', '.');
    currency = currency.replace(/\$[0-9,]+(?:\.\d\d)?/g, '');
    currency = currency.replace('€', '');
    return +currency;
  }
}
