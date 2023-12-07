import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonCol, IonContent, IonGrid, IonInput, IonRow, IonText, IonItem, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonInput, IonContent, IonItem, IonText, IonGrid, RouterModule,
    IonCol, IonRow, IonButton, CommonModule, FormsModule, ReactiveFormsModule
  ]
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    const isAuthenticated = await this._authService.isAuthenticatedUser();

    if (isAuthenticated) {
      this._router.navigate(['/tabs'], { replaceUrl: true });
    }

    return;
  }

  public async login() {
    if (this.loginForm.valid) {
      await this._authService.login();
      this._router.navigate(['/tabs'], { replaceUrl: true });
    }

    return;
  }

  public getValidationMessage(controlName: string) {
    const control = this.loginForm.get(controlName);
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
      { type: 'required', message: 'El campo de correo electrónico es obligatorio.' },
      { type: 'email', message: 'Por favor, ingrese un correo electrónico válido.' },
    ],
    password: [
      { type: 'required', message: 'El campo no puede estar vacio.' },
    ],
  };
}
