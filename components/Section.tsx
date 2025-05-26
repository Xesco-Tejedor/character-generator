
import React from 'react';

interface SectionProps {
  title: string; // Title is expected to be pre-translated
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, icon, children, className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-lg mb-8 ${className}`}>
      <div className="flex items-center mb-4">
        {icon && <span className="mr-3 text-indigo-600 w-6 h-6">{icon}</span>}
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};
