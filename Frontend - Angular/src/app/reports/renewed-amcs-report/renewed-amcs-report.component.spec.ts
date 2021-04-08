import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewedAmcsReportComponent } from './renewed-amcs-report.component';

describe('RenewedAmcsReportComponent', () => {
  let component: RenewedAmcsReportComponent;
  let fixture: ComponentFixture<RenewedAmcsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewedAmcsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewedAmcsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
