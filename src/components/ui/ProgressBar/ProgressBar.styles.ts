import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const ProgressBarContainer = styled.div`
  width: 100%;
  margin-top: 10px;
`

export const ProgressBarContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
`

export const StepDiv = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`

interface StepItemProps {
  $active: boolean
}

export const StepItem = styled.div<StepItemProps>`
  flex: 1;
  height: 20px;
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;

  background: ${({ $active }) =>
    $active
      ? `linear-gradient(90deg, ${maskedTheme.colors.baseBlue.light} 0%, ${maskedTheme.colors.baseBlue.dark} 100%)`
      : maskedTheme.colors.baseBlue.light50};

  &:hover {
    background: ${({ $active }) =>
      $active
        ? `linear-gradient(90deg, ${maskedTheme.colors.baseBlue.dark20} 0%, ${maskedTheme.colors.baseBlue.light20} 100%)`
        : maskedTheme.colors.baseBlue.light50};

    border: 2px solid ${maskedTheme.colors.baseBlue.base};
  }
`
