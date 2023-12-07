import { Injectable } from '@angular/core';
import { StorageService } from '@services/db/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authTokenName = "jwt_token";

  constructor(private _storageService: StorageService) { }

  public async login() {
    this._storageService.set(this._authTokenName, this._generateRandomToken());
  }

  public logout() {
    this._storageService.remove(this._authTokenName);
  }

  public async isAuthenticatedUser(): Promise<boolean> {
    const token = await this._storageService.get(this._authTokenName);

    // by pass validation of the token to test storage
    return !!token;
  }

  private _generateRandomToken(): string {
    return Math.random().toString(36).substring(7);
  }
}
