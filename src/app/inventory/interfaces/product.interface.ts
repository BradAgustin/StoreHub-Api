export interface Product {
  id?: number;
  name: string;
  description?: string; // <-- Campo nuevo
  sku: string;
  price: number;
  cost: number;         // <-- Campo nuevo
  stock: number;
  category: number;
  category_name?: string;
  is_active: boolean;   // <-- Campo nuevo
}
