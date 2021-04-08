import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientdashtableComponent } from './clientdashtable.component';

describe('ClientdashtableComponent', () => {
  let component: ClientdashtableComponent;
  let fixture: ComponentFixture<ClientdashtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientdashtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientdashtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
