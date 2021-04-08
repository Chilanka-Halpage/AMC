import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcRenewEditComponent } from './amc-renew-edit.component';

describe('AmcRenewEditComponent', () => {
  let component: AmcRenewEditComponent;
  let fixture: ComponentFixture<AmcRenewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmcRenewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcRenewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
