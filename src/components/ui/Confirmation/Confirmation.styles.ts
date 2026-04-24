import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const ConfirmationContainer = styled.div``

export const ConfirmationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.sm};
`

export const ConfirmationName = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.md} 0;

  input {
    height: 55px;
  }
`

export const ConfirmationPhone = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.md} 0;

  input {
    height: 55px;
  }
`

export const ConfirmationInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.md};
  background-color: ${maskedTheme.colors.baseBlue.dark04};
  border-radius: ${maskedTheme.radius.md};
  border: 1px solid ${maskedTheme.colors.baseBlue.base};
  margin-bottom: ${maskedTheme.spacing.lg};
`

export const ConfirmationRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${maskedTheme.spacing.md};
`

export const TotalDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${maskedTheme.spacing.md};
  border-top: 1px solid ${maskedTheme.colors.baseBlue.dark30};
  padding-top: ${maskedTheme.spacing.md};
`
