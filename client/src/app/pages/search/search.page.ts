import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCol, IonContent, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonList, IonRow, IonSearchbar, IonSpinner, IonText } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { PlantService } from '@services/api/plant.service';
import { Plant } from '@models/plant';

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
  searchData$?: Observable<Plant[]>;
  loading = false;

  constructor(private _plantService: PlantService) { }

  ngOnInit() {}

  async handleSearchInput(event: any) {
    const query: string = event.target.value.toLowerCase();

    if (query.length >= 1) {
      // TODO: Limit list of items to 10
      // TODO: Avoid so many re-rederings
      //
      // TODO(final): Optimize it avoiding so many api calls.
      // maybe just call once and since the array returned will match the query,
      // we could filter it on client side and if not found on client-side make a new request
      this.loading = true;
      this.searchData$ = await this._plantService.searchPlant(query);
      this.loading = false;
    }

  }
}
