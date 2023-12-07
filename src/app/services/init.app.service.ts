import { Injectable } from '@angular/core';

import { StorageService } from './db/storage.service';

@Injectable({
  providedIn: 'root'
})
export class InitializeAppService {
  public isAppInit: boolean = false;
  public platform!: string;

  constructor(private _storageService: StorageService) { }

  async initializeApp() {
    // init storage service
    await this._storageService.init();

    // init sqlite service
    // Probably I will remove it in the future
    /*
      await this.sqliteService.initializePlugin().then(async (ret) => {
        this.platform = this.sqliteService.platform;
        try {
          if (this.sqliteService.platform === 'web') {
            await this.sqliteService.initWebStore();
          }

          this.isAppInit = true;

        } catch (error) {
          console.log(`initializeAppError: ${error}`);
          await Toast.show({
            text: `initializeAppError: ${error}`,
            duration: 'long'
          });
        }
      });
    */
  }

}
