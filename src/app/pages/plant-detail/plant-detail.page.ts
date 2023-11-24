import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PlantService } from '@services/db/plant.service';
import { Plant } from '@models/plant';

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
  plant!: Plant;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService,
  ) { }

  async ngOnInit() {
    const plantId = this.route.snapshot.paramMap.get('id');

    // check for valid id number
    if (plantId && plantId.match(/^-?\d+$/)) {
      this.plant = await this.plantService.getPlantById(parseInt(plantId) as number) as Plant;
    }
  }

}
