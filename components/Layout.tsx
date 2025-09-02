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
    dashboard: 'Dashboard Financiero',
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
    
  <div className=" absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background/0  bg-[#81abb6]/1  p-[15px]  "> {/* Fondo de pantalla y contenedor principal */}
    
    {/* Contenedor principal contiene sidebar + encabezado + dashboard*/}
    <div className="contentWrapper w-full h-full     rounded-lg     flex gap-5 ">
      
      <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={onLogout} />
      
      {/* Main Area contiene al encabezado y dashboard*/}
      <main className="dashboardContainer flex-1     max-h-full  overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-0 py-0   rounded-lg " >
        
        <Header title={viewTitles[activeView]} />
        
        {/* Area contenido solo dashboard sin encabezado */}
        <div className="flex-1 overflow-y-auto  py-6 bg-white/0">
        
          {children}
        
        </div>
      </main>
    </div>
  </div>
  );
};

export default Layout;
