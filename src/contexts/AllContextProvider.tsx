import SwrProvider from '@/contexts/SwrProvider';
import { SessionProvider } from 'next-auth/react';
import { GlobalContextHandler } from '@/contexts/GlobalContext';
import { ReactNode } from 'react';
import { MuiThemeProvider } from '@/contexts/MuiThemeProvider';
import { getCookiePreferences } from '@/lib/cookie';

export default async function AllContextProvider({ children }: { children: ReactNode }) {
  const cookiePreferences = await getCookiePreferences();

  return (
    <GlobalContextHandler cookiePreferences={cookiePreferences}>
      <SwrProvider>
        <SessionProvider>
          <MuiThemeProvider>{children}</MuiThemeProvider>
        </SessionProvider>
      </SwrProvider>
    </GlobalContextHandler>
  );
}
