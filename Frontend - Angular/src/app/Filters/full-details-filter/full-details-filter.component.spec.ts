import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullDetailsFilterComponent } from './full-details-filter.component';

describe('FullDetailsFilterComponent', () => {
  let component: FullDetailsFilterComponent;
  let fixture: ComponentFixture<FullDetailsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullDetailsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullDetailsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
