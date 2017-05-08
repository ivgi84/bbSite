import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './appRouter.module';

import { RootComponent } from './root.component';
import { NavComponent } from './nav/nav.component';
import { SignInFormComponent } from './nav/sign-in-form/sign-in-form.component';

import { SignInService } from './nav/sign-in-form/sign-in.service';

@NgModule({
  declarations: [
    NavComponent,
    SignInFormComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [SignInService],
  bootstrap: [RootComponent]
})
export class AppModule { }
