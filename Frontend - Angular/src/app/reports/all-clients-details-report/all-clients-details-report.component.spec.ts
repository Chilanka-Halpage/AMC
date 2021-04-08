import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientsDetailsReportComponent } from './all-clients-details-report.component';

describe('AllClientsDetailsReportComponent', () => {
  let component: AllClientsDetailsReportComponent;
  let fixture: ComponentFixture<AllClientsDetailsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllClientsDetailsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllClientsDetailsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
