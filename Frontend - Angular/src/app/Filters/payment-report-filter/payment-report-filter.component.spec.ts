import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReportFilterComponent } from './payment-report-filter.component';

describe('PaymentReportFilterComponent', () => {
  let component: PaymentReportFilterComponent;
  let fixture: ComponentFixture<PaymentReportFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentReportFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReportFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
