import { Injectable } from '@angular/core';

import { SQLiteService } from '@services/db/sqlite.service';
import { Toast } from '@capacitor/toast';

@Injectable()
export class InitializeAppService {
  isAppInit: boolean = false;
  platform!: string;

  constructor(private sqliteService: SQLiteService) {}

  async initializeApp() {
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
  }

}
