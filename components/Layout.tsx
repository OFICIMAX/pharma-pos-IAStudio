import React from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { ViewType } from '@/types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, onLogout }) => {
  const viewTitles: Record<ViewType, string> = {
    dashboard: 'Dashboard',
    pos: 'Punto de Venta',
    products: 'Gestión de Productos',
    customers: 'Gestión de Clientes',
    suppliers: 'Gestión de Proveedores',
    users: 'Gestión de Usuarios',
    billing: 'Facturación',
    quotes: 'Cotizaciones',
    reports: 'Reportes Financieros',
    settings: 'Configuraciones',
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={onLogout} />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header title={viewTitles[activeView]} />
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
