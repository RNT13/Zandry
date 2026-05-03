import { continuousAnimations } from '@/styles/MaskedAnimations/animations/continuousAnimations'
import { transitions } from '@/styles/MaskedAnimations/animations/transitions'
import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

type PlanCardProps = {
  $active?: boolean
}

export const PlanCardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${maskedTheme.spacing.lg};
`

export const PlanCardsContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.sm};
`

export const PlanGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const PlanCardBase = styled.div<PlanCardProps>`
  width: 100%;
  padding: 22px;
  border-radius: 18px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.sm};
  ${transitions.default}
  font-weight: 600;
  ${({ $active }) => ($active ? maskedTheme.boxShadow.xl : maskedTheme.boxShadow.xs)};
  transform: scale(${({ $active }) => ($active ? 1.03 : 1)});
  opacity: ${({ $active }) => ($active ? 1 : 0.7)};

  &:hover {
    ${maskedTheme.boxShadow.lg};
  }
`

export const PlanCardIcon = styled.span<PlanCardProps>`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: ${maskedTheme.spacing.sm};
  border-radius: ${maskedTheme.radius.md};
  background-color: ${maskedTheme.colors.baseBlue.light};

  svg {
    color: ${maskedTheme.colors.baseBlue.base};
    font-size: 32px;
  }
`

export const PlanCardFree = styled(PlanCardBase)`
  background-color: ${maskedTheme.colors.baseBlack.light30};
  border: 2px solid ${maskedTheme.colors.baseBlack.dark20};

  h2,
  h3,
  h4 {
    color: ${maskedTheme.colors.baseBlack.dark30};
  }

  svg {
    color: ${maskedTheme.colors.baseBlack.dark20};
  }
`

export const PlanIconFree = styled(PlanCardIcon)`
  background-color: ${maskedTheme.colors.baseBlack.dark20};

  svg {
    color: ${maskedTheme.colors.baseBlack.light30};
  }
`

export const PlanCardStarter = styled(PlanCardBase)`
  background-color: ${maskedTheme.colors.baseYellow.light30};
  border: 2px solid ${maskedTheme.colors.baseYellow.dark20};

  h2,
  h3,
  h4 {
    color: ${maskedTheme.colors.baseYellow.dark30};
  }

  svg {
    color: ${maskedTheme.colors.baseYellow.dark20};
  }
`

export const PlanIconStarter = styled(PlanCardIcon)`
  background-color: ${maskedTheme.colors.baseYellow.dark20};

  svg {
    color: ${maskedTheme.colors.baseYellow.light20};
  }
`

export const PlanCardPro = styled(PlanCardBase)`
  background-color: ${maskedTheme.colors.baseBlue.light30};
  border: 2px solid ${maskedTheme.colors.baseBlue.base};

  h2,
  h3,
  h4 {
    color: ${maskedTheme.colors.baseBlue.dark30};
  }

  svg {
    color: ${maskedTheme.colors.baseBlue.dark20};
  }

  ${continuousAnimations.continuousGoldBorderPremium}
`

export const PlanIconPro = styled(PlanCardIcon)`
  background-color: ${maskedTheme.colors.baseBlue.dark20};

  svg {
    color: ${maskedTheme.colors.baseBlue.light20};
  }
`

export const PlanCardBusiness = styled(PlanCardBase)`
  background-color: ${maskedTheme.colors.baseGreen.light30};
  border: 2px solid ${maskedTheme.colors.baseGreen.dark20};
  overflow: hidden;

  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.6;

  h2,
  h3,
  h4 {
    color: ${maskedTheme.colors.baseGreen.dark30};
  }

  svg {
    color: ${maskedTheme.colors.baseGreen.dark20};
  }
`

export const PlanIconBusiness = styled(PlanCardIcon)`
  background-color: ${maskedTheme.colors.baseGreen.dark20};

  svg {
    color: ${maskedTheme.colors.baseGreen.light20};
  }
`

export const PlanBadge = styled.span`
  position: absolute;
  top: -10px;
  right: 10px;
  background: ${({ theme }) => theme.colors.baseBlue.dark};
  color: white;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
`

export const ComingSoon = styled.div`
  width: 180%;
  position: absolute;
  top: -183px;
  left: -40%;
  transform: rotate(-40deg);
  background: ${maskedTheme.colors.baseRed.light08};
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
  ${maskedTheme.boxShadow.lg};
  ${continuousAnimations.continuousGlowDiagonal}

  h3 {
    color: ${maskedTheme.colors.baseRed.light40};
    font-size: ${maskedTheme.fontSize.lg};
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 3px;
  }
`

export const PlanCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
`

export const PlanFeatures = styled.ul`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
`
