import { Product, Customer, Supplier, User } from '@/types';

export const productColumns: { key: keyof Product; label: string }[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'category', label: 'Categoría' },
  { key: 'laboratory', label: 'Laboratorio' },
  { key: 'price', label: 'Precio' },
  { key: 'stock', label: 'Existencia' },
  { key: 'expiryDate', label: 'Caducidad' },
];

export const customerColumns: { key: keyof Customer; label: string }[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'rfc', label: 'RFC' },
  { key: 'phone', label: 'Teléfono' },
  { key: 'email', label: 'Email' },
];

export const supplierColumns: { key: keyof Supplier; label: string }[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'contactPerson', label: 'Contacto' },
  { key: 'phone', label: 'Teléfono' },
  { key: 'email', label: 'Email' },
];

export const userColumns: { key: keyof User; label: string }[] = [
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Rol' },
];
