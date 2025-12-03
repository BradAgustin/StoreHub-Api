import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-modal',
  template: `
    <h2 mat-dialog-title class="text-warn">Confirmar Eliminación</h2>
    <mat-dialog-content>
      <p>¿Estás seguro de eliminar <strong>{{ data.name }}</strong>?</p>
      <p class="text-sm text-gray-500">Esta acción no se puede deshacer.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="warn" (click)="onConfirm()">Eliminar</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDeleteModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  onCancel() { this.dialogRef.close(false); }
  onConfirm() { this.dialogRef.close(true); }
}
