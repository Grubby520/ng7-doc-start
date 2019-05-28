import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlValidatorComponent } from './formControlValidator.component';

describe('HomeComponent', () => {
  let component: FormControlValidatorComponent;
  let fixture: ComponentFixture<FormControlValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
