import { Injectable } from '@angular/core';
declare var window:any;
declare var c:any;

@Injectable()
export class SignInService {

  private static clientID = '45085932959-d7fl97m5qaomr02vttqoa05cabncrhnb.apps.googleusercontent.com';
  private clientSecret = 'MMumTuG3wF-i0xfcpuSBfx5S';
  private oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  private myParams = {
    'clientid' : '45085932959-d7fl97m5qaomr02vttqoa05cabncrhnb.apps.googleusercontent.com', //You need to set client id
    'cookiepolicy' : 'single_host_origin',
    'callback' : 'loginCallback', //callback function
    'approvalprompt':'force',
    'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
  };

  constructor() {}

  private auth;

  init(){  
    if (document.readyState === "complete" || document.readyState === "interactive") {
          (function (d, s, id,c) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              fjs.parentNode.insertBefore(js, fjs);
              js.onload = function () {
                  window.gapi.load('auth2', function () {
                    debugger;
                      window.gapi.auth2.init({ client_id: SignInService.clientID, 'scope': 'profile email' });
                      c.auth = window.gapi.auth2.getAuthInstance();
                  });
              };
              js.src = "https://apis.google.com/js/platform.js";
          } (document, 'script', 'google-jssdk',this));
      } else {
          document.addEventListener("DOMContentLoaded", this.init.bind(this));
      }  
  }

   signIn(){
     if(this.auth){
       debugger;
       this.auth
     }
   }

}
