import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { DashboardStats } from '../../dashboard-stats.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  stats?: DashboardStats;
  topProducts: any[] = [];
  userName: string = '';
  today = new Date();

  constructor(private reportsService: ReportsService, private authService: AuthService) {}

  ngOnInit() {
    const currentUser = this.authService.currentUser;
    this.userName = currentUser ? currentUser.username : 'Usuario';

    this.reportsService.getDashboardStats().subscribe(data => this.stats = data);
    this.reportsService.getTopProducts().subscribe(data => this.topProducts = data);
  }
}
