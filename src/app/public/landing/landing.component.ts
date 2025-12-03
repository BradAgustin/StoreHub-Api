import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
    <div class="landing-container">
      <mat-toolbar color="primary">
        <span>StoreHub</span>
        <span class="spacer"></span>
        <button mat-button routerLink="/auth/login">INICIAR SESIÓN</button>
      </mat-toolbar>

      <div class="hero-section text-center p-5">
        <h1 class="text-5xl mt-5">Gestiona tu negocio fácil</h1>
        <p class="text-xl mb-5">Control de inventario, punto de venta y reportes en un solo lugar.</p>
        <button mat-raised-button color="accent" routerLink="/auth/login" class="text-lg p-3">COMENZAR AHORA</button>
      </div>

      <div class="features grid p-5">
        <div class="col-12 md:col-4 text-center">
          <mat-icon class="text-5xl text-primary">point_of_sale</mat-icon>
          <h3>Punto de Venta</h3>
          <p>Vende rápido y sin complicaciones.</p>
        </div>
        <div class="col-12 md:col-4 text-center">
          <mat-icon class="text-5xl text-primary">inventory</mat-icon>
          <h3>Inventario</h3>
          <p>Control total de tu stock y movimientos.</p>
        </div>
        <div class="col-12 md:col-4 text-center">
          <mat-icon class="text-5xl text-primary">bar_chart</mat-icon>
          <h3>Reportes</h3>
          <p>Toma decisiones con datos reales.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .hero-section { background-color: #f5f5f5; padding: 100px 20px; }
    mat-icon { height: 50px; width: 50px; }
  `]
})
export class LandingComponent {}
