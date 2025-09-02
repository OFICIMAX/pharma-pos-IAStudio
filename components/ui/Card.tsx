import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className="glass-card p-10 shadow-2xl  ${className}">
      {children}
    </div>
  );
};

export default Card;
