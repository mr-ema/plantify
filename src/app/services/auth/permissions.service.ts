import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private _authService: AuthService, private _router: Router) { }

  public async canActivate(): Promise<boolean | UrlTree> {
    if (!(await this._authService.isAuthenticatedUser())) {
      return this._router.parseUrl("/login");
    }

    return true;
  }
}


export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> => {
  return inject(PermissionsService).canActivate();
}
