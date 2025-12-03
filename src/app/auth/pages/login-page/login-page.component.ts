import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm = { username: '', password: '' };
  loading = false;

  constructor(private authService: AuthService, private router: Router, private snack: MatSnackBar) {}

  onLogin() {
    if (!this.loginForm.username || !this.loginForm.password) return;
    this.loading = true;
    this.authService.login(this.loginForm.username, this.loginForm.password)
      .subscribe( success => {
        this.loading = false;
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.snack.open('Credenciales incorrectas', 'Cerrar', { duration: 3000 });
        }
      });
  }
}
