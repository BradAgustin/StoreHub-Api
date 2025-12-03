import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {
  productForm: FormGroup;
  categories: any[] = [];
  currentProduct: any = {};

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      category: [null, Validators.required],
      is_active: [true],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.productsService.getCategories().subscribe(cats => this.categories = cats);
    if (this.router.url.includes('edit')) {
      this.activatedRoute.params.pipe(
        switchMap(({ id }) => this.productsService.getProductById(id))
      ).subscribe(product => {
        if (!product) { this.router.navigateByUrl('/'); return; }
        this.currentProduct = product;
        this.productForm.patchValue(product);
      });
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;
    const action = this.currentProduct.id 
      ? this.productsService.updateProduct({ ...this.currentProduct, ...this.productForm.value })
      : this.productsService.addProduct(this.productForm.value);

    action.subscribe({
      next: () => {
        this.snackBar.open('Guardado correctamente', 'Ok', { duration: 2000 });
        this.router.navigate(['/inventory/list']);
      },
      error: () => this.snackBar.open('Error al guardar', 'Cerrar')
    });
  }
}
