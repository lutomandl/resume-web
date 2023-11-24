import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LanguageEnum } from '../types';
import { TranslationObject, translations } from './translations';

interface TranslationsContext {
  language: LanguageEnum;
  changeLanguage: (newLanguage: LanguageEnum) => void;
  translations: TranslationObject;
}

const context = React.createContext({} as TranslationsContext);

export function useTranslationsContext() {
  return useContext(context);
}

interface TranslationsProviderProps {
  children: ReactNode;
}

export default function TranslationsProvider({
  children,
}: TranslationsProviderProps) {
  const [language, setLanguage] = useState<LanguageEnum>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage as LanguageEnum);
    }
  }, []);

  const changeLanguage = (newLanguage: LanguageEnum) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const contextValue = useMemo(
    () => ({
      language,
      changeLanguage,
      translations: translations[language],
    }),
    [language]
  );

  return <context.Provider value={contextValue}>{children}</context.Provider>;
}
