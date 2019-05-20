import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSwitchNgModelComponent } from './input-switch-ng-model.component';

describe('InputSwitchNgModelComponent', () => {
  let component: InputSwitchNgModelComponent;
  let fixture: ComponentFixture<InputSwitchNgModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputSwitchNgModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSwitchNgModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
