import { transitions } from '@/styles/MaskedAnimations/animations/transitions'
import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const DataTimeContainer = styled.div``

export const DataTimeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
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
`

export const TimeContainer = styled.ul`
  width: 100%;
  align-items: center;
  display: grid;
  grid-template-columns: ${maskedTheme.grid.three};
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.md};
  gap: ${maskedTheme.spacing.md};
  list-style: none;
`

export const HoursContainer = styled.ul`
  display: flex;
  gap: ${maskedTheme.spacing.md};
  list-style: none;
`

export const DayItem = styled.li<{ $isActive?: boolean }>`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${maskedTheme.spacing.xs};
  border: 1px solid ${({ $isActive }) => ($isActive ? maskedTheme.colors.baseBlue.light40 : maskedTheme.colors.baseBlue.base)};
  border-radius: ${maskedTheme.radius.md};
  padding: ${maskedTheme.spacing.sm} ${maskedTheme.spacing.md};
  background-color: ${({ $isActive }) => ($isActive ? maskedTheme.colors.baseBlue.base : maskedTheme.colors.baseBlue.dark04)};
  transition: ${transitions.default};
  cursor: pointer;

  h3,
  h2 {
    color: ${({ $isActive }) => ($isActive ? maskedTheme.colors.baseBlue.light40 : maskedTheme.colors.baseBlue.base)};
  }
`

export const TimeItem = styled(DayItem)`
  height: 60px;
`
