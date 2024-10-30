'use client';

import { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { de } from 'date-fns/locale/de';
import { enUS } from 'date-fns/locale/en-US';
import i18n from '../../i18n';

const localeMap = {
  de: de,
  en: enUS,
};

const ClientLocaleProvider = () => {
  const { lang } = useTranslation('common');

  useEffect(() => {
    // Register locales only on client side
    Object.entries(localeMap).forEach(([key, value]) => {
      try {
        registerLocale(key, value);
      } catch (error) {
        console.error(`Failed to register locale ${key}:`, error);
      }
    });

    // Set default locale
    const safeLocale = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
    try {
      setDefaultLocale(safeLocale);
    } catch (error) {
      console.error('Failed to set default locale:', error);
    }
  }, [lang]);

  return null;
};

export default ClientLocaleProvider;
