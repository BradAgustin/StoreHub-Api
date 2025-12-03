import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

export const publicGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap(isAuthenticated => {
      if (isAuthenticated) {
        // Si ya está logueado, lo mandamos al Dashboard directo
        router.navigate(['/dashboard']);
      }
    }),
    map(isAuthenticated => !isAuthenticated)
  );
};
