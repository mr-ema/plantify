import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonRow, IonText, IonThumbnail } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';

addIcons({
  "create-outline": createOutline
});

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonList, IonButton, IonText, CommonModule, IonGrid, IonIcon, IonLabel,
    IonRow, IonCol, FormsModule, RouterModule, IonThumbnail, IonItem
  ]
})
export class ListPage implements OnInit {
  // Test List
  plantList: { name: string }[] = [
    { name: 'Plant 1' },
    { name: 'Plant 2' },
    { name: 'Plant 3' },
  ];

  constructor() { }

  ngOnInit() {}

}
