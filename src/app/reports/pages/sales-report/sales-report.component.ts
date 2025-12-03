import { Component } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent {
  filters = { start: '', end: '' };
  data: any = null;
  loading = false;
  constructor(private reportsService: ReportsService, private snack: MatSnackBar) {}
  getReport() {
    if(!this.filters.start || !this.filters.end) {
        this.snack.open('Selecciona ambas fechas', 'Cerrar', {duration: 2000});
        return;
    }
    this.loading = true;
    this.reportsService.getSalesReport(this.filters.start, this.filters.end).subscribe({
      next: (res) => { this.data = res; this.loading = false; },
      error: () => { this.loading = false; this.snack.open('Error al cargar reporte', 'Cerrar'); }
    });
  }
}
