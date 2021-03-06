import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Video } from './models/video';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class VideoService {

  private static apiRef:string = 'https://www.googleapis.com/youtube/v3/';
  private static channelId:string = 'UCpH_GPYjvIzdWOyfeVGBe1Q';
  private static key:string = 'AIzaSyA_JsLIshs8g20bFXUgT6ok9AV1euCJ7eU';

  private requestUrl:string;
  private videos: Video[] = [];
  private nextPageToken:string = null;

  videoSubject = new Subject<Video>();

  constructor(private http:Http) {}

  generateRequestUrl(api, defaults){
    this.requestUrl = VideoService.apiRef + api + '?key=' + VideoService.key;
    for(let val in defaults){
        this.requestUrl += '&'+ val + '=' + defaults[val];
    }
  }

  getVideos(params?, loadMore?) {
    let defaultSearchParams = {
      part: 'snippet',
      channelId: VideoService.channelId,
      order:'date',
      maxResults:5
    };

    let searchParams = Object.assign(defaultSearchParams, params);
    if(loadMore)
      searchParams['pageToken'] = this.nextPageToken;
    
    this.generateRequestUrl('search',searchParams);

    return this.http.get(this.requestUrl)
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'))
      .subscribe((response:any)=>{
        this.nextPageToken = response.json().nextPageToken; 
        this.videoSubject.next(response.json().items);
      });
  }

  rateVideo(isLike:boolean){
    const api = `https://www.googleapis.com/youtube/v3/videos/rate`;
    let headers = new Headers ({'Content-Type':'application/json'});
  }

  getVideoStats(videoId:string){
    const api = 'https://www.googleapis.com/youtube/v3/videos';
    let part = 'contentDetails,statistics';
    let apiRef = `${api}?key=${VideoService.key}&part=${part}&id=${videoId}`
    return this.http.get(apiRef)
    .map((response:Response) => {
      return response.json().items
    })
    .catch((error:any) => Observable.throw(error.json().error));
  }

    getCommentForVideo(videoId:string){
      const api = 'https://www.googleapis.com/youtube/v3/commentThreads';
      let part = 'id,replies,snippet';
      let apiRef = `${api}?key=${VideoService.key}&part=${part}&videoId=${videoId}`
      return this.http.get(apiRef)
        .map((response:Response) => {
          return response.json().items
        })
      .catch((error:any) => Observable.throw(error.json().error));
  }
  
}
