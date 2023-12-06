import { Component } from '@angular/core';
import { IonIcon, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { bookmarkOutline, homeOutline, searchOutline } from "ionicons/icons";
import { addIcons } from "ionicons";

addIcons({
  "home-outline": homeOutline,
  "search-outline": searchOutline,
  "bookmark-outline": bookmarkOutline
});

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonIcon, IonTabButton]
})
export class TabsComponent {

  constructor() { }

}
