import { Component, OnInit } from '@angular/core';
declare var gapi:any;
@Component({
  selector: 'bb-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent implements OnInit {
  private clientID = '45085932959-d7fl97m5qaomr02vttqoa05cabncrhnb.apps.googleusercontent.com';
  private clientSecret = 'MMumTuG3wF-i0xfcpuSBfx5S';

  constructor() { }

  ngOnInit() {
    
  }
  loginCallback(data){
    console.log(data)
  }

  login() {
  var myParams = {
    'clientid' : '45085932959-d7fl97m5qaomr02vttqoa05cabncrhnb.apps.googleusercontent.com', //You need to set client id
    'cookiepolicy' : 'single_host_origin',
    'callback' : 'loginCallback', //callback function
    'approvalprompt':'force',
    'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
  };
  gapi.auth.signIn(myParams);
}

}
