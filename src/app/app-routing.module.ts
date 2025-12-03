import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LandingComponent } from './public/landing/landing.component';
import { authGuard } from './auth/guards/auth.guard';
import { publicGuard } from './auth/guards/public.guard';
import { roleGuard } from './auth/guards/role.guard';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [publicGuard]
  },
  { 
    path: 'inventory', 
    loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule),
    canActivate: [authGuard, roleGuard], 
    data: { roles: ['admin'] } 
  },
  { 
    // Alias para cumplir con la url /products del documento si se requiere, redirige a inventory
    path: 'products', redirectTo: 'inventory', pathMatch: 'prefix'
  },
  { 
    path: 'sales', 
    loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule),
    canActivate: [authGuard]
  },
  { 
    path: 'clients', 
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
    canActivate: [authGuard]
  },
  { 
    // AQUÍ ESTABA EL ERROR: Ahora se llama 'reports' para coincidir con el menú
    path: 'reports', 
    loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
    canActivate: [authGuard, roleGuard], 
    data: { roles: ['admin'] }
  },
  // Redirección para que si alguien entra a /dashboard también funcione
  { path: 'dashboard', redirectTo: 'reports', pathMatch: 'full' },
  
  { path: '404', component: Error404PageComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
