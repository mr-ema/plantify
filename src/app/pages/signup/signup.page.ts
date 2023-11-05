import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonRow, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonInput, IonContent, IonItem, IonText, IonGrid, RouterModule,
    IonCol, IonRow, IonButton, CommonModule, FormsModule, ReactiveFormsModule
  ]
})
export class SignupPage implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    const passwordPattern = "^[0-9a-zA-Z]{8,16}$";

    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      confirmPassword: ['', [Validators.required]],
    });

    this.registrationForm.addValidators(
      this.matchingPasswordsValidator(
        this.registrationForm.get('password') as AbstractControl,
        this.registrationForm.get('confirmPassword') as AbstractControl
      )
    );
  }

  ngOnInit() { }

  matchingPasswordsValidator(controlOne: AbstractControl, controlTwo: AbstractControl) {
    return () => {
      const passOne = controlOne.value as string;
      const passTwo = controlTwo.value as string;

      if (passTwo !== passOne) {
        this.registrationForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      }

      return null
    }
  }


  register() {
    if (this.registrationForm.valid) {
      this.router.navigate(['/login']);
    }
  }

  validationMessages = {
    email: [
      { type: 'required', message: 'El campo "email" es obligatorio.' },
      { type: 'email', message: 'Por favor, ingrese un correo electrónico válido.' },
    ],
    name: [
      { type: 'required', message: 'El campo "nombre" es obligatorio.' },
    ],
    password: [
      { type: 'required', message: 'El campo "contraseña" es obligatorio.' },
      { type: 'pattern', message: 'La contraseña debe contener entre 8 y 16 caracteres alfanuméricos.' },
    ],
    confirmPassword: [
      { type: 'required', message: 'El campo "confirmación de contraseña" es obligatorio.' },
      { type: 'passwordMismatch', message: 'Las contraseñas no coinciden.' },
    ],
  };

}
