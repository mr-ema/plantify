import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonAvatar, IonContent, IonHeader, IonItem, IonLabel, IonList, IonSpinner, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Plant } from '@models/plant';
import { PlantService } from '@services/api/plant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.page.html',
  styleUrls: ['./bookmark.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonList, IonItem, IonSpinner, IonAvatar, IonTitle,
    IonHeader, IonContent, IonToolbar, IonLabel, IonText
  ]
})
export class BookmarkPage implements OnInit {
  public loading = true;
  public plantBookmarks?: any[];

  constructor(private _plantService: PlantService, private _router: Router) { }

  async ngOnInit() {
    (await this._plantService.getAllBookmarkedPlants())
      .subscribe(data => {
        if (data && data.bookmarks.length > 0) {
          this.plantBookmarks = data.bookmarks;
        }

        this.loading = false;
      });
  }

  public plantClicked(plantBookmark: any) {
    this._router.navigate(['plant-detail', plantBookmark.entity_id]);
  }
}
