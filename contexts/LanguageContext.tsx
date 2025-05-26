// contexts/LanguageContext.tsx
import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { translations, TranslationKey, availableLanguages } from '../translations';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: TranslationKey, replacements?: Record<string, string | number>) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(availableLanguages[0].code); // Default to English

  const setLanguage = useCallback((langCode: string) => {
    if (translations[langCode]) {
      setLanguageState(langCode);
    } else {
      console.warn(`Language code "${langCode}" not found. Defaulting to 'en'.`);
      setLanguageState('en');
    }
  }, []);

  const t = useCallback((key: TranslationKey, replacements?: Record<string, string | number>): string => {
    let translation = translations[language]?.[key] || translations.en[key] || key;
    if (replacements) {
      Object.keys(replacements).forEach(placeholder => {
        const regex = new RegExp(`{${placeholder}}`, 'g');
        translation = translation.replace(regex, String(replacements[placeholder]));
      });
    }
    return translation;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
