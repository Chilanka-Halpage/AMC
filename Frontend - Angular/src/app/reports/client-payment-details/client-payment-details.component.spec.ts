import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPaymentDetailsComponent } from './client-payment-details.component';

describe('ClientPaymentDetailsComponent', () => {
  let component: ClientPaymentDetailsComponent;
  let fixture: ComponentFixture<ClientPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
