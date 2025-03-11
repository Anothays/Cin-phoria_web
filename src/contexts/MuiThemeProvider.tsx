'use client';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { ReactNode } from 'react';
import colors from '@/styles/_colors.module.scss';

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primaryColor,
    },
  },
  typography: {
    fontFamily: '',
  },
});

export function MuiThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
