import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  form: User = { username: '', email: '', password: '', first_name: '', last_name: '', role: 'cashier' };
  loading = false;
  constructor(private authService: AuthService, private router: Router, private snack: MatSnackBar) {}

  onRegister() {
    this.loading = true;
    this.authService.register(this.form).subscribe(success => {
      this.loading = false;
      if (success) {
        this.snack.open('Cuenta creada. Inicia sesión.', 'Ok', { duration: 4000 });
        this.router.navigate(['/auth/login']);
      } else {
        this.snack.open('Error al registrar.', 'Cerrar');
      }
    });
  }
}
