import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayedComponent } from './payed.component';

describe('PayedComponent', () => {
  let component: PayedComponent;
  let fixture: ComponentFixture<PayedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
