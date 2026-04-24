import { continuousAnimations } from '@/styles/MaskedAnimations/animations/continuousAnimations'
import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const ConfirmedContainer = styled.div``

export const ConfirmedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.lg};
  padding: ${maskedTheme.spacing.sm};
`

export const ConfirmedHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${maskedTheme.spacing.md};

  svg {
    color: ${maskedTheme.colors.baseGreen.dark20};
    font-size: 120px;
  }
`

export const SvgDiv = styled.div`
  background-color: ${maskedTheme.colors.baseGreen.dark02};
  border-radius: 50%;
  padding: ${maskedTheme.spacing.xl};
  ${continuousAnimations.pulse}
`

export const ConfirmedDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.sm};
  padding: ${maskedTheme.spacing.md};
  background-color: ${maskedTheme.colors.baseBlue.dark04};
  border-radius: ${maskedTheme.radius.md};
  border: 1px solid ${maskedTheme.colors.baseBlue.base};
`

export const ConfirmedServices = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.sm};
  padding: ${maskedTheme.spacing.md} 0;
  border-top: 1px solid ${maskedTheme.colors.baseBlue.dark30};
  border-bottom: 1px solid ${maskedTheme.colors.baseBlue.dark30};
`

export const ConfirmationTotal = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.sm};
  padding: ${maskedTheme.spacing.md} 0;
`

export const ConfirmedRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${maskedTheme.spacing.sm};

  h4 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
  }
`

export const ConfirmedDiv = styled.div`
  display: flex;
  gap: ${maskedTheme.spacing.sm};
  padding: ${maskedTheme.spacing.md} 0;
`

export const ConfirmedDivHeader = styled.div`
  display: flex;
  align-items: start;
  gap: ${maskedTheme.spacing.sm};

  svg {
    color: ${maskedTheme.colors.baseBlue.dark30};
    font-size: ${maskedTheme.fontSize.xl};
  }
`

export const ConfirmedDivItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.sm};
`
