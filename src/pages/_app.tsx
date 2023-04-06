import '@/styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import { api } from '@/utils/api';
import { MantineProvider } from '@mantine/core';

import type { Session } from 'next-auth';
import type { AppType } from 'next/app';
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Comet Details</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colors: {
            bg: ["#eeecde"],
            brand: ["#16645f"]
          },
          loader: 'dots',
          colorScheme: 'light',
        }}
      >
        <SessionProvider session={session}>
          <Toaster />
          <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </>

  );
};

export default api.withTRPC(MyApp);
