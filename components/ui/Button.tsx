import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border-1 border-white/70' ;

  const variantClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500',
    secondary: 'bg-slate-600 hover:bg-slate-500 focus:ring-slate-500',
    danger: 'bg-red-600 hover:bg-red-500 focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-500 focus:ring-green-500',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
