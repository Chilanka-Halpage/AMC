import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcFullDataComponent } from './amc-full-data.component';

describe('AmcFullDataComponent', () => {
  let component: AmcFullDataComponent;
  let fixture: ComponentFixture<AmcFullDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmcFullDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcFullDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
