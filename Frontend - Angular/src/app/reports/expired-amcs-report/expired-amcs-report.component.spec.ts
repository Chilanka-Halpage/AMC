import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredAmcsReportComponent } from './expired-amcs-report.component';

describe('ExpiredAmcsReportComponent', () => {
  let component: ExpiredAmcsReportComponent;
  let fixture: ComponentFixture<ExpiredAmcsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredAmcsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredAmcsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
