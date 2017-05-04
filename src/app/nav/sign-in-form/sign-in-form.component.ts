import { Component, OnInit, OnChanges } from '@angular/core';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'bb-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  constructor(private SignInService:SignInService) { }

  public user = null;

  ngOnInit() {
    this.SignInService.init();
 
    this.SignInService.user.subscribe((response:any) => {
        this.user = response;
    });
  }

  signIn(){
    this.SignInService.signIn();
  }

  signOut(){
    this.SignInService.signOut();
  }

}

