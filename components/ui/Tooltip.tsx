import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group flex items-center">
      {children}
      <div className="absolute left-14 w-auto p-2 m-2 min-w-max rounded-md shadow-md text-white bg-slate-800 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100 z-10">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
