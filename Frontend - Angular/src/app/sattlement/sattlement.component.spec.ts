import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SattlementComponent } from './sattlement.component';

describe('SattlementComponent', () => {
  let component: SattlementComponent;
  let fixture: ComponentFixture<SattlementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SattlementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SattlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
