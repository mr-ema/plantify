import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';

import { SQLiteService } from './db/sqlite.service';
import { PlantService } from './db/plant.service';
import { StorageService } from './db/storage.service';

@Injectable({
  providedIn: 'root'
})
export class InitializeAppService {
  isAppInit: boolean = false;
  platform!: string;

  constructor(
    private storageService: StorageService,
    private sqliteService: SQLiteService,
    private plantService: PlantService
  ) { }

  async initializeApp() {
    // init storage service
    await this.storageService.init();

    // init sqlite service
    await this.sqliteService.initializePlugin().then(async (ret) => {
      this.platform = this.sqliteService.platform;
      try {
        if (this.sqliteService.platform === 'web') {
          await this.sqliteService.initWebStore();
        }

        // init data bases
        await this.plantService.initializeDatabase();

        this.isAppInit = true;

      } catch (error) {
        console.log(`initializeAppError: ${error}`);
        await Toast.show({
          text: `initializeAppError: ${error}`,
          duration: 'long'
        });
      }
    });
  }

}
