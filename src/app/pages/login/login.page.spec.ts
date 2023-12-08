import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AuthService } from '@services/auth/auth.service';
import { LoginPage } from './login.page';
import { Storage } from '@ionic/storage-angular';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [provideRouter([]), AuthService, Storage]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with email and password controls', () => {
    expect(component.loginForm.get('email')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });

  it('should navigate to main page if user is authenticated', async () => {
    spyOn(authService, 'isAuthenticatedUser').and.returnValue(Promise.resolve(true));
    const routerSpy = spyOn(component['_router'], 'navigate');

    await component.ngOnInit();

    expect(routerSpy).toHaveBeenCalled();
  });

  it('should not navigate to main page if user is not authenticated', async () => {
    spyOn(authService, 'isAuthenticatedUser').and.returnValue(Promise.resolve(false));
    const routerSpy = spyOn(component['_router'], 'navigate');

    await component.ngOnInit();

    expect(routerSpy).not.toHaveBeenCalled();
  });

  it('should call AuthService login and navigate to main page when login is valid', async () => {
    spyOn(component['_authService'], 'login').and.returnValue(Promise.resolve());
    const routerSpy = spyOn(component['_router'], 'navigate');
    component.loginForm.setValue({ email: 'test@example.com', password: 'test123' });

    await component.login();

    expect(component['_authService'].login).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('should not call AuthService login or navigate if login form is invalid', async () => {
    spyOn(component['_authService'], 'login');
    const routerSpy = spyOn(component['_router'], 'navigate');
    component.loginForm.setValue({ email: 'test@example.com', password: '' });

    await component.login();

    expect(component['_authService'].login).not.toHaveBeenCalled();
    expect(routerSpy).not.toHaveBeenCalled();
  });
});
