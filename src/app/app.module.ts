import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // 必须配置的

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { FormControlValidatorComponent } from './form-validator/form-control-validator/formControlValidator.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InputSwitchComponent } from './common/components/input-switch/input-switch.component';
import { DocComponent } from './doc/doc.component';
import { TestComponent } from './test/test.component';
import { SliderComponent } from './common/components/slider/slider.component';
import { InputSwitchNgModelComponent } from './common/components/input-switch-ng-model/input-switch-ng-model.component';
import { CheckboxComponent } from './common/components/checkbox/checkbox.component';
import { RadioComponent } from './common/components/radio/radio.component';
import { NgFormValidatorComponent } from './form-validator/ng-form-validator/ng-form-validator.component';
import { LetterValidatorDirective } from './utils/validators/letter-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormControlValidatorComponent,
    PageNotFoundComponent,
    InputSwitchComponent,
    DocComponent,
    TestComponent,
    SliderComponent,
    InputSwitchNgModelComponent,
    CheckboxComponent,
    RadioComponent,
    NgFormValidatorComponent,
    LetterValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
