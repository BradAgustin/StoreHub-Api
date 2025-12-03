import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const userRole = localStorage.getItem('role'); 
  
  // Roles permitidos para esta ruta (definidos en routing)
  const expectedRoles = route.data['roles'] as Array<string>;

  // Si no hay rol guardado O el rol no está en la lista permitida...
  if (!userRole || (expectedRoles && !expectedRoles.includes(userRole))) {
    // ...Lo mandamos a la caja (que es segura para todos)
    router.navigate(['/sales/pos']); 
    return false;
  }
  return true;
};
