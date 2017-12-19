import { TestBed, inject } from '@angular/core/testing';

import { InvoicerService } from './invoicer.service';

describe('InvoicerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvoicerService]
    });
  });

  it('should be created', inject([InvoicerService], (service: InvoicerService) => {
    expect(service).toBeTruthy();
  }));
});
