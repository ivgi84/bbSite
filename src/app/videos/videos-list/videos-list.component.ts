import { Component, DebugNode, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from '../video';

import { VideoService } from '../video.service';

@Component({
  selector: 'bb-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls:['./video-list.css']
})
export class VideosListComponent implements OnInit {

  videos: Video[] = [];

  activeIndex = 0;
  selectedVideoSrc:SafeResourceUrl;

  constructor(private videoService: VideoService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.videoService.generateRequestUrl('snippet','date',5);
    this.videoService.getVideos().subscribe(
      (videos: any) => {
        videos.forEach((video,i)=>{
            this.videos.push(new Video(video.id.videoId,video.snippet.thumbnails.default.url,video.snippet.title,video.snippet.description))
        })
        this.selectedVideoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.setIframeSourse(0));
      }
    );
  }

  onSelection(id:number){
    this.activeIndex = id;
    let url = this.setIframeSourse(id);
    this.selectedVideoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  setIframeSourse(id:number){
    return 'https://youtube.com/embed/'+ this.videos[id].videoId
  }

}