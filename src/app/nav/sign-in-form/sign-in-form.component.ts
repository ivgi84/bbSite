import { Component, OnInit } from '@angular/core';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'bb-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {

  constructor(private SignInService:SignInService) { }

  ngOnInit() {
    this.SignInService.init();
  }

  signIn(){
    this.SignInService.signIn();
  }

}

