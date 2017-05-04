import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Rx';
declare var window:any;
declare var c:any;

@Injectable()
export class SignInService {

  private static clientID = '45085932959-d7fl97m5qaomr02vttqoa05cabncrhnb.apps.googleusercontent.com';
  private clientSecret = 'MMumTuG3wF-i0xfcpuSBfx5S';

  constructor() {}

  private auth:any;
  public user = new Subject();
  //public user = Observable.create();

  init(){  
    if (document.readyState === "complete" || document.readyState === "interactive") {
          (function (d, s, id, c) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              fjs.parentNode.insertBefore(js, fjs);
              js.onload = function () {
                  window.gapi.load('auth2', function () {
                      window.gapi.auth2.init({ client_id: SignInService.clientID, 'scope': 'profile email' });
                      c.auth = window.gapi.auth2.getAuthInstance();
                      if(c.isUserSignedIn)
                        c.getUser();
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
       this.auth.signIn({ 'scope': 'profile email' }).then(()=>{
            this.auth.isSignedIn.listen(this.updateSigninStatus.bind(this));
            this.updateSigninStatus(this.auth.isSignedIn.get());
         });
     }
   }

   signOut(){
     this.auth.signOut().then(()=>{
        this.user.next(null);
     });
   }

   get isUserSignedIn(){
     return this.auth.isSignedIn.get();
   }

  updateSigninStatus(isSignedIn){
    if(isSignedIn)
      this.getUser();
  }

  getUser(){
    let user = this.auth.currentUser.get();
    this.user.next(user.getBasicProfile());
  }
}
