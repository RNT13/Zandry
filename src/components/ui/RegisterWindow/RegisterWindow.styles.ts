import { maskedTheme, media } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const RegisterWindowContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const RegisterWindowContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.sm};
`

export const RegisterWindowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${maskedTheme.spacing.md};
  border-radius: ${maskedTheme.radius.md};
  background-color: ${maskedTheme.colors.baseBlue.light30};
  border: 1px solid ${maskedTheme.colors.baseBlue.base};

  ${media.mobile} {
    gap: ${maskedTheme.spacing.sm};
    padding: ${maskedTheme.spacing.sm};
  }
`

export const RegisterWindowHeader = styled.div`
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
  margin-top: ${maskedTheme.spacing.lg};
  padding: 0 ${maskedTheme.spacing.md};

  span {
    padding: 20px;
    background-image: linear-gradient(90deg, ${maskedTheme.colors.baseBlue.light}, ${maskedTheme.colors.baseBlue.dark});
    border-radius: 50%;

    svg {
      color: ${maskedTheme.colors.baseBlue.light30};
      font-size: 50px;
    }
  }
`

export const RegisterWindowBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.lg} 0;
  label {
    color: ${maskedTheme.colors.baseBlue.base};
  }
`

export const RegisterRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: ${maskedTheme.spacing.sm};
  padding: ${maskedTheme.spacing.sm} 10px;
  background-color: ${maskedTheme.colors.baseBlue.light40};
  border-radius: ${maskedTheme.radius.md};
`

export const RegisterColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
  margin-bottom: 20px;
  padding: ${maskedTheme.spacing.sm} 10px;
  background-color: ${maskedTheme.colors.baseBlue.light40};
  border-radius: ${maskedTheme.radius.md};
`

export const RegisterWindowFooter = styled.div`
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

export const SelectServicesDiv = styled.div`
  display: flex;
  gap: ${maskedTheme.spacing.sm};
  padding: ${maskedTheme.spacing.sm};
  border-radius: ${maskedTheme.radius.md};
  background: ${maskedTheme.colors.baseBlue.light30};
  border: 1px solid ${maskedTheme.colors.baseBlue.light08};
`
