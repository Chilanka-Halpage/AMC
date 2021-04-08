import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalAmcsFilterComponent } from './renewal-amcs-filter.component';

describe('RenewalAmcsFilterComponent', () => {
  let component: RenewalAmcsFilterComponent;
  let fixture: ComponentFixture<RenewalAmcsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalAmcsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalAmcsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
