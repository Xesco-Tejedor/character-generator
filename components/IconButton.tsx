
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyle = "px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out flex items-center justify-center space-x-2 text-base";
  
  const variantStyles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
    secondary: "bg-slate-600 hover:bg-slate-700 text-white focus:ring-slate-500",
  };

  return (
    <button
      type="button"
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{children}</span>
    </button>
  );
};
