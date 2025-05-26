
import React from 'react';

interface SelectOption<T extends string | number> {
  value: T;
  label: string;
}

interface SelectFieldProps<T extends string | number> {
  label: string;
  id: string;
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  className?: string;
  required?: boolean;
}

// Changed React.ReactElement to JSX.Element as component return type
export const SelectField = <T extends string | number,>(
  { label, id, value, onChange, options, className = '', required = false }: SelectFieldProps<T>
): JSX.Element => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        required={required}
        className={`w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-slate-700 bg-slate-50 appearance-none ${className}`}
        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
