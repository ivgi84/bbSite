import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Video } from './video';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class VideoService {

//'https://www.googleapis.com/youtube/v3/search?key=AIzaSyA_JsLIshs8g20bFXUgT6ok9AV1euCJ7eU&channelId=UCpH_GPYjvIzdWOyfeVGBe1Q&part=snippet,id&order=date&maxResults=20'

  private static apiRef:string = 'https://www.googleapis.com/youtube/v3/search';
  private static channelId:string = 'UCpH_GPYjvIzdWOyfeVGBe1Q';
  private static key:string = 'AIzaSyA_JsLIshs8g20bFXUgT6ok9AV1euCJ7eU';

  private order:string = 'date';

  private requestUrl:string;

  private videos: Video[] = [];

  constructor(private http:Http) {
    this.generateRequestUrl();
  }

  generateRequestUrl(part:string='snippet',order:string='date',maxResult:number=20){
      this.requestUrl = `${VideoService.apiRef}?key=${VideoService.key}&channelId=${VideoService.channelId}&part=${part}&order=${order}&maxResults=${maxResult}`;
  }

  getVideos() {
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
