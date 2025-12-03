import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-sale-modal',
  template: `
    <h2 mat-dialog-title>Confirmar Venta</h2>
    <mat-dialog-content>
      <p>Cliente: <strong>{{ data.clientName || 'Público General' }}</strong></p>
      <mat-list>
        <mat-list-item *ngFor="let item of data.cart">
          <span matListItemTitle>{{ item.productName }} (x{{ item.quantity }})</span>
          <span matListItemMeta>{{ item.subtotal | currency }}</span>
        </mat-list-item>
      </mat-list>
      <mat-divider></mat-divider>
      <div class="flex justify-content-between mt-3">
        <h3>TOTAL A PAGAR:</h3>
        <h2 class="text-primary">{{ data.total | currency }}</h2>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onConfirm()">CONFIRMAR E IMPRIMIR</button>
    </mat-dialog-actions>
  `
})
export class ConfirmSaleModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmSaleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void { this.dialogRef.close(false); }
  onConfirm(): void { this.dialogRef.close(true); }
}
