import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environment';

@Component({
  selector: 'app-movement-history',
  templateUrl: './movement-history.component.html',
  styleUrls: ['./movement-history.component.css']
})
export class MovementHistoryComponent implements OnInit {
  movements: any[] = [];
  private baseUrl = environments.baseUrl;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get<any>(`${this.baseUrl}/movements/`).subscribe(response => {
      this.movements = response.results || response;
    });
  }
}
