import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environments } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private baseUrl = environments.baseUrl;
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> { 
    return this.http.get<any>(`${this.baseUrl}/categories/`).pipe(map(r => r.results || r)); 
  }
  addCategory(cat: any): Observable<any> { return this.http.post<any>(`${this.baseUrl}/categories/`, cat); }
  
  // Método Nuevo: Update
  updateCategory(cat: any): Observable<any> { 
    return this.http.put<any>(`${this.baseUrl}/categories/${cat.id}/`, cat); 
  }
  
  deleteCategory(id: number): Observable<any> { return this.http.delete<any>(`${this.baseUrl}/categories/${id}/`); }
}
