import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InputSwitchComponent } from './common/components/input-switch/input-switch.component';
import { DocComponent } from './doc/doc.component';
import { TestComponent } from './test/test.component';
import { SliderComponent } from './common/components/slider/slider.component';
import { InputSwitchNgModelComponent } from './common/components/input-switch-ng-model/input-switch-ng-model.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    InputSwitchComponent,
    DocComponent,
    TestComponent,
    SliderComponent,
    InputSwitchNgModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
