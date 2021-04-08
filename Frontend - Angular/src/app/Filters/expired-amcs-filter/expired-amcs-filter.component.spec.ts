import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredAmcsFilterComponent } from './expired-amcs-filter.component';

describe('ExpiredAmcsFilterComponent', () => {
  let component: ExpiredAmcsFilterComponent;
  let fixture: ComponentFixture<ExpiredAmcsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredAmcsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredAmcsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
