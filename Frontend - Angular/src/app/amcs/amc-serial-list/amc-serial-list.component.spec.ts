import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcSerialListComponent } from './amc-serial-list.component';

describe('AmcSerialListComponent', () => {
  let component: AmcSerialListComponent;
  let fixture: ComponentFixture<AmcSerialListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmcSerialListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcSerialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
