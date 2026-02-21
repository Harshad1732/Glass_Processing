import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm: FormGroup;
  loginError = signal('');
  loginSuccess = signal(false);
  isTransitioning = signal(false);

  constructor() {
    this.loginForm = this.fb.group({
      userid: ['john@example.com', [Validators.required]],
      password: ['password123', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    this.loginError.set('');
    this.loginSuccess.set(false);

    if (this.loginForm.valid) {
      const { userid, password } = this.loginForm.value;
      const success = this.authService.login(userid, password);

      if (success) {
        this.loginSuccess.set(true);
        this.isTransitioning.set(true);
        console.log('Login successful');
        // Short transition effect before route change.
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 900);
      } else {
        this.loginError.set('Invalid email or password. Try: john@example.com / password123');
      }
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}


