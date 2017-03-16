import { ApplicationInitStatus, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Video } from '../video';

@Component({
  moduleId: module.id,
  selector: 'bb-video-item',
  templateUrl: './video.component.html',
  styleUrls:['./video-item.css']
})
export class VideoComponent implements OnInit{

  @Input() video:Video;
  @Input() itemId: number;
  @Input() activeIndex: number;
  @Output() selected = new EventEmitter();

  ngOnInit(){
    console.log(this.itemId);
  }

  setActive(){
    this.selected.emit(this.itemId);
  }

}
