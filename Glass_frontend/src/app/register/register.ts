import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  registrationSuccess = signal(false);
  registrationError = signal('');

  constructor() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator = (group: FormGroup) => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  onRegister() {
    this.registrationError.set('');
    this.registrationSuccess.set(false);

    if (this.registerForm.valid) {
      const { firstName, lastName, email, password } = this.registerForm.value;
      const success = this.authService.register(firstName, lastName, email, password);

      if (success) {
        this.registrationSuccess.set(true);
        this.registerForm.reset();
        console.log('Registration successful');
      } else {
        this.registrationError.set('Email already exists. Please use a different email.');
      }
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}


