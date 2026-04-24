import { transitions } from '@/styles/MaskedAnimations/animations/transitions'
import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const ServiceCardContainer = styled.div``

export const ServiceCardContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${maskedTheme.spacing.md};
  border-radius: ${maskedTheme.radius.md};
  gap: ${maskedTheme.spacing.md};
  background-color: ${maskedTheme.colors.baseBlue.dark04};
  border: 1px solid ${maskedTheme.colors.baseBlue.base};
  ${transitions.default}

  &:hover {
    cursor: pointer;
    scale: 1.01;
    box-shadow: ${maskedTheme.boxShadow.lg};
  }
`

export const ServiceCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
`

export const ServiceCardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
`

export const ServiceCardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: ${maskedTheme.spacing.md};
  border-top: 1px solid ${maskedTheme.colors.baseBlack.dark40};
  padding-top: ${maskedTheme.spacing.md};
`
