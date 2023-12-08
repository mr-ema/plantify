import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, UrlTree } from '@angular/router';
import { PermissionsService } from './permissions.service';
import { AuthService } from './auth.service';

describe('PermissionsService', () => {
  let permissionsService: PermissionsService;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticatedUser']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        PermissionsService,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    permissionsService = TestBed.inject(PermissionsService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should return true when user is authenticated', async () => {
    authService.isAuthenticatedUser.and.returnValue(Promise.resolve(true));

    const canActivateResult = await permissionsService.canActivate();

    expect(canActivateResult).toBe(true);
  });

  it('should navigate to login when user is not authenticated', async () => {
    authService.isAuthenticatedUser.and.returnValue(Promise.resolve(false));
    const parseUrlSpy = spyOn(router, 'parseUrl').and.callThrough();

    const canActivateResult = await permissionsService.canActivate();
    const authenticated = await authService.isAuthenticatedUser();

    expect(authenticated).toBeFalse();
    expect(canActivateResult instanceof UrlTree).toBe(true);
    expect(parseUrlSpy).toHaveBeenCalledWith('/login');
  });
});
