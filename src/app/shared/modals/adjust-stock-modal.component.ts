import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adjust-stock-modal',
  template: `
    <h2 mat-dialog-title>Ajuste de Inventario: {{ data.productName }}</h2>
    <mat-dialog-content>
      <form>
        <mat-form-field class="w-full">
          <mat-label>Tipo de Movimiento</mat-label>
          <mat-select [(ngModel)]="movement.type" name="type">
            <mat-option value="IN">Entrada (Compra)</mat-option>
            <mat-option value="OUT">Salida (Merma/Uso)</mat-option>
            <mat-option value="ADJ">Ajuste (Corrección)</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Cantidad</mat-label>
          <input matInput type="number" [(ngModel)]="movement.quantity" name="qty" min="1">
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Motivo</mat-label>
          <input matInput [(ngModel)]="movement.reason" name="reason" placeholder="Ej. Caducidad, Error de conteo">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="accent" (click)="onSave()">Registrar</button>
    </mat-dialog-actions>
  `
})
export class AdjustStockModalComponent {
  movement = { type: 'IN', quantity: 1, reason: '' };
  private baseUrl = environments.baseUrl;

  constructor(
    public dialogRef: MatDialogRef<AdjustStockModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private snack: MatSnackBar
  ) {}

  onCancel(): void { this.dialogRef.close(false); }

  onSave(): void {
    this.http.post(`${this.baseUrl}/movements/`, {
      product: this.data.productId,
      ...this.movement,
      user: 1 // El backend lo tomará del token
    }).subscribe({
      next: () => {
        this.snack.open('Movimiento registrado', 'Ok', { duration: 2000 });
        this.dialogRef.close(true);
      },
      error: () => this.snack.open('Error al registrar', 'Cerrar')
    });
  }
}
