import React from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { SpeedInsights } from '@vercel/speed-insights/next';
import clsx from 'clsx';

import '@styles/globals.css';

import Toaster from '@common/components/toast/Toaster/Toaster.client';

import WebVitals from '@app/_components/web-vitals';

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
  globalModal,
}: Readonly<{
  children: React.ReactNode;
  globalModal: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className={clsx('scrollbar-page flex min-h-screen flex-col', pretendard.variable)}>
        <WebVitals />
        <SpeedInsights />
        <QueryClientProviders>
          <div id="modal" />
          {children}
          {globalModal}
          <Toaster />
        </QueryClientProviders>
      </body>
    </html>
  );
};

export default RootLayout;
