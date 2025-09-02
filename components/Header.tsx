import React from 'react';
import Image from 'next/image';
import { Money } from '@/components/icons/SidebarIcons';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="shadow-lg" >
      <header className="glass-container flex items-center justify-between h-25 px-6   shrink-0"   >
        {/* Encabezado con título y avatar de usuario */}

    <div>

      <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
      <p className="text-black/50 text-lg drop-shadow">Bienvenido a tu panel de control</p>
    </div>

    <div className="flex items-center space-x-4 ">

      <button className="glass-container flex  px-4 py-2 bg-green-400/50 shadow-md text-white rounded-md text-sm gap-x-3">
          <Money className="h-6 w-6" />
              Caja: $1,250.00
        </button>

      {/* Avatar de usuario y nombre */}
      <div className="glass-container flex items-center space-x-4 p-2 shadow-md bg-purple-400/10 rounded-md hover:bg-purple-400/30">
        {/* User Info */}
        <div className="text-right  ">
          <p className="font-semibold text-black/70">Carolina</p>
          <p className="text-sm text-black/50">Administrador</p>
        </div>
        <Image
          src="./placeholder-user.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
          width={40}
          height={40}
        />
      </div>
    </div>
    </header>
    </div>
  );
};

export default Header;
