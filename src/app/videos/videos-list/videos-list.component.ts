import { Component, DebugNode, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from '../video';

import { VideoService } from '../video.service';

@Component({
  selector: 'bb-videos-list',
  templateUrl: './videos-list.component.html'
})
export class VideosListComponent implements OnInit {

  private nextPageToken: string;

  videos: Video[] = [];
  activeIndex = 0;
  @Output() selectedVideoSrc:SafeResourceUrl | string = null;
  @Output() selectedVideo:Video;

  constructor(private videoService: VideoService, private sanitizer: DomSanitizer) { }

  private searchParams = {
      maxResults:5
    }

  ngOnInit() {
      this.videoService.videoSubject.subscribe(
        (videos:any) =>{
            this.setVideosArr(videos)
            this.setVideoSelected();
        }
      )
      this.videoService.getVideos();
  }

  setVideosArr(videos:any){
        videos.forEach((video,i)=> {
            this.videos.push(new Video(video.id.videoId,
            video.snippet.thumbnails.default.url,
            video.snippet.title,
            video.snippet.description,
            video.snippet.publishedAt,
            this.checkIfNew(video.snippet.publishedAt)))
        })
  }

  setVideoSelected(){
    if(!this.selectedVideoSrc){
          this.selectedVideoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.setIframeSourse(0));
          this.selectedVideo = this.videos[0]; 
      }
  }
  
  onSelection(id:number){
    this.activeIndex = id;
    this.selectedVideo = this.videos[id];
    let url = this.setIframeSourse(id);
    this.selectedVideoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  checkIfNew(video){
    let now = new Date().getTime();
    let lastVideoDate = new Date(video).getTime();
    let timeDiff = now - lastVideoDate;
    let res = timeDiff / (1000 * 3600 * 24) < 1 ? true : false;
    return res;
  }

  setIframeSourse(id:number){
    return 'https://youtube.com/embed/'+ this.videos[id].videoId
  }

  loadMore(){
    this.videoService.getVideos({},true);
  }

}