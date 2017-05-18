import { Injectable }             from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot }    from '@angular/router';
import { SignInService }          from './sign-in-form/sign-in.service';         

@Injectable()
export class AuthGuard implements CanActivate {

constructor(private signInService: SignInService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean | Promise<boolean> {
    let url: string = state.url;
    
    return this.checkLogin(url);
  }

  checkLogin(url: string): Promise<boolean> {
    return this.signInService.isUserSignedIn()
    .then((res)=>{
      debugger;
        return res;
    }).catch(()=>{
        debugger;
    });

    // // Store the attempted URL for redirecting
    // //this.authService.redirectUrl = url;

    // // Navigate to the login page with extras
    // this.router.navigate(['']);
    // return false;
  }

}
