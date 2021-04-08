import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAmcReportComponent } from './all-amc-report.component';

describe('AllAmcReportComponent', () => {
  let component: AllAmcReportComponent;
  let fixture: ComponentFixture<AllAmcReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAmcReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAmcReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
