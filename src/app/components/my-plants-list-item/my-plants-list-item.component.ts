import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton, IonIcon, IonItem, IonLabel, IonThumbnail } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';

addIcons({
  "create-outline": createOutline
});

@Component({
  selector: 'app-my-plants-list-item',
  standalone: true,
  templateUrl: './my-plants-list-item.component.html',
  styleUrls: ['./my-plants-list-item.component.scss'],
  imports: [IonItem, IonThumbnail, IonLabel, IonIcon, IonButton, RouterModule]
})
export class MyPlantsListItemComponent implements OnInit {
  @Input() plantName: string = '';

  constructor() { }

  ngOnInit() {}

}
