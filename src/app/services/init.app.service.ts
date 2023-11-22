import { Injectable } from '@angular/core';

import { SQLiteService } from '@services/db/sqlite.service';
import { Toast } from '@capacitor/toast';
import { PlantService } from './db/plant.service';

@Injectable({
  providedIn: 'root'
})
export class InitializeAppService {
  isAppInit: boolean = false;
  platform!: string;

  constructor(private sqliteService: SQLiteService, private plantService: PlantService) { }

  async initializeApp() {
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
