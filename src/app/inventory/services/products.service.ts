import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environments } from 'src/environments/environment';
import { Product } from '../interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private baseUrl = environments.baseUrl;
  constructor(private http: HttpClient) {}

  // Acepta categoryId opcional
  getProducts(categoryId?: number): Observable<Product[]> { 
    let url = `${this.baseUrl}/products/`;
    if (categoryId) {
      url += `?category=${categoryId}`;
    }
    return this.http.get<any>(url).pipe(
      map(response => response.results || response)
    );
  }
  
  getProductById(id: string): Observable<Product> { return this.http.get<Product>(`${this.baseUrl}/products/${id}/`); }
  addProduct(product: Product): Observable<Product> { return this.http.post<Product>(`${this.baseUrl}/products/`, product); }
  updateProduct(product: Product): Observable<Product> { return this.http.put<Product>(`${this.baseUrl}/products/${product.id}/`, product); }
  
  getCategories(): Observable<any[]> { 
    return this.http.get<any>(`${this.baseUrl}/categories/`).pipe(
      map(response => response.results || response)
    );
  }
}
