import { Product, Customer, Supplier, User } from '@/types';

export const mockProducts: Product[] = [
  { id: 1, name: 'Paracetamol 500mg', category: 'Analgésicos', laboratory: 'PharmaLab', price: 25.50, stock: 150, expiryDate: '2025-12-31', lot: 'A123' },
  { id: 2, name: 'Ibuprofeno 400mg', category: 'Anti-inflamatorios', laboratory: 'MediHealth', price: 35.00, stock: 200, expiryDate: '2026-06-30', lot: 'B456' },
  { id: 3, name: 'Amoxicilina 500mg', category: 'Antibióticos', laboratory: 'Genfar', price: 80.75, stock: 80, expiryDate: '2025-08-15', lot: 'C789' },
  { id: 4, name: 'Loratadina 10mg', category: 'Antialérgicos', laboratory: 'PharmaLab', price: 45.00, stock: 120, expiryDate: '2026-01-20', lot: 'D101' },
  { id: 5, name: 'Omeprazol 20mg', category: 'Gastrointestinales', laboratory: 'MediHealth', price: 65.20, stock: 95, expiryDate: '2025-11-30', lot: 'E112' },
  { id: 6, name: 'Vitamina C 1000mg', category: 'Vitaminas', laboratory: 'VitaLife', price: 120.00, stock: 300, expiryDate: '2027-02-28', lot: 'F131' },
  { id: 7, name: 'Diclofenaco Gel', category: 'Anti-inflamatorios', laboratory: 'Genfar', price: 55.50, stock: 70, expiryDate: '2025-10-10', lot: 'G415' },
  { id: 8, name: 'Aspirina 100mg', category: 'Analgésicos', laboratory: 'Bayer', price: 30.00, stock: 500, expiryDate: '2026-09-01', lot: 'H617' },
];

export const mockCustomers: Customer[] = [
  { id: 1, name: 'Juan Pérez', rfc: 'PEPJ800101ABC', phone: '55-1234-5678', email: 'juan.perez@email.com' },
  { id: 2, name: 'María García', rfc: 'GAMM850202XYZ', phone: '55-8765-4321', email: 'maria.garcia@email.com' },
  { id: 3, name: 'Público en General', rfc: 'XAXX010101000', phone: 'N/A', email: 'N/A' },
];

export const mockSuppliers: Supplier[] = [
    { id: 1, name: 'Distribuidora PharmaLab', contactPerson: 'Carlos Rodriguez', phone: '55-1122-3344', email: 'ventas@pharmalab.com' },
    { id: 2, name: 'MediHealth Proveedores', contactPerson: 'Ana Lopez', phone: '55-5566-7788', email: 'contacto@medihealth.com' },
];

export const mockUsers: User[] = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'administrador' },
    { id: 2, name: 'Cajero Uno', email: 'cashier1@example.com', role: 'cajero' },
];