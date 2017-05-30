import { Injectable }             from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { SignInService }          from './sign-in-form/sign-in.service';    
import { User } from './sign-in-form/user';

@Injectable()
export class AuthGuard implements CanActivate {

constructor(private signInService: SignInService, private router: Router) {}
  
  debugger;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {
    debugger;
    let url: string = state.url;
    
    return this.checkLogin(url);
  }

  checkLogin(url: string): Promise<boolean> {

  if(this.signInService.auth===null){
    this.signInService.init();
    
    this.signInService.userSbj.subscribe((user:User) => {
        this.router.navigate([url]);
    });
  }
  else{
    return new Promise((resolve,reject)=>{
      if(this.signInService.isUserSignedIn())
        resolve(true);
      else{
          this.router.navigate(['']);
          resolve(false);
      }
    });
  }
    // // Store the attempted URL for redirecting
    // //this.authService.redirectUrl = url;
    
  }

}
