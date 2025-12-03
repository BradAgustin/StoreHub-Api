import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SalesReportComponent } from './pages/sales-report/sales-report.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from '../shared/pages/layout-page/layout-page.component';

const routes: Routes = [
  { 
    path: '', component: LayoutPageComponent,
    children: [
      { path: '', component: DashboardPageComponent },
      { path: 'sales', component: SalesReportComponent }
    ]
  }
];

@NgModule({
  declarations: [DashboardPageComponent, SalesReportComponent],
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule.forChild(routes)]
})
export class ReportsModule { }
