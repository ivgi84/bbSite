import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'bb-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit{

  constructor() { }

  submited = false;

  model = {
    title:'',
    description:'',
    file:''
  }

  OnSubmit(){
    console.log(this.model);
    this.submited = true;
  }

  ngOnInit() {
  }
  onChange(){
    console.log(this.model);
  }

}
