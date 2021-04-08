import { TestBed } from '@angular/core/testing';

import { JrReportDetailsService } from './jr-report-details.service';

describe('JrReportDetailsService', () => {
  let service: JrReportDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JrReportDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
