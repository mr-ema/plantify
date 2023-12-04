import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonSpinner, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PlantService } from '@services/api/plant.service';
import { Plant } from '@models/plant';
import { addIcons } from 'ionicons';
import { bookmarkOutline } from 'ionicons/icons';

addIcons({
  "bookmark-outline": bookmarkOutline
});

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.page.html',
  styleUrls: ['./plant-detail.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule, IonContent, IonCard, IonCardHeader, IonCardTitle, IonHeader,
    IonCardSubtitle, IonCardContent, RouterModule, IonTitle, IonBackButton, IonToolbar,
    IonButtons, IonSpinner, IonIcon, IonButton
  ]
})
export class PlantDetailPage implements OnInit {
  public plant?: Plant;
  public loading = true;
  public isBookmarked = false;

  constructor(
    private _route: ActivatedRoute,
    private _plantService: PlantService,
  ) { }

  async ngOnInit() {
    const plantId = this._route.snapshot.paramMap.get('id');

    // check for valid id number
    if (plantId && plantId.match(/^-?\d+$/)) {
      (await this._plantService.getPlantById(plantId)).subscribe(
        (data: Plant) => {
          if (data) {
            this.plant = { ...data };
          }

          this.loading = false;
        }
      );

      (await this._plantService.getBookmarkedPlant(plantId)).subscribe(
        data => {
          if (data) {
            this.isBookmarked = data.bookmark.is_bookmarked;
          }
        }
      );
    }
  }

  public async toggleBookmark(plant: Plant): Promise<void> {
    (await this._plantService.togglePlantBookmark(plant.id.toString(), !this.isBookmarked))
      .subscribe(data => {
        if (data) {
          this.isBookmarked = data.bookmark.is_bookmarked;
        }
      });

    return;
  }
}
