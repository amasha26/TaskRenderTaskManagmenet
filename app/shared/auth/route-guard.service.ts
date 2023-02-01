import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const auth_token = localStorage.getItem('jwt');

    if (auth_token) {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
      this.auth.getUserDetails
      const tokenPayload: any = decode(auth_token);

      return true;
    }
    return false;
  }
}
