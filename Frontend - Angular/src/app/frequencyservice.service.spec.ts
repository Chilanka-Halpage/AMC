import { TestBed } from '@angular/core/testing';

import { FrequencyserviceService } from './frequencyservice.service';

describe('FrequencyserviceService', () => {
  let service: FrequencyserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrequencyserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
