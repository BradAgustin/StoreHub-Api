import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InventoryRoutingModule } from './inventory-routing.module';
import { MaterialModule } from '../material/material.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { MovementHistoryComponent } from './pages/movement-history/movement-history.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { CategoryEditDialogComponent } from './pages/category-list/category-edit-dialog.component';

@NgModule({
  declarations: [
    ListPageComponent, NewPageComponent, 
    MovementHistoryComponent, CategoryListComponent, CategoryEditDialogComponent
  ],
  imports: [CommonModule, InventoryRoutingModule, MaterialModule, ReactiveFormsModule, FormsModule]
})
export class InventoryModule {}
