import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontAwesomeBoolComponent } from './font-awesome-bool.component';

describe('FontAwesomeBoolComponent', () => {
  let component: FontAwesomeBoolComponent;
  let fixture: ComponentFixture<FontAwesomeBoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontAwesomeBoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontAwesomeBoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
