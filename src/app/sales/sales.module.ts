import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesRoutingModule } from './sales-routing.module';
import { MaterialModule } from '../material/material.module';
import { PosPageComponent } from './pages/pos-page/pos-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';

@NgModule({
  declarations: [PosPageComponent, HistoryPageComponent],
  imports: [CommonModule, SalesRoutingModule, MaterialModule, FormsModule]
})
export class SalesModule {}
