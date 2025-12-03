import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosPageComponent } from './pages/pos-page/pos-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { LayoutPageComponent } from '../shared/pages/layout-page/layout-page.component'; // <-- CORREGIDO: '../'

const routes: Routes = [
  {
    path: '', component: LayoutPageComponent,
    children: [
      { path: 'pos', component: PosPageComponent },
      { path: 'history', component: HistoryPageComponent },
      { path: '**', redirectTo: 'pos' }
    ]
  }
];
@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SalesRoutingModule {}
