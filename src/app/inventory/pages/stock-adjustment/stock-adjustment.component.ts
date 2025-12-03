import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock-adjustment',
  template: `
    <div class="p-3">
      <h1>Ajuste de Inventario</h1>
      <p class="text-gray-500">Registra entradas, salidas por merma o ajustes manuales.</p>
      
      <mat-card class="p-4" style="max-width: 600px;">
        <form (ngSubmit)="save()">
          <mat-form-field class="w-full">
            <mat-label>Producto</mat-label>
            <mat-select [(ngModel)]="movement.product" name="product" required>
              <mat-option *ngFor="let p of products" [value]="p.id">{{ p.name }} (Actual: {{ p.stock }})</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>Tipo de Movimiento</mat-label>
            <mat-select [(ngModel)]="movement.type" name="type" required>
              <mat-option value="IN">Entrada (Compra)</mat-option>
              <mat-option value="OUT">Salida (Merma/Uso)</mat-option>
              <mat-option value="ADJ">Ajuste (Corrección)</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>Cantidad</mat-label>
            <input matInput type="number" [(ngModel)]="movement.quantity" name="quantity" required min="1">
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>Motivo / Razón</mat-label>
            <input matInput [(ngModel)]="movement.reason" name="reason">
          </mat-form-field>

          <button mat-raised-button color="accent" class="w-full" type="submit">REGISTRAR MOVIMIENTO</button>
        </form>
      </mat-card>
    </div>
  `
})
export class StockAdjustmentComponent implements OnInit {
  products: any[] = [];
  movement = { product: null, type: 'IN', quantity: 1, reason: '' };
  private baseUrl = environments.baseUrl;

  constructor(private productService: ProductsService, private http: HttpClient, private snack: MatSnackBar) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(p => this.products = p);
  }

  save() {
    // Nota: Necesitas crear este endpoint en el backend si no usas el viewset generico correctamente,
    // pero usaremos el endpoint de 'movements' que creamos en el script maestro.
    this.http.post(`${this.baseUrl}/movements/`, {
      ...this.movement,
      user: 1 // En una app real, el backend toma el user del token
    }).subscribe({
      next: () => {
        this.snack.open('Ajuste realizado', 'Ok', { duration: 3000 });
        this.movement = { product: null, type: 'IN', quantity: 1, reason: '' };
      },
      error: (err) => this.snack.open('Error al guardar', 'Cerrar')
    });
  }
}
