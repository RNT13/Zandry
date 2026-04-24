import { transitions } from '@/styles/MaskedAnimations/animations/transitions'
import { maskedTheme, media } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const DataTimeContainer = styled.div``

export const DataTimeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.sm};
`

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
`

export const DaysContainer = styled.ul`
  width: 100%;
  display: flex;
  gap: ${maskedTheme.spacing.md};
  list-style: none;
  overflow: auto;
  scrollbar-width: none;
`

export const TimeContainer = styled.ul`
  width: 100%;
  align-items: center;
  display: grid;
  grid-template-columns: ${maskedTheme.grid.three};
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.md};
  list-style: none;

  ${media.mobile} {
    padding: 0;
    gap: ${maskedTheme.spacing.xs};
  }
`

export const HoursContainer = styled.ul`
  display: flex;
  gap: ${maskedTheme.spacing.md};
  list-style: none;
`

export const DayItem = styled.li<{ $isActive?: boolean }>`
  width: 80px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${maskedTheme.spacing.md} 0;
  gap: ${maskedTheme.spacing.md};
  border: 1px solid ${({ $isActive }) => ($isActive ? maskedTheme.colors.baseBlue.light40 : maskedTheme.colors.baseBlue.base)};
  border-radius: ${maskedTheme.radius.md};
  padding: ${maskedTheme.spacing.sm} ${maskedTheme.spacing.md};
  background-color: ${({ $isActive }) => ($isActive ? maskedTheme.colors.baseBlue.base : maskedTheme.colors.baseBlue.dark04)};
  transition: ${transitions.default};
  cursor: pointer;
  ${transitions.default}

  &:hover {
    cursor: pointer;
    scale: 1.01;
    box-shadow: ${maskedTheme.boxShadow.lg};
  }

  h3,
  h2 {
    color: ${({ $isActive }) => ($isActive ? maskedTheme.colors.baseBlue.light40 : maskedTheme.colors.baseBlue.base)};
  }
`

export const TimeItem = styled(DayItem)`
  width: 100%;
  height: 80px;
  margin: 0;

  h3 {
    font-size: ${maskedTheme.fontSize.lg};
  }

  ${media.mobile} {
    width: 100%;
  }
`
