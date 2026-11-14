import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { dictionaries, type Dictionary, type Locale } from './dictionaries';

interface I18nValue {
  locale: Locale;
  t: Dictionary;
}

const I18nContext = createContext<I18nValue>({ locale: 'en', t: dictionaries.en });

export function I18nProvider({ locale = 'en', children }: { locale?: Locale; children: ReactNode }) {
  const value = useMemo(() => ({ locale, t: dictionaries[locale] }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useI18n = () => useContext(I18nContext);
