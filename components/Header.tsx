import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-between h-20 px-6 bg-black/10 backdrop-blur-lg border-b border-white/10 shrink-0">
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <div className="flex items-center space-x-4">
        {/* User Info */}
        <div className="text-right">
          <p className="font-semibold text-white">Admin User</p>
          <p className="text-sm text-slate-400">Administrador</p>
        </div>
        <Image
          src="https://picsum.photos/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
          width={40}
          height={40}
        />
      </div>
    </header>
  );
};

export default Header;
