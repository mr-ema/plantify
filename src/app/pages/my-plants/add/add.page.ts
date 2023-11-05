import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [
    IonItem, IonGrid, IonRow, IonCol, IonContent, IonText, IonHeader, IonTitle,
    IonToolbar, IonButtons, IonBackButton, IonButton, IonInput, IonSelect,
    IonSelectOption, CommonModule, FormsModule, ReactiveFormsModule
  ]
})
export class AddPage implements OnInit {
  addPlantForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.addPlantForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      height: [null, [Validators.required]],
      indoorOutdoor: ['', [Validators.required]],
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (this.addPlantForm.valid) {
      // Add the new plant
    }
  }

}
