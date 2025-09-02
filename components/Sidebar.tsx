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
       <Tooltip text={item.label}>{/* Tooltip personalizado -  botones menu sidebar*/}
       {/* Todos Botónes de navegación del sidebar menos cerrar sesion */}
       {/* Cambia el activeView al hacer clic  - active estilo de botones pulsados*/}
        <button 
          onClick={() => setActiveView(item.id as ViewType)}
          className={`glass-container flex items-center justify-center w-14 h-14 shadow-xl rounded-lg transition-all duration-200 ${


            isActive ? 'bg-purple-400 text-white ' 
            : 'text-black/70 bg-white/80  hover:text-black/90 hover:bg-purple-300'}`}>



          <Icon className="h-6 w-6" />
        </button>
      </Tooltip>
    );
  }


  {/* Barra lateral con navegación y botón de cerrar sesión */}
  return (
    
    <aside className="relative flex flex-col items-center w-[80px] glass-sidebar shadow-xl py-4    rounded-lg" >


      <div className="p-1 mb-5"  >
         {/* Asegúrate de tener un logo en public/logoapp.png */}
         <Image src="/logoapp.png" alt="Logo de la App" width={65} height={65} />
      </div>
      
      <nav className="flex flex-col items-center space-y-2 ">
        {navItems.map(item => <NavItem key={item.id} item={item} />)}
      </nav>

      <div className="mt-auto ">
        
        {/* Tooltip personalizado - botón cerrar sesión */}
         <Tooltip text="Cerrar Sesión">


        {/* Contenedor del botón cerrar sesión */}
          <div className="p-2  border-t border-white border-opacity-20">

            {/* Solo Botón de cerrar sesión      */}
            <button
            onClick={onLogout}
            className="glass-container flex items-center justify-center w-14 h-14 rounded-lg text-black/70 bg-white/80 hover:bg-purple-300 hover:text-black/90  shadow-2xl transition-colors mt-3 duration-200"
            >
            <LogoutIcon className="h-6 w-6" />
            
            </button>
          </div>
        </Tooltip>
      </div>
    </aside>
  );
};

export default Sidebar;
