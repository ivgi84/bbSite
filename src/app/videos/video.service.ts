import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Video } from './video';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class VideoService {

  private static apiRef:string = 'https://www.googleapis.com/youtube/v3/';
  private static channelId:string = 'UCpH_GPYjvIzdWOyfeVGBe1Q';
  private static key:string = 'AIzaSyA_JsLIshs8g20bFXUgT6ok9AV1euCJ7eU';

  private requestUrl:string;

  private videos: Video[] = [];

  constructor(private http:Http) {}

  generateRequestUrl(api, defaults){
    this.requestUrl = VideoService.apiRef + api + '?key=' + VideoService.key;
    for(let val in defaults){
        this.requestUrl += '&'+ val + '=' + defaults[val];
    }
  }

  getVideos(defaultParams) {

    let defaultSearchParams = {
      part: 'snippet',
      channelId: VideoService.channelId,
      order:'date',
      maxResults:10
    };

    let searchParams = Object.assign(defaultSearchParams, defaultParams);

    this.generateRequestUrl('search',searchParams);
    return this.http.get(this.requestUrl)
      .map((response: Response) => {console.log(response.json());return response.json().items})
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  rateVideo(isLike:boolean){
    let api = `https://www.googleapis.com/youtube/v3/videos/rate`;
    let headers = new Headers ({'Content-Type':'application/json'});
  }

  getVideoStats(videoId:string){
    let api = 'https://www.googleapis.com/youtube/v3/videos';
    let part = 'contentDetails,statistics';
    let apiRef = `${api}?key=${VideoService.key}&part=${part}&id=${videoId}`
    return this.http.get(apiRef)
    .map((response:Response) => {
      return response.json().items
    })
    .catch((error:any) => Observable.throw(error.json().error));
  }
  
}
