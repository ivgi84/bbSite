import { Video } from '../video';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bb-video-item',
  templateUrl: './video.component.html'
})
export class VideoComponent{

  @Input() video:Video;
  @Input() videoId: number;

}
