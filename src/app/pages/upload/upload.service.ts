import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SignInService } from '../../nav/sign-in-form/sign-in.service';
declare var window:any;
declare var MediaUploader: any;


@Injectable()
export class UploadService {

  private accessToken:string = null;
  private uploadStartTime = 0;
  
  constructor(private SignInService:SignInService) {

    // this.accessToken = SignInService.token;
    
    // console.log(window.gapi, this);
    // this.progress$ = Observable.create(observer => {
    //     this.progressObserver = observer
    // }).share();
   }

   upload(video){
    this.accessToken = this.SignInService.token;
      console.log(this.accessToken);
     let metadata = {
       snippet:{
         title:video.title,
         description:video.description,
         tags:video.tags,
         categoryId:22
       },
       status:{
         privacyStatus:video.privacy
       }
     };
     debugger
     let uploader = new MediaUploader({
        baseUrl: 'https://www.googleapis.com/upload/youtube/v3/videos',
        file: video.file,
        token: this.accessToken,
        metadata: metadata,
        params: {
          part: Object.keys(metadata).join(',')
        },
        onError: function(data) {
          debugger;
          var message = data;
          // Assuming the error is raised by the YouTube API, data will be
          // a JSON string with error.message set. That may not be the
          // only time onError will be raised, though.
          try {
            var errorResponse = JSON.parse(data);
            message = errorResponse.error.message;
          } finally {
            console.log(message);
          }
        }.bind(this),
        onProgress: function(data) {
          debugger;
          var currentTime = Date.now();
          var bytesUploaded = data.loaded;
          var totalBytes = data.total;
          // The times are in millis, so we need to divide by 1000 to get seconds.
          var bytesPerSecond = bytesUploaded / ((currentTime - this.uploadStartTime) / 1000);
          var estimatedSecondsRemaining = (totalBytes - bytesUploaded) / bytesPerSecond;
          var percentageComplete = (bytesUploaded * 100) / totalBytes;
        }.bind(this),
        onComplete: function(data) {
          debugger;
          var uploadResponse = JSON.parse(data);
          this.videoId = uploadResponse.id;
          //this.pollForVideoStatus();
        }.bind(this)
     });
     this.uploadStartTime = Date.now();
      uploader.upload();
     
      
      console.log(video);
   }


}
