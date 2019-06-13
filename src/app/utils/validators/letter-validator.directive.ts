import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator, ValidationErrors } from '@angular/forms';
import regExps from './regExps';

@Directive({
  selector: '[appLetterValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: LetterValidatorDirective,
      multi: true
    }
  ]
})
// 实现了Validators类可以扮演验证器的角色
export class LetterValidatorDirective implements Validator {
  @Input('appLetterValidator') letterType: string;

  constructor() {
    this.letterType = '';
  }

  validate(control: AbstractControl): ValidationErrors|null {
    console.log(control);
    switch (this.letterType) {
      case 'telephone':
        if (!regExps[this.letterType].test(control.value)) {
          return {'result': {'info': '手机号码格式不对'}};
        }
        break;
      default:
        return null;
    }
    return null;
  }
}
