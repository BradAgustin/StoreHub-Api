import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: User = { username: '', email: '', role: 'cashier' };
  private baseUrl = environments.baseUrl;
  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  ngOnInit() {
    this.http.get<User>(`${this.baseUrl}/profile/`).subscribe(res => {
      this.user = res;
      this.user.password = '';
    });
  }

  save() {
    this.http.put(`${this.baseUrl}/profile/`, this.user).subscribe({
      next: () => this.snack.open('Perfil actualizado', 'Ok', { duration: 3000 }),
      error: () => this.snack.open('Error al actualizar', 'Cerrar')
    });
  }
}
