import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean | UrlTree {
    if (!this.authService.isAuthenticatedUser()) {
      return this.router.parseUrl("/login");
    }

    return true;
  }
}


export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  return inject(PermissionsService).canActivate();
}
