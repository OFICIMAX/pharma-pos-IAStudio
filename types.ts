export interface Product {
  id: number;
  name: string;
  category: string;
  laboratory: string;
  price: number;
  stock: number;
  expiryDate: string;
  lot: string;
}

export interface Customer {
  id: number;
  name: string;
  rfc: string;
  phone: string;
  email: string;
}

export interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'administrador' | 'cajero';
}

export interface CartItem {
  product: Product;
  quantity: number;
  discount: number; // Percentage discount for this item
}

export type PaymentMethod = 'efectivo' | 'tarjeta' | 'transferencia' | 'cheque' | 'credito';

export type ViewType = 'dashboard' | 'pos' | 'products' | 'customers' | 'suppliers' | 'users' | 'billing' | 'quotes' | 'reports' | 'settings';
