import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { VideoModule } from './videos/video.module';

import { HomeComponent }        from './pages/home/home.component'
import { UploadComponent }      from './pages/upload/upload.component';
import { EditComponent }        from './pages/edit/edit.component';


const appRoutes: Routes = [
  { path: '',component: HomeComponent },
  { path: 'edit',component: EditComponent },
  { path: 'upload',component: UploadComponent },
];

@NgModule({
  declarations:[HomeComponent, EditComponent, UploadComponent],
  imports: [VideoModule, FormsModule, RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule {};