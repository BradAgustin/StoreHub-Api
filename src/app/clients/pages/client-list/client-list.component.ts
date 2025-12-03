import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../interfaces/client.interface';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  constructor(private clientService: ClientsService) {}
  ngOnInit() {
    this.clientService.getClients().subscribe(res => this.clients = res);
  }
}
