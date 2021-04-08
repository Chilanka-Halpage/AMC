import { TestBed } from '@angular/core/testing';

import { SharedAmcService } from './shared-amc.service';

describe('SharedAmcService', () => {
  let service: SharedAmcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedAmcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
