import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcHistoryViewComponent } from './amc-history-view.component';

describe('AmcHistoryViewComponent', () => {
  let component: AmcHistoryViewComponent;
  let fixture: ComponentFixture<AmcHistoryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmcHistoryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
