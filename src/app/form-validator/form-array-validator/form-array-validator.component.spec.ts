import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayValidatorComponent } from './form-array-validator.component';

describe('FormArrayValidatorComponent', () => {
  let component: FormArrayValidatorComponent;
  let fixture: ComponentFixture<FormArrayValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormArrayValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArrayValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
