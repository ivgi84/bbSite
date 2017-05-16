import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from './user';
declare var window:any;

@Injectable()
export class SignInService {

  private static clientID = '45085932959-d7fl97m5qaomr02vttqoa05cabncrhnb.apps.googleusercontent.com';  

  constructor() {}

  private auth:any;
  public userSbj = new Subject();

  init(){  
    if (document.readyState === "complete" || document.readyState === "interactive") {
          (function (d, s, id, c) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              fjs.parentNode.insertBefore(js, fjs);
              js.onload = function () {
                  window.gapi.load('auth2', function () {
                      window.gapi.auth2.init({ client_id: SignInService.clientID, 'scope': 'profile email https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.upload' });
                      c.auth = window.gapi.auth2.getAuthInstance();
                      c.auth.then(function(response){
                        if(c.isUserSignedIn)
                           c.getUser();
                      });
                  });
              };

              js.src = "https://apis.google.com/js/client:plusone.js";
          } (document, 'script', 'google-jssdk',this));
      } else {
          document.addEventListener("DOMContentLoaded", this.init.bind(this));
      }  
  }
  
   signIn(){
     if(this.auth){
       this.auth.signIn().then(()=>{
            this.getUser();
         });
     }
   }

   signOut(){
     this.auth.signOut().then(()=>{
        this.userSbj.next(null);
     });
   }

   get isUserSignedIn(){
     return this.auth.isSignedIn.get();
   }

  getUser(){
    let data = this.auth.currentUser.get().getBasicProfile();
    let me = new User(data.Eea, data.ofa, data.wea, data.Paa, data.U3);
    this.userSbj.next(me);
  }

  get token(){
    return this.auth && this.auth.currentUser && this.auth.currentUser.get().Zi.access_token;
  }
}
