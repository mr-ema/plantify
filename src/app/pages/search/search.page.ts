import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCol, IonContent, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonList, IonRow, IonSearchbar, IonSpinner, IonText } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { Observable, map, BehaviorSubject } from 'rxjs';

import { PlantService } from '@services/api/plant.service';
import { Plant } from '@models/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonText, IonGrid, IonRow, IonCol, CommonModule, RouterModule,
    IonItem, IonImg, IonLabel, IonSearchbar, IonSpinner, IonInput, IonList
  ]
})
export class SearchPage implements OnInit {
  public searchData$?: Observable<Plant[]>;
  public loading = false;

  private _searchCache = new Map<string, Plant[]>();

  constructor(private _plantService: PlantService) { }

  ngOnInit() { }

  public async handleSearchInput(event: any): Promise<void> {
    const query: string = event.target.value.toLowerCase();

    if (query.length <= 0) {
      return this._clearSearchResults();
    }

    this.loading = true;

    if (this._searchCache.has(query)) {
      this.searchData$ = this._getCachedData(query);
    } else {
      this.searchData$ = await this._plantService.searchPlant(query);
      this.searchData$.subscribe(data => {
        if (data) { this._updateCache(query, data); }
      });
    }

    this.searchData$ = this.searchData$.pipe(map(data => this._processSearchData(data)));
    this.loading = false;
  }

  private _getCachedData(query: string): Observable<Plant[]> {
    return new BehaviorSubject<Plant[]>(this._searchCache.get(query) as Plant[]);
  }

  private _updateCache(query: string, data: Plant[]): void {
    this._searchCache.set(query, data);
  }

  private _processSearchData(data?: Plant[]): Plant[] {
    if (data) {
      const processedData = data.slice(0, 10); // Limit list to n elements
      return processedData;
    }

    return [];
  }

  private _clearSearchResults(): void {
    this.searchData$ = undefined;
  }
}
