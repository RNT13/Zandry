import { continuousAnimations } from '@/styles/MaskedAnimations/animations/continuousAnimations'
import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const EnterpriseContainer = styled.div`
  width: 100%;
  height: 100%;

  .openDot {
    border-radius: ${maskedTheme.radius.lg};
    padding: ${maskedTheme.spacing.sm};
    background-color: green;
    ${continuousAnimations.pulse}
  }

  .closedDot {
    border-radius: ${maskedTheme.radius.lg};
    padding: ${maskedTheme.spacing.sm};
    background-color: red;
    ${continuousAnimations.pulse}
  }

  .openTag {
    border-radius: ${maskedTheme.radius.lg};
    padding: ${maskedTheme.spacing.xs} ${maskedTheme.spacing.sm};
    background-color: ${maskedTheme.colors.baseGreen.dark04};
  }

  .closedTag {
    border-radius: ${maskedTheme.radius.lg};
    padding: ${maskedTheme.spacing.xs} ${maskedTheme.spacing.sm};
    background-color: ${maskedTheme.colors.baseRed.dark04};
  }
`

export const EnterpriseBanner = styled.div`
  width: 100%;
  height: 200px;
  background-color: blue;
  border-radius: 20px 20px 0 0;
`

export const AbsoluteDiv = styled.div`
  position: absolute;
  top: 135px;
  padding: ${maskedTheme.spacing.md};
`

export const EnterpriseContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
`

export const EnterpriseAvatar = styled.div`
  width: 100px;
  height: 100px;
  background-color: yellow;
  border-radius: ${maskedTheme.radius.md};
  margin-bottom: ${maskedTheme.spacing.md};
  z-index: 1;
`

export const EnterpriseInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
`

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${maskedTheme.spacing.md};
`

export const EnterpriseTag = styled.div`
  display: flex;
  align-items: center;

  background-color: ${maskedTheme.colors.baseBlue.dark04};
  border-radius: ${maskedTheme.radius.lg};
  padding: ${maskedTheme.spacing.sm} ${maskedTheme.spacing.md};

  gap: ${maskedTheme.spacing.md};
`

export const EnterpriseTime = styled.div`
  display: flex;
  align-items: center;
  gap: ${maskedTheme.spacing.md};
  background-color: ${maskedTheme.colors.baseBlue.dark04};
  border-radius: ${maskedTheme.radius.md};
  padding: ${maskedTheme.spacing.md};
`

export const EnterpriseInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${maskedTheme.spacing.md};
  background-color: ${maskedTheme.colors.baseBlue.dark04};
  border-radius: ${maskedTheme.radius.md};
  padding: ${maskedTheme.spacing.md};

  p {
    display: flex;
    align-items: center;
    gap: ${maskedTheme.spacing.md};
  }
`
