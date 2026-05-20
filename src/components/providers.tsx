'use client'


import { AuthBootstrap } from '@/redux/auth/AuthBootstrap';
import { store } from '@/redux/store';
import { AnimationProvider } from '@/styles/MaskedAnimations/AnimationProvider';
import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={maskedTheme}>
        <AnimationProvider>
          <AuthBootstrap>
            {children}
          </AuthBootstrap>
        </AnimationProvider>
      </ThemeProvider>
    </Provider>
  )
}

