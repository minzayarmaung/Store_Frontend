import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewStockComponent } from './add-new-stock.component';

describe('AddNewStockComponent', () => {
  let component: AddNewStockComponent;
  let fixture: ComponentFixture<AddNewStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewStockComponent]
    });
    fixture = TestBed.createComponent(AddNewStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
