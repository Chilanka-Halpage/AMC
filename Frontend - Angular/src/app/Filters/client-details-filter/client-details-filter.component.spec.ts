import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsFilterComponent } from './client-details-filter.component';

describe('ClientDetailsFilterComponent', () => {
  let component: ClientDetailsFilterComponent;
  let fixture: ComponentFixture<ClientDetailsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
