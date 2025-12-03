import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 
import { MaterialModule } from '../material/material.module';

import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { AdjustStockModalComponent } from './modals/adjust-stock-modal.component';
import { LowStockWarningModalComponent } from './modals/low-stock-warning-modal.component';
import { ConfirmSaleModalComponent } from './modals/confirm-sale-modal.component';
import { ConfirmDeleteModalComponent } from './modals/confirm-delete-modal.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

@NgModule({
  declarations: [
    Error404PageComponent, 
    AdjustStockModalComponent, 
    LowStockWarningModalComponent,
    ConfirmSaleModalComponent,
    ConfirmDeleteModalComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule, 
    FormsModule, 
    ReactiveFormsModule,
    RouterModule // Crucial para routerLink en el Layout
  ],
  exports: [
    Error404PageComponent, 
    AdjustStockModalComponent, 
    LowStockWarningModalComponent,
    ConfirmSaleModalComponent,
    ConfirmDeleteModalComponent,
    LayoutPageComponent,
    MaterialModule // Exportamos Material para que quien importe Shared lo tenga
  ]
})
export class SharedModule { }
