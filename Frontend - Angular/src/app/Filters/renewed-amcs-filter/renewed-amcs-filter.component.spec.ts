import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewedAmcsFilterComponent } from './renewed-amcs-filter.component';

describe('RenewedAmcsFilterComponent', () => {
  let component: RenewedAmcsFilterComponent;
  let fixture: ComponentFixture<RenewedAmcsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewedAmcsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewedAmcsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
