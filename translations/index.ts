// translations/index.ts
import { en as englishTranslations, AppTranslations } from './en';
import { es as spanishTranslations } from './es';

export type TranslationKey = keyof AppTranslations;

export const translations: Record<string, AppTranslations> = {
  en: englishTranslations,
  es: spanishTranslations,
};

export const availableLanguages = [
  { code: 'en', nameKey: 'language.en' as TranslationKey },
  { code: 'es', nameKey: 'language.es' as TranslationKey },
];
