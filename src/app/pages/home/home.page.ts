import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonList, IonRow, IonSearchbar, IonSpinner, IonText } from '@ionic/angular/standalone';

import { Plant } from '@models/api';
import { PlantService } from '@services/api/plant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonText, IonGrid, IonRow, IonCol, CommonModule, IonButton,
    RouterModule, IonItem, IonImg, IonLabel, IonSearchbar, IonSpinner, IonInput,
    IonList
  ]
})
export class HomePage implements OnInit {
  public loading = true;
  public plants?: Plant[];

  constructor(private _plantService: PlantService) { }

  async ngOnInit() {
    (await this._plantService.getAllPlants())
      .subscribe(data => {
        this.plants = data;
        this.loading = false;
      })
  }
}
