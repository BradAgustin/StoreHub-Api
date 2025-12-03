import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LayoutPageComponent } from '../shared/pages/layout-page/layout-page.component'; // <-- CORREGIDO: '../'
import { ClientListComponent } from './pages/client-list/client-list.component';
import { ClientFormComponent } from './pages/client-form/client-form.component';

const routes: Routes = [
  {
    path: '', component: LayoutPageComponent,
    children: [
      { path: 'list', component: ClientListComponent },
      { path: 'new', component: ClientFormComponent },
      { path: '**', redirectTo: 'list' }
    ]
  }
];

@NgModule({
  declarations: [ClientListComponent, ClientFormComponent],
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule.forChild(routes)]
})
export class ClientsModule { }
