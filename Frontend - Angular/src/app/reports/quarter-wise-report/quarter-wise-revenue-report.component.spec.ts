import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterWiseRevenueReportComponent } from './quarter-wise-revenue-report.component';

describe('QuarterWiseRevenueReportComponent', () => {
  let component: QuarterWiseRevenueReportComponent;
  let fixture: ComponentFixture<QuarterWiseRevenueReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterWiseRevenueReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterWiseRevenueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
