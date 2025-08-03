import type { Metadata } from 'next';
import localFont from 'next/font/local';

import clsx from 'clsx';

import '@styles/globals.css';

import Toaster from '@common/components/toast/Toaster/Toaster.client';

import QueryClientProviders from './query-client-providers';

const pretendard = localFont({
  src: '../assets/fonts/pretendard/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
});

export const metadata: Metadata = {
  title: 'HaRu',
  description: 'Team HaRu Website',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <QueryClientProviders>
        <body
          className={clsx(
            'scrollbar-page flex min-h-screen flex-col overflow-y-auto',
            pretendard.variable,
          )}
        >
          {children}
          <div id="modal" />
          <Toaster />
        </body>
      </QueryClientProviders>
    </html>
  );
};

export default RootLayout;
