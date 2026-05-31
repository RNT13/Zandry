import { continuousAnimations } from '@/styles/MaskedAnimations/animations/continuousAnimations'
import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

type props = {
  $color: 'loading' | 'success' | 'error' | 'missing-token'
}

export const VerifyContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${maskedTheme.spacing.lg};
  padding: 0;
`

export const VerifyContent = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${maskedTheme.spacing.lg};
  padding: ${maskedTheme.spacing.sm};
`
export const SvgDiv = styled.div<props>`
  background-color: ${props => {
    switch (props.$color) {
      case 'loading':
        return maskedTheme.colors.baseBlue.light30
      case 'success':
        return maskedTheme.colors.baseGreen.light30
      case 'error':
        return maskedTheme.colors.baseRed.light30
      case 'missing-token':
        return maskedTheme.colors.baseYellow.light30
    }
  }};

  border-radius: 50%;
  padding: ${maskedTheme.spacing.xl};
  ${continuousAnimations.continuousPulse}

  svg {
    color: ${props => {
      switch (props.$color) {
        case 'loading':
          return maskedTheme.colors.baseBlue.base
        case 'success':
          return maskedTheme.colors.baseGreen.base
        case 'error':
          return maskedTheme.colors.baseRed.base
        case 'missing-token':
          return maskedTheme.colors.baseYellow.dark20
      }
    }};

    font-size: 60px;
  }
`
