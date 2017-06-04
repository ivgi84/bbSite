import { Injectable } from '@angular/core';
import { Observable, Subject, Observer } from 'rxjs/Rx';
import { User } from './user';
declare var window:any;

@Injectable()
export class SignInService {

  private static clientID = '45085932959-d7fl97m5qaomr02vttqoa05cabncrhnb.apps.googleusercontent.com';  

  auth:any = null;
  userSbj = new Subject();

  constructor() {}

  loadApi(){
    return new Promise((resolve, reject)=>{
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
                  resolve();
                });
            };
            js.src = "https://apis.google.com/js/client:plusone.js";
        } (document, 'script', 'google-jssdk',this));
      } else {
          document.addEventListener("DOMContentLoaded", this.init.bind(this));
      } 
    })
  }

  init() {
     this.loadApi().then(()=>{
      this.auth.then(()=>{
        if(this.isUserSignedIn()){
          this.getUser();// return object with 2 properties: isLoggedIn: true, user: userk
        }
        else{
          this.userSbj.next(false); // return object with 2 properties: isLoggedIn: boolean, user: null
        }
      })
    });
  }

   signIn(){
     this.auth.signIn().then(()=>{
        this.getUser();
     });
   }

   signOut(){
     this.auth.signOut().then(()=>{
        this.userSbj.next(null);
     });
   }

   isUserSignedIn(){
      if(this.auth)
        return this.auth.isSignedIn.get()
      
        return undefined;
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
