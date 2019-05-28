import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { FormControlValidatorComponent } from './form-validator/form-control-validator/formControlValidator.component';
import { DocComponent } from './doc/doc.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'formControl', component: FormControlValidatorComponent
  },
  {
    path: 'doc', component: DocComponent
  },
  {
    path: '', redirectTo: 'doc', pathMatch: 'full'
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      // {enableTracing: true}
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
