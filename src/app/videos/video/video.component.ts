import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../video'; 
import { VideoStats } from '../video-stats';
import { VideoService } from '../video.service';

@Component({
  selector: 'bb-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() videoSrc:string;
  @Input() video:Video;
  
  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService.getVideoStats(this.video.videoId).subscribe(
      (data:any) => {
         this.video.stats = new VideoStats(data[0].statistics.likeCount ,data[0].statistics.dislikeCount, data[0].statistics.viewCount, data[0].statistics.commentCount );
      }
    );
  }

}
