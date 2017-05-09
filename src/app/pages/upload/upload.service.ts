import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { SignInService } from '../../nav/sign-in-form/sign-in.service';
declare var window:any;


@Injectable()
export class UploadService {

  private token:string = null;

  constructor(private SignInService:SignInService) {
    this.token = SignInService.token;
    
    console.log(window.gapi, this);
    // this.progress$ = Observable.create(observer => {
    //     this.progressObserver = observer
    // }).share();
   }

   upload(video){

     //https://developers.google.com/youtube/v3/code_samples/javascript#upload-a-video
      console.log(video);
   }


}
