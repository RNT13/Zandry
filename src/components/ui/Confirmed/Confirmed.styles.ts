import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const ConfirmedContainer = styled.div``

export const ConfirmedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.lg};
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
  padding: ${maskedTheme.spacing.md};
  border-top: 1px solid ${maskedTheme.colors.baseBlue.dark04};
  border-bottom: 1px solid ${maskedTheme.colors.baseBlue.dark04};
`

export const ConfirmationTotal = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.sm};
  padding: ${maskedTheme.spacing.md};
`

export const ConfirmedRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${maskedTheme.spacing.sm};
`

export const ConfirmedDiv = styled.div`
  display: flex;
  gap: ${maskedTheme.spacing.sm};
  padding: ${maskedTheme.spacing.md};
`

export const ConfirmedDivHeader = styled.div`
  display: flex;
  align-items: start;
  gap: ${maskedTheme.spacing.sm};

  svg {
    color: ${maskedTheme.colors.baseBlue.dark20};
    font-size: ${maskedTheme.fontSize.xl};
  }
`

export const ConfirmedDivItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.sm};
`
