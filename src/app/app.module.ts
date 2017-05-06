import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { VideoModule } from './videos/video.module'; 

import { RootComponent } from './root.component';
import { HomeComponent } from './home/home.component'
import { NavComponent } from './nav/nav.component';
import { SignInFormComponent } from './nav/sign-in-form/sign-in-form.component';

import { SignInService } from './nav/sign-in-form/sign-in.service';
import { EditComponent } from './edit/edit.component';

const appRoutes: Routes = [
  { path: '',component: HomeComponent },
  { path: 'edit',component: EditComponent },
//   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    SignInFormComponent,
    RootComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    VideoModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [SignInService],
  bootstrap: [RootComponent]
})
export class AppModule { }
