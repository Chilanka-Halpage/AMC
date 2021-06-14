import { TestBed } from '@angular/core/testing';

import { PageserviceService } from './pageservice.service';

describe('PageserviceService', () => {
  let service: PageserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
