import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor() { }

  login() {
    this.isAuthenticated = true;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
