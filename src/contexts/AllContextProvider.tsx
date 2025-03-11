import SwrProvider from "@/contexts/SwrProvider";
import {SessionProvider} from "next-auth/react";
import {GlobalContextHandler} from "@/contexts/GlobalContext";
import {ReactNode} from "react";
import {MuiThemeProvider} from "@/contexts/MuiThemeProvider";

export default function AllContextProvider({ children }: { children: ReactNode }) {
  return (
        <GlobalContextHandler>
          <SwrProvider>
            <SessionProvider>
              <MuiThemeProvider>
                {children}
              </MuiThemeProvider>
            </SessionProvider>
          </SwrProvider>
        </GlobalContextHandler>
  );
}
