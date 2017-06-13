import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { SignInService } from '../../nav/sign-in-form/sign-in.service';
declare var window:any;
declare var MediaUploader: any;


@Injectable()
export class UploadService {

  private accessToken:string = null;
  private uploadStartTime = 0;
  private videoId:any = null;
  readonly STATUS_POLLING_INTERVAL_MILLIS = 20 * 1000; // 20 sec
  progressObserver;
  statusObserver;

  progress$ = Observable.create(observer => {
        this.progressObserver = observer
  });

  status$ = Observable.create(observer =>{
      this.statusObserver = observer;
  });

  constructor(private SignInService:SignInService) {}

   upload(video){
  
    this.accessToken = this.SignInService.token;
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
     debugger;
     let uploader = new MediaUploader({
        baseUrl: 'https://www.googleapis.com/upload/youtube/v3/videos',
        file: video.file,
        token: this.accessToken,
        metadata: metadata,
        params: {
          part: Object.keys(metadata).join(',')
        },
        onError: (data)=> {
          let message = data;
          try {
            let errorResponse = JSON.parse(data);
            message = errorResponse.error.message;
          } finally {
            this.statusObserver.next({uploadFinished: true, message:message});
          }
        },
        onProgress: (data)=> {
          this.statusObserver.next({uploadFinished: false,message:'Uploading'});
          let currentTime = Date.now();
          let bytesUploaded = data.loaded;
          let totalBytes = data.total;
          // The times are in millis, so we need to divide by 1000 to get seconds.
          let bytesPerSecond = bytesUploaded / ((currentTime - this.uploadStartTime) / 1000);
          let estimatedSecondsRemaining = (totalBytes - bytesUploaded) / bytesPerSecond;
          let percentageComplete = ((bytesUploaded * 100) / totalBytes).toFixed(0);

          this.progressObserver.next(percentageComplete);

        },
        onComplete: (data)=> {
          this.statusObserver.next({uploadFinished: true,message:'Upload Complete'});
          let uploadResponse = JSON.parse(data);
          this.videoId = uploadResponse.id;
          this.pollForVideoStatus();
        }
     });
      this.uploadStartTime = Date.now();
      uploader.upload();
   }


   pollForVideoStatus(){
      window.gapi.client.request({
          path:'/youtube/v3/videos',
          params:{
            part:'status,player',
            id:this.videoId
          },
          callback: (response)=>{
              if(response.error){
                console.log(response.error.message);
                setTimeout(this.pollForVideoStatus(), this.STATUS_POLLING_INTERVAL_MILLIS);
              }
              else{
                let uploadStatus = response.items[0].status.uploadStatus;
                switch(uploadStatus) {
                  case 'uploaded':
                    this.statusObserver.next({uploadFinished: true, message:'the video is being processed'});
                    setTimeout(this.pollForVideoStatus(), this.STATUS_POLLING_INTERVAL_MILLIS);
                  break;
                  case 'processed':
                    this.statusObserver.next({uploadFinished: true,message:'The vieo has been processed successfully'});
                  break
                  default:
                  this.statusObserver.next({uploadFinished: true,message:'Transcoding failed'});
                }
              }
          }
      });
   }

}
