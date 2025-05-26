
import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'textarea';
  placeholder?: string;
  rows?: number;
  className?: string;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  rows = 3,
  className = '',
  required = false,
}) => {
  const commonProps = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    placeholder,
    required,
    className: `w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-slate-700 placeholder-slate-400 bg-slate-50 ${className}`,
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea {...commonProps} rows={rows}></textarea>
      ) : (
        <input type={type} {...commonProps} />
      )}
    </div>
  );
};
