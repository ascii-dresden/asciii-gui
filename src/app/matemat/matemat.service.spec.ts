import { TestBed, inject } from '@angular/core/testing';

import { MatematService } from './matemat.service';

describe('MatematService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatematService]
    });
  });

  it('should be created', inject([MatematService], (service: MatematService) => {
    expect(service).toBeTruthy();
  }));
});
