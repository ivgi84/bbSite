import { BrowserModule }        from '@angular/platform-browser';
import { NgModule }             from '@angular/core';
import { HttpModule }           from '@angular/http';
import { FormsModule }          from '@angular/forms';

import { AppRoutingModule }     from './appRouter.module';
import { VideoModule }          from './videos/video.module';

import { RootComponent }        from './root.component';
import { NavComponent }         from './nav/nav.component';
import { SignInFormComponent }  from './nav/sign-in-form/sign-in-form.component';
import { HomeComponent }        from './pages/home/home.component'
import { UploadComponent }      from './pages/upload/upload.component';
import { EditComponent }        from './pages/edit/edit.component';


import { SignInService } from './nav/sign-in-form/sign-in.service';

@NgModule({
  declarations: [
    NavComponent,
    SignInFormComponent,
    RootComponent,
    HomeComponent, 
    EditComponent,
    UploadComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    VideoModule
  ],
  providers: [SignInService],
  bootstrap: [RootComponent]
})
export class AppModule { }
