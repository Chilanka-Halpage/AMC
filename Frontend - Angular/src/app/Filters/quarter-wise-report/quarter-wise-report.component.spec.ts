import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterWiseReportComponent } from './quarter-wise-report.component';

describe('QuarterWiseReportComponent', () => {
  let component: QuarterWiseReportComponent;
  let fixture: ComponentFixture<QuarterWiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuarterWiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterWiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
