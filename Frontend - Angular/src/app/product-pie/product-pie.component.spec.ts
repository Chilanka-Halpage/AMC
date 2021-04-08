import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPieComponent } from './product-pie.component';

describe('ProductPieComponent', () => {
  let component: ProductPieComponent;
  let fixture: ComponentFixture<ProductPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
