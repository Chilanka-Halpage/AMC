import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAmcFilterComponent } from './all-amc-filter.component';

describe('AllAmcFilterComponent', () => {
  let component: AllAmcFilterComponent;
  let fixture: ComponentFixture<AllAmcFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAmcFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAmcFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
