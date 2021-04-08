import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientsDetailsFilterComponent } from './all-clients-details-filter.component';

describe('AllClientsDetailsFilterComponent', () => {
  let component: AllClientsDetailsFilterComponent;
  let fixture: ComponentFixture<AllClientsDetailsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllClientsDetailsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllClientsDetailsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
