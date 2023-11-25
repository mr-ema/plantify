import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [
    IonItem, IonGrid, IonRow, IonCol, IonContent, IonText, IonHeader, IonTitle,
    IonToolbar, IonButtons, IonBackButton, IonButton, IonInput, IonSelect,
    IonSelectOption, CommonModule, FormsModule, ReactiveFormsModule
  ]
})
export class EditPage implements OnInit {
  editPlantForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.editPlantForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      height: [null, [Validators.required]],
      indoorOutdoor: ['', [Validators.required]],
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (this.editPlantForm.valid) {
      // Save changes to the plant
    }
  }

}
