import { TestBed } from '@angular/core/testing';

import { AllAmcsService } from './all-amcs.service';

describe('AllAmcsService', () => {
  let service: AllAmcsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllAmcsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
