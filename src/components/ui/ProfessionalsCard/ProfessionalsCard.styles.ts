import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const ProfessionalsCardContainer = styled.div``

export const ProfessionalsCardContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${maskedTheme.spacing.md};
  border-radius: ${maskedTheme.radius.md};
  gap: ${maskedTheme.spacing.md};
  background-color: ${maskedTheme.colors.baseBlue.dark04};
  border: 1px solid ${maskedTheme.colors.baseBlue.base};
`

export const ProfessionalsCardAvatar = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${maskedTheme.colors.baseBlue.dark08};
  border-radius: 50%;

  h2 {
    color: ${maskedTheme.colors.baseBlue.light30};
  }

  svg {
    color: ${maskedTheme.colors.baseBlue.light30};
    width: 35px;
    height: 35px;
  }
`

export const ProfessionalsCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.sm};
`
