import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const LoginWindowContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoginWindowContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.sm};
`

export const LoginWindowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${maskedTheme.spacing.md};
  border-radius: ${maskedTheme.radius.md};
  background-color: ${maskedTheme.colors.baseBlue.light30};
  border: 1px solid ${maskedTheme.colors.baseBlue.base};
`

export const LoginWindowHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${maskedTheme.spacing.md};
`

export const SvgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${maskedTheme.spacing.sm};
`

export const LoginWindowBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.lg} 0;
  label {
    color: ${maskedTheme.colors.baseBlue.base};
  }
`

export const LoginWindowFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${maskedTheme.spacing.md};

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: ${maskedTheme.spacing.sm};
  }
`
