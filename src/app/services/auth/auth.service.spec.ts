import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { StorageService } from '@services/db/storage.service';

describe('AuthService', () => {
  let authService: AuthService;
  let storageServiceSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageService', ['get', 'set', 'remove']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: StorageService, useValue: storageSpy }
      ]
    });

    authService = TestBed.inject(AuthService);
    storageServiceSpy = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  it('should set token on login', async () => {
    const token = 'randomToken';
    spyOn(authService as any, "_generateRandomToken").and.returnValue(token);
    storageServiceSpy.set.and.returnValue();

    await authService.login();

    expect(storageServiceSpy.set).toHaveBeenCalledWith('jwt_token', token);
  });

  it('should remove token on logout', () => {
    authService.logout();

    expect(storageServiceSpy.remove).toHaveBeenCalledWith('jwt_token');
  });

  it('should check if user is authenticated', async () => {
    const token = 'randomToken';
    storageServiceSpy.get.and.returnValue(Promise.resolve(token));

    const isAuthenticated = await authService.isAuthenticatedUser();

    expect(storageServiceSpy.get).toHaveBeenCalledWith('jwt_token');
    expect(isAuthenticated).toBe(true);
  });
});
