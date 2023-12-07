import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonButton, IonCol, IonContent, IonGrid, IonInput, IonItem, IonRow, IonText } from '@ionic/angular/standalone';

import { AuthService } from '@services/auth/auth.service';

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
  public registrationForm: FormGroup;

  constructor(private _fb: FormBuilder, private _router: Router, private _authService: AuthService) {
    const passwordPattern = "^[0-9a-zA-Z]{8,16}$";

    this.registrationForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      confirmPassword: ['', [Validators.required]],
    });

    this.registrationForm.addValidators(
      this._matchingPasswordsValidator(
        this.registrationForm.get('password') as AbstractControl,
        this.registrationForm.get('confirmPassword') as AbstractControl
      )
    );
  }

  async ngOnInit() {
    if (await this._authService.isAuthenticatedUser()) {
      this._router.navigate(['/'], { replaceUrl: true });
    }
  }

  public register() {
    if (this.registrationForm.valid) {
      this._router.navigate(['/login']);
    }
  }

  private _matchingPasswordsValidator(controlOne: AbstractControl, controlTwo: AbstractControl) {
    return () => {
      const passOne = controlOne.value as string;
      const passTwo = controlTwo.value as string;

      if (passTwo !== passOne) {
        this.registrationForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      }

      return null
    }
  }

  public getValidationMessage(controlName: string) {
    const control = this.registrationForm.get(controlName);
    if (!control) {
      console.error(`Form control '${controlName}' not found.`);
      return null;
    }

    const key = controlName as keyof typeof this._validationMessages;
    if (!this._validationMessages.hasOwnProperty(key)) {
      console.error(`Validation messages for '${key}' is not defined.`);
      return null;
    }

    const errors = this._validationMessages[key] || [];
    for (const error of errors) {
      if (control.hasError(error.type) && control.dirty) {
        return error.message;
      }
    }

    return null;
  }

  private readonly _validationMessages = {
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
