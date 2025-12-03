import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-low-stock-warning-modal',
  template: `
    <h2 mat-dialog-title class="text-red-500"><mat-icon>warning</mat-icon> Alerta de Stock</h2>
    <mat-dialog-content>
      <p>El producto <strong>{{ data.productName }}</strong> tiene stock crítico.</p>
      <p>Stock actual: <strong>{{ data.currentStock }}</strong></p>
      <p>¿Desea continuar con la venta?</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">Continuar</button>
    </mat-dialog-actions>
  `
})
export class LowStockWarningModalComponent {
  constructor(
    public dialogRef: MatDialogRef<LowStockWarningModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onCancel() { this.dialogRef.close(false); }
  onConfirm() { this.dialogRef.close(true); }
}
