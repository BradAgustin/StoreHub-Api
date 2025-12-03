import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AdjustStockModalComponent } from 'src/app/shared/modals/adjust-stock-modal.component';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  public products: Product[] = [];
  public currentCategory: number | null = null;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentCategory = params['category'] ? +params['category'] : null;
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productsService.getProducts(this.currentCategory || undefined).subscribe(p => this.products = p);
  }

  onEdit(id: number) { this.router.navigate(['/inventory/edit', id]); }

  toggleStatus(product: Product) {
    product.is_active = !product.is_active;
    this.productsService.updateProduct(product).subscribe({
      next: () => this.snackBar.open(`Estado actualizado`, 'Ok', { duration: 1000 }),
      error: () => { product.is_active = !product.is_active; this.snackBar.open('Error', 'Cerrar'); }
    });
  }

  openAdjustModal(product: Product) {
    const dialogRef = this.dialog.open(AdjustStockModalComponent, {
      width: '400px',
      data: { productId: product.id, productName: product.name }
    });
    dialogRef.afterClosed().subscribe(result => { if (result) this.loadProducts(); });
  }
}
