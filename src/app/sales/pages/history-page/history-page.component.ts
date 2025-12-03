import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  sales: any[] = [];
  displayedColumns: string[] = ['id', 'date', 'user', 'total'];
  constructor(private salesService: SalesService) {}
  ngOnInit() {
    this.salesService.getSales().subscribe(data => this.sales = data);
  }
}
