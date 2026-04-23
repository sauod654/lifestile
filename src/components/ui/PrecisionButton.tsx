import React, { ButtonHTMLAttributes } from 'react';

interface PrecisionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export const PrecisionButton: React.FC<PrecisionButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  let baseClass = 'primary-gradient-btn';
  
  if (variant === 'secondary') {
    baseClass = 'bg-surface-container-highest text-on-surface hover:brightness-95 border-none rounded-md px-6 py-3 transition-all';
  } else if (variant === 'tertiary') {
    baseClass = 'bg-transparent text-tertiary hover:underline px-4 py-2';
  }

  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
