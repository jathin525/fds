import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeshopsComponent } from './coffeeshops.component';

describe('CoffeeshopsComponent', () => {
  let component: CoffeeshopsComponent;
  let fixture: ComponentFixture<CoffeeshopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoffeeshopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
