import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonInput, IonItem, IonLabel, IonList, IonRow, IonSearchbar, IonSpinner, IonText } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';

import { Plant } from '@models/plant';
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
  loading = true;
  plants$!: Observable<Plant[]>;

  constructor(private _plantService: PlantService) { }

  async ngOnInit() {
    this.plants$ = await this._plantService.getAllPlants();
    this.loading = false;
  }
}
