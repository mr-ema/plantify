import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.page.html',
  styleUrls: ['./plant-detail.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule, IonContent, IonCard, IonCardHeader, IonCardTitle, IonHeader,
    IonCardSubtitle, IonCardContent, RouterModule, IonTitle, IonBackButton, IonToolbar,
    IonButtons
  ]
})
export class PlantDetailPage implements OnInit {
  plant: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const plantId = this.route.snapshot.paramMap.get('id');

    this.plant = {
      imgUrl: "https://ionicframework.com/docs/img/demos/card-media.png",
      name: "plant" + plantId,
      description: "lorem inpsu"
    };
  }

}
