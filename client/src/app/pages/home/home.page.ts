import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonItem, IonLabel, IonRow, IonSearchbar, IonSpinner, IonText } from '@ionic/angular/standalone';
import { Plant } from '@models/plant';
import { PlantService } from '@services/api/plant.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonText, IonGrid, IonRow, IonCol, CommonModule, IonButton,
    RouterModule, IonItem, IonImg, IonLabel, IonSearchbar, IonSpinner
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
