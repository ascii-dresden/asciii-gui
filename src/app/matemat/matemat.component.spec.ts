import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatematComponent } from './matemat.component';

describe('MatematComponent', () => {
  let component: MatematComponent;
  let fixture: ComponentFixture<MatematComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatematComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatematComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
