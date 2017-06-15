import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './nav/auth-guard.service';
import { CanDeactivateGuard } from './nav/can-deactivate.guard';

import { HomeComponent }        from './pages/home/home.component'
import { UploadComponent }      from './pages/upload/upload.component';
import { EditComponent }        from './pages/edit/edit.component';


const appRoutes: Routes = [
  { path: '',component: HomeComponent },
  { path: 'edit',component: EditComponent },
  { path: 'upload',
    canActivate: [AuthGuard],
    canDeactivate:[CanDeactivateGuard],
    component: UploadComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ],
  providers:[AuthGuard, CanDeactivateGuard]
})


export class AppRoutingModule {};