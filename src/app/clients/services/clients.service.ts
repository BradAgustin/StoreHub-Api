import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environments } from 'src/environments/environment';
import { Client } from '../interfaces/client.interface';

@Injectable({ providedIn: 'root' })
export class ClientsService {
  private baseUrl = environments.baseUrl;
  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> { 
    return this.http.get<any>(`${this.baseUrl}/clients/`).pipe(
      map(response => response.results || response)
    );
  }
  
  addClient(client: Client): Observable<Client> { return this.http.post<Client>(`${this.baseUrl}/clients/`, client); }
}
