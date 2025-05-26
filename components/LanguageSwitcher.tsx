// components/LanguageSwitcher.tsx
import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { availableLanguages } from '../translations';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="relative">
      <label htmlFor="language-select" className="sr-only">{t('languageSwitcher.label')}</label>
      <select
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
        className="bg-slate-700 text-slate-200 border border-slate-600 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out appearance-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
      >
        {availableLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {t(lang.nameKey)}
          </option>
        ))}
      </select>
    </div>
  );
};
