import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDueinvoiceComponent } from './create-dueinvoice.component';

describe('CreateDueinvoiceComponent', () => {
  let component: CreateDueinvoiceComponent;
  let fixture: ComponentFixture<CreateDueinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDueinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDueinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
