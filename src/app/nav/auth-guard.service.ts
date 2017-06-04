import {Injectable} from '@angular/core';
import {Observable,Subject} from 'rxjs/Rx';
import {CanActivate,Router,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {SignInService} from './sign-in-form/sign-in.service';
import {User} from './sign-in-form/user';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private signInService: SignInService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise < boolean >  {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Promise < boolean > {

    let destroyObservable = new Subject();

    return new Promise((resolve, reject) => {
      if (this.signInService.auth === null) {
        this.signInService.init();

        this.signInService.userSbj
        .takeUntil(destroyObservable)
        .subscribe((user: User | boolean) => {
          if(user === false){
            resolve(false)
            this.router.navigate(['']);
          }
          resolve(true);
        });

      } else {
        if (this.signInService.isUserSignedIn())
          resolve(true);
        else {
          this.router.navigate(['']);
          resolve(false);
        }
      }
    });
  }

}
