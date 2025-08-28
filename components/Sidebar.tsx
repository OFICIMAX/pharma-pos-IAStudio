import React from 'react';
import Image from 'next/image';
import { ViewType } from '@/types';
import Tooltip from '@/components/ui/Tooltip';
import { DashboardIcon, PosIcon, ProductIcon, CustomerIcon, SupplierIcon, UserIcon, BillingIcon, QuoteIcon, ReportIcon, SettingsIcon, LogoutIcon } from '@/components/icons/SidebarIcons';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout }) => {

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'pos', label: 'Punto de Venta', icon: PosIcon },
    { id: 'products', label: 'Productos', icon: ProductIcon },
    { id: 'customers', label: 'Clientes', icon: CustomerIcon },
    { id: 'suppliers', label: 'Proveedores', icon: SupplierIcon },
    { id: 'users', label: 'Usuarios', icon: UserIcon },
    { id: 'billing', label: 'Facturación', icon: BillingIcon },
    { id: 'quotes', label: 'Cotizaciones', icon: QuoteIcon },
    { id: 'reports', label: 'Reportes', icon: ReportIcon },
    { id: 'settings', label: 'Configuraciones', icon: SettingsIcon },
  ];

  const NavItem: React.FC<{item: typeof navItems[0]}> = ({ item }) => {
    const isActive = activeView === item.id;
    const Icon = item.icon;
    return (
       <Tooltip text={item.label}>
        <button
          onClick={() => setActiveView(item.id as ViewType)}
          className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 ${
            isActive ? 'bg-white/20 text-white' : 'text-slate-200 hover:bg-white/10'
          }`}
        >
          <Icon className="h-6 w-6" />
        </button>
      </Tooltip>
    );
  }

  return (
    <aside className="relative flex flex-col items-center w-20 h-screen py-6 bg-[rgb(232,212,255)]/10 backdrop-blur-2xl border-r border-white/10">
      <div className="p-2 mb-6">
         {/* Asegúrate de tener un logo en public/logoapp.png */}
         <Image src="/logoapp.png" alt="Logo de la App" width={40} height={40} />
      </div>
      
      <nav className="flex flex-col items-center space-y-3">
        {navItems.map(item => <NavItem key={item.id} item={item} />)}
      </nav>

      <div className="mt-auto">
         <Tooltip text="Cerrar Sesión">
            <button
            onClick={onLogout}
            className="flex items-center justify-center w-12 h-12 rounded-lg text-slate-300 hover:bg-red-500/50 hover:text-white transition-colors duration-200"
            >
            <LogoutIcon className="h-6 w-6" />
            </button>
        </Tooltip>
      </div>
    </aside>
  );
};

export default Sidebar;
