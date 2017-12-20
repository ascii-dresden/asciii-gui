import { TestBed, inject } from '@angular/core/testing';

import { ForecastMockService } from './forecast-mock.service';

describe('ForecastMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForecastMockService]
    });
  });

  it('should be created', inject([ForecastMockService], (service: ForecastMockService) => {
    expect(service).toBeTruthy();
  }));
});
