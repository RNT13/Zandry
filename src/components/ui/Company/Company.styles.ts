import { continuousAnimations } from '@/styles/MaskedAnimations/animations/continuousAnimations'
import { maskedTheme, media } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const CompanyContainer = styled.div`
  width: 100%;
  height: 100%;

  .openDot {
    border-radius: ${maskedTheme.radius.lg};
    padding: ${maskedTheme.spacing.sm};
    background-color: green;
    ${continuousAnimations.continuousPulse}
  }

  .closedDot {
    border-radius: ${maskedTheme.radius.lg};
    padding: ${maskedTheme.spacing.sm};
    background-color: red;
    ${continuousAnimations.continuousPulse}
  }

  .openTag {
    border-radius: ${maskedTheme.radius.lg};
    padding: ${maskedTheme.spacing.xs} ${maskedTheme.spacing.sm};
    background-color: ${maskedTheme.colors.baseGreen.light30};
  }

  .closedTag {
    border-radius: ${maskedTheme.radius.lg};
    padding: ${maskedTheme.spacing.xs} ${maskedTheme.spacing.sm};
    background-color: ${maskedTheme.colors.baseRed.light30};
  }
`

export const CompanyBanner = styled.div`
  width: 100%;
  height: 200px;
  background-color: blue;
  border-radius: 20px 20px 0 0;

  ${media.mobile} {
    border-radius: 0;
  }
`

export const LoginButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`

export const AbsoluteDiv = styled.div`
  width: 100%;
  position: absolute;
  top: 135px;
  padding: ${maskedTheme.spacing.sm};
`

export const CompanyContent = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
`

export const CompanyAvatar = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${maskedTheme.colors.baseBlue.light30};
  border-radius: ${maskedTheme.radius.md};
  margin-bottom: ${maskedTheme.spacing.md};
  color: ${maskedTheme.colors.baseBlue.light40};
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
`

export const CompanyInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
`

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${maskedTheme.spacing.md};

  button {
    color: ${maskedTheme.colors.baseBlue.dark40};
  }
`

export const CompanyTag = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${maskedTheme.colors.baseBlue.light30};
  border-radius: ${maskedTheme.radius.lg};
  padding: ${maskedTheme.spacing.sm} ${maskedTheme.spacing.md};
  gap: ${maskedTheme.spacing.md};

  ${media.mobile} {
    h3 {
      width: 100%;
    }
  }
`

export const CompanyTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${maskedTheme.spacing.md};
  background-color: ${maskedTheme.colors.baseBlue.light30};
  border-radius: ${maskedTheme.radius.md};
  padding: ${maskedTheme.spacing.md};

  div {
    display: flex;
    align-items: center;
    gap: ${maskedTheme.spacing.md};
  }
`

export const CompanyInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${maskedTheme.spacing.md};
  background-color: ${maskedTheme.colors.baseBlue.light30};
  border-radius: ${maskedTheme.radius.md};
  padding: ${maskedTheme.spacing.md};

  p {
    display: flex;
    align-items: center;
    gap: ${maskedTheme.spacing.md};
  }

  button {
    color: ${maskedTheme.colors.baseBlue.dark30};
  }
`
