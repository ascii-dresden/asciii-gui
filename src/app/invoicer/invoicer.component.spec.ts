import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicerComponent } from './invoicer.component';

describe('InvoicerComponent', () => {
  let component: InvoicerComponent;
  let fixture: ComponentFixture<InvoicerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
