import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../video'; 
@Component({
  selector: 'bb-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  @Input() videoSrc:string;
  @Input() video:Video;

  
  constructor() { }

  ngOnInit() {
    console.log(this.video);
  }

}
