import { ApplicationInitStatus, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Video } from '../video';

@Component({
  moduleId: module.id,
  selector: 'bb-video-list-item',
  templateUrl: './video-list-item.component.html',
  styleUrls:['./video-list-item.css']
})
export class VideoListItemComponent implements OnInit{

  @Input() video:Video;
  @Input() itemId: number;
  @Input() activeIndex: number;
  @Output() selected = new EventEmitter();

  ngOnInit(){}

  setActive(){
    this.selected.emit(this.itemId);
  }

}
