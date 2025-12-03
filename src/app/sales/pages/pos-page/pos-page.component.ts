import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../inventory/services/products.service';
import { SalesService } from '../../services/sales.service';
import { ClientsService } from '../../../clients/services/clients.service';
import { Product } from '../../../inventory/interfaces/product.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmSaleModalComponent } from 'src/app/shared/modals/confirm-sale-modal.component';

@Component({
  selector: 'app-pos-page',
  templateUrl: './pos-page.component.html',
  styleUrls: ['./pos-page.component.css']
})
export class PosPageComponent implements OnInit {
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  clients: any[] = [];
  cart: any[] = [];
  total: number = 0;
  selectedClient: number | null = null;

  constructor(
    private productsService: ProductsService,
    private salesService: SalesService,
    public clientsService: ClientsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe(p => {
      const activeProducts = p.filter(product => product.is_active);
      this.allProducts = activeProducts;
      this.filteredProducts = activeProducts;
    });
    this.clientsService.getClients().subscribe((c: any) => this.clients = c);
  }

  filterProducts() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.allProducts.filter(p => 
      p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term)
    );
  }

  addToCart(product: Product) {
    if(product.stock <= 0) {
        this.snackBar.open('Sin stock disponible', 'Ok', {duration: 2000});
        return;
    }
    const existing = this.cart.find(i => i.product === product.id);
    if (existing) {
      this.updateQty(existing, 1, product.stock);
    } else {
      this.cart.push({
        product: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
        subtotal: product.price
      });
      this.calculateTotal();
    }
  }

  updateQty(item: any, change: number, maxStock?: number) {
    if(!maxStock) {
        const p = this.allProducts.find(x => x.id === item.product);
        maxStock = p ? p.stock : 999;
    }
    const newQty = item.quantity + change;
    if (newQty > maxStock) {
        this.snackBar.open('No hay suficiente stock', 'Ok', {duration: 1000});
        return;
    }
    if (newQty < 1) return;

    item.quantity = newQty;
    item.subtotal = item.quantity * item.price;
    this.calculateTotal();
  }

  removeFromCart(item: any) {
    this.cart = this.cart.filter(i => i !== item);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cart.reduce((acc, item) => acc + item.subtotal, 0);
  }

  openConfirmModal() {
    const clientName = this.clients.find(c => c.id === this.selectedClient)?.name;
    const dialogRef = this.dialog.open(ConfirmSaleModalComponent, {
      width: '400px',
      data: { cart: this.cart, total: this.total, clientName: clientName }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.processSale();
    });
  }

  processSale() {
    const salePayload: any = {
      total: this.total,
      client: this.selectedClient,
      details: this.cart.map((i: any) => ({ product: i.product, quantity: i.quantity, subtotal: i.subtotal }))
    };

    this.salesService.createSale(salePayload).subscribe({
      next: () => {
        this.snackBar.open('¡Venta Exitosa!', 'Imprimir', { duration: 4000 });
        this.cart = [];
        this.calculateTotal();
        this.selectedClient = null;
        this.ngOnInit(); 
      },
      error: () => this.snackBar.open('Error en venta', 'Cerrar')
    });
  }
}
