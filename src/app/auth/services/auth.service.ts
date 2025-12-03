import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, map, catchError, switchMap } from 'rxjs';
import { environments } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient, private router: Router) { }

  get currentUser(): User | undefined {
    if (!this.user) {
        const savedUser = localStorage.getItem('user_data');
        if(savedUser) this.user = JSON.parse(savedUser);
    }
    return this.user ? structuredClone(this.user) : undefined;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.baseUrl}/token/`, { username: email, password })
      .pipe(
        tap( response => {
          localStorage.setItem('token', response.access);
        }),
        switchMap( () => this.http.get<User>(`${this.baseUrl}/profile/`) ),
        tap( user => {
          this.user = user;
          localStorage.setItem('role', user.role);
          localStorage.setItem('user_data', JSON.stringify(user));
        }),
        map( () => true ),
        catchError( err => {
          console.error('Login error', err);
          return of(false);
        })
      );
  }

  register(userData: any): Observable<boolean> {
    return this.http.post<any>(`${this.baseUrl}/register/`, userData).pipe(
      map(() => true),
      catchError(err => of(false))
    );
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    return of(true);
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
    sessionStorage.clear();
    // Forzamos la navegación al login directamente
    this.router.navigate(['/auth/login']);
  }
}
