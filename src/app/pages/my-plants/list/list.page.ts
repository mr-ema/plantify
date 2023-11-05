import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyPlantsListItemComponent } from '@components/my-plants-list-item/my-plants-list-item.component';
import { IonButton, IonCol, IonContent, IonGrid, IonList, IonRow, IonText } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonList, IonButton, IonText, CommonModule, IonGrid,
    IonRow, IonCol, FormsModule, MyPlantsListItemComponent, RouterModule
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
