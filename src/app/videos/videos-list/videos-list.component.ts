import { Component, DebugNode, OnInit } from '@angular/core';
import { Video } from '../video';

import { VideoService } from '../video.service';

@Component({
  selector: 'bb-videos-list',
  templateUrl: './videos-list.component.html'
})
export class VideosListComponent implements OnInit {

  videos: Video[] = [];

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService.getVideos().subscribe(
      (videos: any) => {
        videos.forEach((video,i)=>{
            this.videos.push(new Video(video.id.videoId,video.snippet.thumbnails.default.url,video.snippet.title,video.snippet.description))
        })
      }
    );
  }

}
