import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SQLiteService } from './sqlite.service';
import { DbnameVersionService } from './dbname-version.service';

import { environment } from 'src/environments/environment';
import { plantUpgradeStatements } from '@db-upgrades/plant.upgrade.statements';

import { Plant } from '@models/plant';
import { MOCK_PLANTS } from '@mock-data/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  public databaseName: string;
  public plantList: BehaviorSubject<Plant[]> = new BehaviorSubject<Plant[]>([]);

  private isPlantReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private versionUpgrades = plantUpgradeStatements;
  private loadToVersion = this.versionUpgrades[this.versionUpgrades.length - 1].toVersion;
  private mDb!: SQLiteDBConnection;

  constructor(
    private sqliteService: SQLiteService,
    private dbVerService: DbnameVersionService,
  ) {
    this.databaseName = environment.databaseNames.filter(x => x.name.includes('plant_wiki'))[0].name;
  }

  async initializeDatabase() {
    // create upgrade statements
    await this.sqliteService.addUpgradeStatement({ database: this.databaseName, upgrade: this.versionUpgrades });

    // create and/or open the database
    await this.openDatabase();

    this.dbVerService.set(this.databaseName, this.loadToVersion);
    const isData = await this.mDb.query("select * from sqlite_sequence");
    // create database initial data
    if (isData.values!.length === 0) {
      await this.createInitialData();
    }

    if (this.sqliteService.platform === 'web') {
      await this.sqliteService.sqliteConnection.saveToStore(this.databaseName);
    }

    // Fetch initial plant data
    await this.getAllPlants();
  }

  async openDatabase() {
    if (
      (this.sqliteService.native || this.sqliteService.platform === "electron")
      && (await this.sqliteService.isInConfigEncryption()).result
      && (await this.sqliteService.isDatabaseEncrypted(this.databaseName)).result
    ) {
      this.mDb = await this.sqliteService
        .openDatabase(
          this.databaseName,
          true,
          "secret",
          this.loadToVersion,
          false
        );
    } else {
      this.mDb = await this.sqliteService
        .openDatabase(
          this.databaseName,
          false,
          "no-encryption",
          this.loadToVersion,
          false
        );
    }
  }

  async getPlant(jsonPlant: Plant): Promise<Plant | null> {
    let plant = await this.sqliteService.findOneBy(this.mDb, "plant", { id: jsonPlant.id });
    return plant;
  }

  async getPlantById(plantId: number): Promise<Plant | null> {
    let plant = await this.sqliteService.findOneBy(this.mDb, "plant", { id: plantId });
    return plant;
  }

  async getAllPlants(): Promise<void> {
    const plants: Plant[] = (await this.mDb.query('SELECT * FROM plant;')).values as Plant[];
    this.plantList.next(plants);
    this.isPlantReady.next(true);
  }

  plantState(): Observable<boolean> {
    return this.isPlantReady.asObservable();
  }

  fetchPlants(): Observable<Plant[]> {
    return this.plantList.asObservable();
  }

  /*********************
   * Private Functions *
   *********************/

  private async createInitialData(): Promise<void> {
    // create authors
    for (const plant of MOCK_PLANTS) {
      await this.sqliteService.save(this.mDb, "plant", plant);
    }
  }
}
