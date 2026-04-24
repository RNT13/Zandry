
'use client'

// 🎨 GLOBAL STYLES - Estilos globais com Styled Components

import styled, { createGlobalStyle } from 'styled-components';
import { transitions } from './MaskedAnimations/animations/transitions';
import { maskedTheme, media } from './MaskedThemes/MaskedThemes';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @property --gold-angle {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
  }

  @property --silver-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: ${maskedTheme.colors.baseBlue.light40};
    color: ${maskedTheme.colors.baseBlack.dark40};
    font-family: var(--roboto-font);
  }

  .container {
    max-width: 600px;
    padding: ${maskedTheme.spacing.xl} 0;
    margin: 0 auto;
    width: 100%;

    ${media.mobile} {
      padding: 0;
    }
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: ${maskedTheme.spacing.md};
`

export const OverlayBlur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  z-index: 100;
`

export const OverlayDarck = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
`

export const TitleH2 = styled.h2`
  display: flex;
  align-items: center;
  gap: ${maskedTheme.spacing.sm};
  font-size: ${maskedTheme.fontSize.xl};
  font-weight: 600;
  color: ${maskedTheme.colors.baseBlue.dark30};
  ${transitions.default};
`

export const TitleH3 = styled.h3`
  display: flex;
  align-items: center;
  gap: ${maskedTheme.spacing.sm};
  font-size: ${maskedTheme.fontSize.lg};
  font-weight: 600;
  color: ${maskedTheme.colors.baseBlue.dark30};
  ${transitions.default};
`

export const MinorTextH4 = styled.h4`
  display: flex;
  align-items: center;
  gap: ${maskedTheme.spacing.sm};
  font-size: ${maskedTheme.fontSize.sm};
  font-weight: 300;
  color: ${maskedTheme.colors.baseBlue.dark30};
  ${transitions.default};
`
