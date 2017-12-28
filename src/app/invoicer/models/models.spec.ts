import { Bill, BillType } from './bill';
import { Client } from './client';
import { Employee } from './employee';
import { Invoice } from './invoice';
import { InvoiceDTO } from './invoice.dto';
import { Item } from './item';
import { Offer } from './offer';
import { OfferDTO } from './offer.dto';
import { Project } from './project';
import { Service } from './service';

describe('Bill', () => {
  let bill: Bill;

  beforeEach(() => {
    bill = new Bill(BillType.Offered, 'Coffee', '0,80 €', 'l', 10, 0.19);
  });

  afterAll(() => {
    bill = undefined;
  });

  it('should have a bill type', () => {
    expect(bill.type).toBe(0);
    expect(bill.type).toBe(BillType.Offered);
    expect(bill.type).toBeFalsy(1);
    expect(bill.type).toBeFalsy(BillType.Invoiced);
  });

  it('should have name', () => {
    expect(bill.name).toBe('Coffee');
  });

  it('should have price', () => {
    expect(bill.price).toBe(0.80);
  });

  it('should have amount', () => {
    expect(bill.amount).toBe(10);
  });

  it('should have unit', () => {
    expect(bill.unit).toBe('l');
  });

  it('should have tax', () => {
    expect(bill.tax).toBe(0.19);
  });

  it('should have cost', () => {
    expect(bill.cost).toBe(8);
  });
});

describe('Client', () => {
  let client: Client;

  beforeEach(() => {
    client = new Client('Max Mustermann', 'Max Mustermann\nMusterstraße 1\n00000 Muterstadt', 'mail@example.com');
  });

  afterEach(() => {
    client = undefined;
  });

  it('should have name', () => {
    expect(client.name).toBe('Max Mustermann');
  });

  it('should have address', () => {
    expect(client.address).toBe('Max Mustermann\nMusterstraße 1\n00000 Muterstadt');
  });

  it('should have email address', () => {
    expect(client.email).toBe('mail@example.com');
  });
});

describe('Employee', () => {
  let employee: Employee;

  beforeEach(() => {
    employee = new Employee('Max Mustermann', '9,00 €', 3);
  });

  afterEach(() => {
    employee = undefined;
  });

  it('should have name', () => {
    expect(employee.name).toBe('Max Mustermann');
  });

  it('should have time', () => {
    expect(employee.time).toBe(3);
  });

  it('should have wage', () => {
    expect(employee.wage).toBe(27);
  });

  it('should have salary', () => {
    expect(employee.salary).toBe(9);
  });
});

const PROJECT: Project = new Project({
  id: '2017-R019_XXXX-2017-2',
  client: {
    title: 'Frau',
    first_name: 'Martina',
    last_name: 'Mutermann',
    full_name: 'Martina Mustermann',
    address: 'Max Mustermann\nMusterstraße 1\n00000 Muterstadt',
    email: null,
    addressing: 'Sehr geehrte Frau Martina Mustermann'
  },
  event: {
    name: 'XXXX 2017-2',
    date: '22.07.2017',
    manager: 'Max Mustermanager'
  },
  service: {
    time: 1,
    tax: 0,
    salary: '9,00€',
    gross_total: '9,00€',
    net_total: '9,00€',
    employees: [
      {
        name: 'Max Mustermanager',
        salary: '9,00€',
        time: 1,
        wage: '9,00€'
      }
    ]
  },
  offer: {
    date: '07.06.2017',
    number: 'A20170607-1',
    sums: [
      {
        gross_sum: '145,72€',
        has_tax: true,
        tax_sum: '27,69€',
        tax_value: 19
      },
      {
        gross_sum: '9,00€',
        has_tax: false,
        tax_sum: '0,00€',
        tax_value: 0
      }
    ],
    net_total: '182,41€',
    gross_total: '154,72€'
  },
  invoice: {
    date: '10.08.2017',
    number: 'R000',
    number_long: 'R2017-000',
    official: null,
    sums: [
      {
        gross_sum: '57,66€',
        has_tax: true,
        tax_sum: '10,96€',
        tax_value: 19
      },
      {
        gross_sum: '9,00€',
        has_tax: false,
        tax_sum: '0,00€',
        tax_value: 0
      }
    ],
    net_total: '77,62€',
    gross_total: '66,66€'
  },
  bills: {
    offer: [
      {
        name: 'Bagel',
        price: '2,19€',
        unit: 'stk',
        amount: 18,
        cost: '39,42€',
        tax: 0.19
      },
      {
        name: 'halbe Brötchen',
        price: '1,16€',
        unit: 'stk',
        amount: 20,
        cost: '23,20€',
        tax: 0.19
      },
      {
        name: 'Baguette',
        price: '2,19€',
        unit: 'stk',
        amount: 12,
        cost: '26,28€',
        tax: 0.19
      },
      {
        name: 'Mineralwasser',
        price: '0,61€',
        unit: '1l',
        amount: 10,
        cost: '6,10€',
        tax: 0.19
      },
      {
        name: 'Orangensaft',
        price: '1,86€',
        unit: '1l',
        amount: 2,
        cost: '3,72€',
        tax: 0.19
      },
      {
        name: 'Kekse Lamberts',
        price: '3,40€',
        unit: '400g',
        amount: 5,
        cost: '17,00€',
        tax: 0.19
      },
      {
        name: 'Club Mate',
        price: '1,50€',
        unit: '0.5l',
        amount: 20,
        cost: '30,00€',
        tax: 0.19
      },
      {
        name: 'Service',
        price: '9,00€',
        unit: 'h',
        amount: 1,
        cost: '9,00€',
        tax: 0
      }
    ],
    invoice: [
      {
        name: 'Bagel',
        price: '2,19€',
        unit: 'stk',
        amount: 6,
        cost: '13,14€',
        tax: 0.19
      },
      {
        name: 'halbe Brötchen',
        price: '1,16€',
        unit: 'stk',
        amount: 20,
        cost: '23,20€',
        tax: 0.19
      },
      {
        name: 'Baguette',
        price: '2,19€',
        unit: 'stk',
        amount: 4,
        cost: '8,76€',
        tax: 0.19
      },
      {
        name: 'Mineralwasser',
        price: '0,61€',
        unit: '1l',
        amount: 4,
        cost: '2,44€',
        tax: 0.19
      },
      {
        name: 'Orangensaft',
        price: '1,86€',
        unit: '1l',
        amount: 2,
        cost: '3,72€',
        tax: 0.19
      },
      {
        name: 'Kekse Lamberts',
        price: '3,40€',
        unit: '400g',
        amount: 1,
        cost: '3,40€',
        tax: 0.19
      },
      {
        name: 'Club Mate',
        price: '1,50€',
        unit: '0.5l',
        amount: 2,
        cost: '3,00€',
        tax: 0.19
      },
      {
        name: 'Service',
        price: '9,00€',
        unit: 'h',
        amount: 1,
        cost: '9,00€',
        tax: 0
      }
    ]
  },
  checks: {
    ready_for_offer: true,
    ready_for_invoice: true,
    ready_for_archive: true,
    payed_by_customer: true,
    payed_employees: true,
    canceled: false
  },
  extras: {
    dir: 'archive/2017',
    age: 173,
    our_bad: 30,
    their_bad: -12,
    sort_index: 'R2017-1234567890'
  }
});

describe('InvoiceDTO', () => {
  let dto: InvoiceDTO;

  beforeEach(() => {
    dto = new InvoiceDTO(PROJECT);
  });

  afterEach(() => {
    dto = undefined;
  });

  it('should have identifier', () => {
    expect(dto.id).toBe('2017-R019_XXXX-2017-2');
    expect(dto.id).toBe(PROJECT.id);
  });

  it('should have name', () => {
    expect(dto.name).toBe('XXXX 2017-2');
    expect(dto.name).toBe(PROJECT.name);
  });

  it('should have client name', () => {
    expect(dto.client).toBe('Martina Mustermann');
    expect(dto.client).toBe(PROJECT.client.name);
  });

  it('should have date', () => {
    expect(dto.date).toBe(1502316000000);
    expect(dto.date).toBe(PROJECT.invoice.date);
  });

  it('should have number', () => {
    expect(dto.number).toBe(PROJECT.invoice.number);
    expect(dto.number).toBe('R2017-000');
  });

  it('should have net', () => {
    expect(dto.net).toBe(PROJECT.invoice.net);
    expect(dto.net).toBe(77.62);
  });

  it('should have gross', () => {
    expect(dto.gross).toBe(PROJECT.invoice.gross);
    expect(dto.gross).toBe(66.66);
  });
});

describe('OfferDTO', () => {
  let dto: OfferDTO;

  beforeEach(() => {
    dto = new OfferDTO(PROJECT);
  });

  afterEach(() => {
    dto = undefined;
  });

  it('should have identifier', () => {
    expect(dto.id).toBe('2017-R019_XXXX-2017-2');
    expect(dto.id).toBe(PROJECT.id);
  });

  it('should have name', () => {
    expect(dto.name).toBe('XXXX 2017-2');
    expect(dto.name).toBe(PROJECT.name);
  });

  it('should have client name', () => {
    expect(dto.client).toBe('Martina Mustermann');
    expect(dto.client).toBe(PROJECT.client.name);
  });

  it('should have manager name', () => {
    expect(dto.manager).toBe('Max Mustermanager');
    expect(dto.manager).toBe(PROJECT.manager);
  });

  it('should have date', () => {
    expect(dto.date).toBe(1496786400000);
    expect(dto.date).toBe(PROJECT.offer.date);
  });

  it('should have number', () => {
    expect(dto.number).toBe(PROJECT.offer.number);
    expect(dto.number).toBe('A20170607-1');
  });

  it('should have net', () => {
    expect(dto.net).toBe(PROJECT.offer.net);
    expect(dto.net).toBe(182.41);
  });

  it('should have gross', () => {
    expect(dto.gross).toBe(PROJECT.offer.gross);
    expect(dto.gross).toBe(154.72);
  });
});

describe('Invoice', () => {
  let invoice: Invoice;

  beforeEach(() => {
    invoice = new Invoice({
      invoice: {
        date: '10.08.2017',
        number: 'R000',
        number_long: 'R2017-000',
        official: null,
        sums: [
          {
            gross_sum: '57,66€',
            has_tax: true,
            tax_sum: '10,96€',
            tax_value: 19
          },
          {
            gross_sum: '9,00€',
            has_tax: false,
            tax_sum: '0,00€',
            tax_value: 0
          }
        ],
        net_total: '77,62€',
        gross_total: '66,66€'
      }
    });
  });

  afterEach(() => {
    invoice = undefined;
  });

  it('should have number', () => {
    expect(invoice.number).toBe('R2017-000');
  });

  it('should have date', () => {
    expect(invoice.date).toBe(1502316000000);
  });

  it('should have net', () => {
    expect(invoice.net).toBe(77.62);
  });

  it('should have gross', () => {
    expect(invoice.gross).toBe(66.66);
  });

  it('should have items', () => {
    expect(invoice.items).toContain(new Item('57,66€', 19));
  });
});

describe('Item', () => {
  let item0: Item;
  let item1: Item;

  beforeEach(() => {
    item0 = new Item('1337,42€', 19);
    item1 = new Item('42,00€', null);
  });

  afterEach(() => {
    item0 = undefined;
    item1 = undefined;
  });

  it('should have gross', () => {
    expect(item0.gross).toBe(1337.42);
    expect(item1.gross).toBe(42);
  });

  it('should have tax', () => {
    expect(item0.tax).toBe(0.19);
    expect(item1.tax).toBe(0);
  });

  it('should is taxed', () => {
    expect(item0.taxed).toBeTruthy();
    expect(item1.taxed).toBeFalsy();
  });

  it('should have tax total', () => {
    expect(item0.taxTotal).toBe(254.1098);
    expect(item1.taxTotal).toBe(0);
  });
});

describe('Offer', () => {
  let offer: Offer;

  beforeEach(() => {
    offer = new Offer({
      offer: {
        date: '07.06.2017',
        number: 'A20170607-1',
        sums: [
          {
            gross_sum: '145,72€',
            has_tax: true,
            tax_sum: '27,69€',
            tax_value: 19
          },
          {
            gross_sum: '9,00€',
            has_tax: false,
            tax_sum: '0,00€',
            tax_value: 0
          }
        ],
        net_total: '182,41€',
        gross_total: '154,72€'
      }
    });
  });

  afterEach(() => {
    offer = undefined;
  });

  it('should have number', () => {
    expect(offer.number).toBe('A20170607-1');
  });

  it('should have offer', () => {
    expect(offer.gross).toBe(154.72);
  });

  it('should have net', () => {
    expect(offer.net).toBe(182.41);
  });

  it('should have date', () => {
    expect(offer.date).toBe(1496786400000);
  });

  it('should have items', () => {
    expect(offer.items).toContain(new Item('9,00€', 0));
  });
});

describe('Service', () => {
  let serviceWoTax: Service;
  let serviceWTax: Service;

  beforeEach(() => {
    serviceWoTax = new Service(null, [{
      name: 'Max Mustermanager',
      salary: '9,00€',
      time: 4,
      wage: '36,00€'
    }, {
      name: 'Martina Mustermanagerin',
      salary: '9,00€',
      time: 2,
      wage: '18,00€'
    }]);
    serviceWTax = new Service(0.19, [{
      name: 'Max Mustermanager',
      salary: '9,00€',
      time: 4,
      wage: '36,00€'
    }, {
      name: 'Martina Mustermanagerin',
      salary: '9,00€',
      time: 2,
      wage: '18,00€'
    }]);
  });

  afterEach(() => {
    serviceWoTax = undefined;
    serviceWTax = undefined;
  });

  it('should have time', () => {
    expect(serviceWoTax.time).toBe(6);
    expect(serviceWTax.time).toBe(6);
  });

  it('should have salary', () => {
    expect(serviceWoTax.salary).toBe(9);
    expect(serviceWTax.salary).toBe(9);
  });

  it('should have gross', () => {
    expect(serviceWoTax.gross).toBe(54);
    expect(serviceWTax.gross).toBe(54);
  });

  it('should have net', () => {
    expect(serviceWoTax.net).toBe(54);
    expect(serviceWTax.net).toBeCloseTo(64.26);
  });

  it('should have tax', () => {
    expect(serviceWoTax.tax).toBe(0);
    expect(serviceWTax.tax).toBe(0.19);
  });

  it('should have employees', () => {
    expect(serviceWoTax.employees).toContain(new Employee('Max Mustermanager', '9,00€', 4));
    expect(serviceWTax.employees).toContain(new Employee('Martina Mustermanagerin', '9,00€', 2));
  });
});

describe('Project', () => {
  let project: Project;

  beforeEach(() => {
    project = PROJECT;
  });

  afterEach(() => {
    project = undefined;
  });

  it('should have id', function () {
    expect(project.id).toBeTruthy();
  });

  it('should have name', function () {
    expect(project.name).toBeTruthy();
  });

  it('should have date', function () {
    expect(project.date).toBeTruthy();
  });

  it('should have manager', function () {
    expect(project.manager).toBeTruthy();
  });

  it('should have client', function () {
    expect(project.client).toBeTruthy();
  });

  it('should have service', function () {
    expect(project.service).toBeTruthy();
  });

  it('should have offer', function () {
    expect(project.offer).toBeTruthy();
  });

  it('should have invoice', function () {
    expect(project.invoice).toBeTruthy();
  });

  it('should have bills', function () {
    expect(project.bills).toBeTruthy();
  });

  it('should have checks', function () {
    expect(project.readyForOffer).toBeTruthy();
    expect(project.readyForInvoice).toBeTruthy();
    expect(project.readyForArchive).toBeTruthy();
    expect(project.payedEmployees).toBeTruthy();
    expect(project.payedByCustomer).toBeTruthy();
    expect(project.canceled).toBeFalsy();
  });
});
