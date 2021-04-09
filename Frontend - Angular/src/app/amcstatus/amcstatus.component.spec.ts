import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AMCStatusComponent } from './amcstatus.component';

describe('AMCStatusComponent', () => {
  let component: AMCStatusComponent;
  let fixture: ComponentFixture<AMCStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AMCStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AMCStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
