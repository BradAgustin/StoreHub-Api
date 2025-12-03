import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environments } from 'src/environments/environment';
import { Sale } from '../interfaces/sale.interface';

@Injectable({ providedIn: 'root' })
export class SalesService {
  private baseUrl = environments.baseUrl;
  constructor(private http: HttpClient) {}

  createSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(`${this.baseUrl}/sales/`, sale);
  }

  getSales(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/sales/`).pipe(
      map(response => response.results || response)
    );
  }
}
