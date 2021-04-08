import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAmcComponent } from './client-amc.component';

describe('ClientAmcComponent', () => {
  let component: ClientAmcComponent;
  let fixture: ComponentFixture<ClientAmcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAmcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
