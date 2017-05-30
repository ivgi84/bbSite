import { Component, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { SignInService } from './sign-in.service';
import { User } from './user';

@Component({
  selector: 'bb-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  constructor(private SignInService:SignInService, private ref:ChangeDetectorRef) { }

  public user:User = null;

  ngOnInit() {
    this.SignInService.init();
 
    this.SignInService.userSbj.subscribe((user:User) => {
        this.user = user;
        this.ref.detectChanges();
    });
  }

  signIn(){

    this.SignInService.signIn();
  }

  signOut(){
    this.SignInService.signOut();
  }

}

