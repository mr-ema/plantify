import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton, IonCol, IonContent, IonGrid, IonImg, IonItem, IonLabel, IonRow, IonSearchbar, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonText, IonGrid, IonRow, IonCol, CommonModule, IonButton,
    RouterModule, IonItem, IonImg, IonLabel, IonSearchbar
  ]
})
export class HomePage {
  plantData: { name: string }[] = [
    { name: 'Plant 1' },
    { name: 'Plant 2' },
    { name: 'Plant 3' },
    { name: 'Plant 4' },
    { name: 'Plant 5' },
    { name: 'Plant 6' },
  ];

  constructor() { }
}
