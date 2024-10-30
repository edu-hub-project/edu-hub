import { Providers } from './providers';
import { Metadata, Viewport } from 'next';
import useTranslation from 'next-translate/useTranslation';
import log from 'loglevel';

import FacebookPixel from '../components/common/FacebookPixel';
import Cookiebot from '../components/common/Cookiebot';
import ClientLocaleProvider from '../components/common/ClientLocaleProvider';

import '../styles/globals.css';
import i18n from '../i18n';

export const metadata: Metadata = {
  title: 'EduHub | opencampus.sh',
  description: 'EduHub by opencampus.sh',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'production') {
  log.setLevel('warn'); // Show only warnings and errors in production.
} else {
  log.setLevel('debug'); // Show all log levels in development.
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { lang: detectedLang } = useTranslation('common');
  const lang = detectedLang || i18n.defaultLocale;

  log.debug('Current lang:', lang);

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <FacebookPixel />
        <Cookiebot />
      </head>
      <body>
        <ClientLocaleProvider />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
