import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryEditDialogComponent } from './category-edit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  newCatName = '';

  constructor(
    private catService: CategoriesService, 
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() { this.load(); }
  load() { this.catService.getCategories().subscribe(c => this.categories = c); }
  add() {
    if(!this.newCatName) return;
    this.catService.addCategory({name: this.newCatName, description: ''}).subscribe(() => {
      this.newCatName = ''; this.load();
      this.snack.open('Categoría agregada', 'Ok', {duration: 2000});
    });
  }
  delete(id: number) { 
    if(!confirm('¿Eliminar categoría?')) return;
    this.catService.deleteCategory(id).subscribe({
      next: () => { this.load(); this.snack.open('Eliminada', 'Ok', {duration: 2000}); },
      error: () => this.snack.open('No se puede eliminar', 'Cerrar')
    }); 
  }
  edit(category: any) {
    const dialogRef = this.dialog.open(CategoryEditDialogComponent, { width: '400px', data: { ...category } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.catService.updateCategory(result).subscribe(() => { this.load(); this.snack.open('Actualizada', 'Ok'); });
    });
  }
  goToProducts(catId: number) { this.router.navigate(['/inventory/list'], { queryParams: { category: catId } }); }
}
