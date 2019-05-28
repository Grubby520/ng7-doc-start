import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LetterValidatorDirective } from '../../utils/validators/letter-validator.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LetterValidatorDirective,
  ],
  exports: [
    LetterValidatorDirective,
  ]
})

export class ComModule { }
