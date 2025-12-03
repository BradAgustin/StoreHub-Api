import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-edit-dialog',
  template: `
    <h2 mat-dialog-title>Editar Categoría</h2>
    <mat-dialog-content>
      <mat-form-field class="w-full">
        <mat-label>Nombre</mat-label>
        <input matInput [(ngModel)]="data.name">
      </mat-form-field>
      <mat-form-field class="w-full">
        <mat-label>Descripción</mat-label>
        <input matInput [(ngModel)]="data.description">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!data.name">Guardar</button>
    </mat-dialog-actions>
  `
})
export class CategoryEditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CategoryEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel() { this.dialogRef.close(); }
  onSave() { this.dialogRef.close(this.data); }
}
