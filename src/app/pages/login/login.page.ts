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
    IonCol, IonRow, IonButton, CommonModule,  FormsModule, ReactiveFormsModule
  ]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private _authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    const isAuthenticated = await this._authService.isAuthenticatedUser();

    if (isAuthenticated) {
      this.router.navigate(['/tabs'], { replaceUrl: true });
    }
  }

  async login() {
    if (this.loginForm.valid) {
      await this._authService.login();
      this.router.navigate(['/tabs'], { replaceUrl: true });
    }
  }

  validationMessages = {
    email: [
      { type: 'required', message: 'El campo de correo electrónico es obligatorio.' },
      { type: 'email', message: 'Por favor, ingrese un correo electrónico válido.' },
    ],
    password: [
      { type: 'required', message: 'El campo no puede estar vacio.' },
    ],
  };
}

