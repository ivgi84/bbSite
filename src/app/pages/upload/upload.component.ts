import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'bb-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers:[UploadService]
})
export class UploadComponent implements OnInit{

  private file = null;
  isSubmited:boolean = false;

  video = {
    title:'',
    description:'',
    file: this.file
  }

  constructor(private uploadService: UploadService) {}

  onSubmit(){
    debugger;
    this.isSubmited = true;
    this.uploadService.upload(this.video);
  }

  onChange(event){
    if(event.srcElement.files.length > 0){
      this.video.file = event.srcElement.files[0];
    }
    
  }

  ngOnInit() {}

}
