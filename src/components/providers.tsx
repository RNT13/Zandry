'use client'


import { persistor, store } from '@/redux/store';
import { AnimationProvider } from '@/styles/MaskedAnimations/AnimationProvider';
import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={maskedTheme}>
          <AnimationProvider>
            {children}
          </AnimationProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

