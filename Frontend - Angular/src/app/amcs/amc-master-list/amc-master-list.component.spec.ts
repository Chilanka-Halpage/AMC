import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmcMasterListComponent } from './amc-master-list.component';

describe('AmcMasterListComponent', () => {
  let component: AmcMasterListComponent;
  let fixture: ComponentFixture<AmcMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmcMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmcMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
