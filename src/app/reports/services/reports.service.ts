import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment';
import { DashboardStats } from '../dashboard-stats.interface';

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private baseUrl = environments.baseUrl;
  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/reports/dashboard/`);
  }

  getTopProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reports/top-products/`);
  }

  getSalesReport(start: string, end: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/reports/sales/?start_date=${start}&end_date=${end}`);
  }
}
