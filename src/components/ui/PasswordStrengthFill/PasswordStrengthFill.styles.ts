import { maskedTheme, media } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const PasswordStrengthFillContainer = styled.div``

export const PasswordStrengthFillContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.sm};

  ${media.mobile} {
    gap: ${maskedTheme.spacing.sm};
    padding: ${maskedTheme.spacing.xs};
  }
`

export const PasswordStrengthWrapper = styled.div`
  width: 100%;
  height: 26px;
  position: relative;
  overflow: hidden;
  border-radius: 999px;
  background-color: ${maskedTheme.colors.baseBlack.light20};
  border: 1px solid ${maskedTheme.colors.baseBlue.light08};
`

export const PasswordStrengthText = styled.p<{ $color: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 700;
  color: ${({ $color }) => $color};
`

export const PasswordRulesBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.xs};
  padding: ${maskedTheme.spacing.sm};
  border-radius: ${maskedTheme.radius.sm};
  background-color: ${maskedTheme.colors.baseBlue.light30};
  border: 1px solid ${maskedTheme.colors.baseBlue.light08};
`

export const SecurityInfoBox = styled.div`
  padding: ${maskedTheme.spacing.sm};
  border-radius: ${maskedTheme.radius.sm};
  background-color: ${maskedTheme.colors.baseBlue.light30};
  border: 1px solid ${maskedTheme.colors.baseBlue.light08};
`

export const PasswordStrengthFill = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  width: ${({ $width }) => `${$width}%`};
  background-color: ${({ $color }) => $color};
  transition: all 0.35s ease;
  border-radius: 999px;
`
