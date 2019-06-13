import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LetterValidatorDirective } from '../../utils/validators/letter-validator.directive';

@NgModule({
  declarations: [
    LetterValidatorDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LetterValidatorDirective,
  ]
})

export class ComModule { }
