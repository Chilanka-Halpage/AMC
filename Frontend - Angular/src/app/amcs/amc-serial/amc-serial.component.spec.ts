import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcSerialComponent } from './amc-serial.component';

describe('AmcSerialComponent', () => {
  let component: AmcSerialComponent;
  let fixture: ComponentFixture<AmcSerialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmcSerialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcSerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
