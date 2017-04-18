import { Component, OnInit,OnChanges, Input } from '@angular/core';
import { Video } from '../video'; 
import { VideoStats } from '../video-stats';
import { Comment } from '../comment'; 
import { VideoService } from '../video.service';

@Component({
  selector: 'bb-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnChanges {

  @Input() videoSrc:string;
  @Input() video:Video;
  
  constructor(private videoService: VideoService) { }

  getStats(){
    this.videoService.getVideoStats(this.video.videoId).subscribe(
      (data:any) => {    
         this.video.stats = new VideoStats(data[0].statistics.likeCount ,data[0].statistics.dislikeCount, data[0].statistics.viewCount, data[0].statistics.commentCount );
         if(this.video.stats.comments > 0){
            this.loadComments();
         }
      }
    );
  }

  loadComments(){
    this.videoService.getCommentForVideo(this.video.videoId).subscribe(
      (data:any) => {
        let comments: Comment[] = [];
        data.forEach((comment, ind) => {
          let cache = comment.snippet.topLevelComment.snippet;
          comments.push(new Comment(cache.textDisplay,cache.authorDisplayName, cache.authorProfileImageUrl,cache.publishedAt));
        });
        this.video.comments = comments;
      }
    )
  }

  ngOnInit() {  }

  ngOnChanges(){
    this.getStats();
  }

}
