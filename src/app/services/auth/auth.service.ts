import { Injectable } from '@angular/core';
import { StorageService } from '@services/db/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenName = "jwt_token";

  constructor(private storageService: StorageService) {}

  async login() {
    this.storageService.set(this.authTokenName, this.generateRandomToken());
  }

  generateRandomToken(): string {
    return Math.random().toString(36).substring(7);
  }

  logout() {
    this.storageService.remove(this.authTokenName);
  }

  async isAuthenticatedUser(): Promise<boolean> {
      const token = await this.storageService.get(this.authTokenName);

      // by pass validation of the token to test storage
      return !!token;
  }
}
