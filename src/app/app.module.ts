import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { VideoModule } from './videos/video.module'; 

import { HomeComponent } from './home.component'
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    VideoModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
