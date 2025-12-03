import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../shared/pages/layout-page/layout-page.component'; // <-- CORREGIDO: '../'
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { MovementHistoryComponent } from './pages/movement-history/movement-history.component';

const routes: Routes = [
  {
    path: '', component: LayoutPageComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListPageComponent },
      { path: 'form', component: NewPageComponent },
      { path: 'new', redirectTo: 'form' },
      { path: 'edit/:id', component: NewPageComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'movements', component: MovementHistoryComponent }
    ]
  }
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class InventoryRoutingModule {}
