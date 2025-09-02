'use client';

import React, { useState, useCallback } from 'react';
import LoginPage from '@/components/LoginPage';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import PointOfSale from '@/components/PointOfSale';
import CrudPage from '@/components/CrudPage';
import Settings from '@/components/Settings';
import { Product, Customer, Supplier, User, ViewType } from '@/types';
import { mockProducts, mockCustomers, mockSuppliers, mockUsers } from '@/data/mock';
import { productColumns, customerColumns, supplierColumns, userColumns } from '@/data/columns';

const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  
  // State management for mock data
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [users, setUsers] = useState<User[]>(mockUsers);
  
  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'pos':
        return <PointOfSale products={products} setProducts={setProducts} customers={customers} setCustomers={setCustomers} />;
      case 'products':
        return <CrudPage title="Productos" data={products} columns={productColumns} setData={setProducts} itemSchema={{ name: '', category: '', laboratory: '', price: 0, stock: 0, expiryDate: '', lot: '' }} />;
      case 'customers':
        return <CrudPage title="Clientes" data={customers} columns={customerColumns} setData={setCustomers} itemSchema={{ name: '', rfc: '', phone: '', email: '' }} />;
      case 'suppliers':
        return <CrudPage title="Proveedores" data={suppliers} columns={supplierColumns} setData={setSuppliers} itemSchema={{ name: '', contactPerson: '', phone: '', email: '' }} />;
      case 'users':
        return <CrudPage title="Usuarios" data={users} columns={userColumns} setData={setUsers} itemSchema={{ name: '', email: '', role: 'cajero' }} />;
      case 'settings':
        return <Settings />;
      default:
        return <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-black/90">Página en construcción</h1>
            <p className="mt-2 text-slate-800">La funcionalidad para '{activeView}' aún no ha sido implementada.</p>
          </div>;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Layout activeView={activeView} setActiveView={setActiveView} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default HomePage;
