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

  private tags = {
    t8:  [​'Boom Beach','Boom Beach play','boom beach guide','boom beach attack','boom beach strategy','Boom Beach tactics','Boom Beach how to attack','Boom Beach tanks attack','Boom Beach scorchers attack','Boom Beach tanks','Boom Beach scorchers','Boom Beach top players','boom beach Dr T','Dr T attack','Dr T strategy','Dr T attack strategy','Dr T attack strategy','Dr T warriors attack','Dr T tanks attack','Dr T Stages 1-7','Dr T scorchers attack','Boom Beach Dr T how to attack','How to attack guide'],
    t20: [​'Boom Beach','Boom Beach game','boom beach guide','boom beach attack','boom beach strategy','Boom Beach tactics','Boom Beach how to attack','Boom Beach tanks attack','Boom Beach scorchers attack','Boom Beach tanks','Boom Beach scorchers','Boom Beach top players','boom beach Dr T','Dr T attack','Dr T strategy','Dr T attack strategy','Dr T attack strategy','Dr T warriors attack','Dr T tanks attack','Dr T Stages 1-7','Dr T scorchers attack','Boom Beach Dr T how to attack','How to attack guide'],
    hd:  ['Boom Beach','Boom Beach play','Boom Beach game','Boom Beach gameplay','boom beach guide','Hammerman','Boom Beach Hammerman','Hammerman fleet','Hammerman event','Boom Beach defending','Boom Beach base layout','Boom Beach how to defend','how to defend against Lt. Hammerman','Boom Beach defense','Boom Beach defense strategy','Hammerman attack defending strategy','Hammerman defense strategy','Boom Bech defense tactics','Hammerman attack','Boom Beach Lt Hammerman attack','​Hammerman attack defending stages 1-7,'],
    hig: ['Boom Beach','Boom Beach play','Boom Beach game','boom beach guide','boom beach attack','boom beach strategy','Boom Beach tactics','Boom Beach how to attack','Boom Beach tanks attack','Boom Beach scorchers attack','Boom Beach tanks','Boom Beach scorchers','Boom Beach top players','Boom Beach Imitation game','Imitation game','Imitation game guide','Imitation game all stages','Imitation game stages 1-7','Imitation game how to attack','Imitation game tanks attack','Imitation game scorchers attack'],
    wf:  ['Boom Beach','Boom Beach play','Boom Beach game','boom beach guide','boom beach attack','boom beach strategy','Boom Beach tactics','Boom Beach how to attack','Boom Beach tanks attack','Boom Beach scorchers attack','Boom Beach tanks','Boom Beach scorchers','Boom Beach top players','boom beach factory','War Factory','Boom Beach Was factory','Boom Beach war factory attack','Boom Beach War Factory attack guide','War Factory guide','How To attack war factory']};

  eventTypes:Array<Object> = [
    { index:'t8', text:'Dr. T Base attack level 8' },
    { index:'t20', text:'Dr. T Base attack level 20' },
    { index:'hd', text:'Lt. Hammerman fleet defending' },
    { index:'hig', text:'Hammerman\'s Imitation Game' },
    { index:'wf', text:'War Factory Attack' }];

  isSubmited:boolean = false;
  privacyList:Array<string> = ['Public','Unlisted','Private'];

  video = {
    title:'',
    description:'',
    file: this.file,
    privacy:'' ,
    event:'',
    tags: []
  }

  constructor(private uploadService: UploadService) {}

  onSubmit(){
    console.log(this.video)
    this.isSubmited = true;
    this.uploadService.upload(this.video);
  }

  onFileSelect(event){
    if(event.srcElement.files.length > 0){
      this.video.file = event.srcElement.files[0];
    }
  }
  setTags(event){
       this.video.tags = this.tags[event];
       console.log(this.video.tags);
  }
  ngOnInit() {
    
  }

}
