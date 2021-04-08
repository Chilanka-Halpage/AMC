import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalAmcsReportComponent } from './renewal-amcs-report.component';

describe('RenewalAmcsReportComponent', () => {
  let component: RenewalAmcsReportComponent;
  let fixture: ComponentFixture<RenewalAmcsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalAmcsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalAmcsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
