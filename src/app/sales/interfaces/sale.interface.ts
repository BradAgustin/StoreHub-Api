export interface Sale {
  id?: number;
  total: number;
  client?: number;
  details: SaleDetail[];
}

export interface SaleDetail {
  product: number;
  quantity: number;
  subtotal: number;
}
