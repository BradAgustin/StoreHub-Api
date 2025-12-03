import { Component } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from '../../interfaces/client.interface';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {
  client: Client = { name: '', email: '', phone: '' };
  constructor(private clientService: ClientsService, private router: Router, private snack: MatSnackBar) {}

  save() {
    this.clientService.addClient(this.client).subscribe(() => {
      this.snack.open('Cliente guardado', 'Ok', { duration: 3000 });
      this.router.navigate(['/clients/list']);
    });
  }
}
