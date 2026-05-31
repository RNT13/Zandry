import { transitions } from '@/styles/MaskedAnimations/animations/transitions'
import { maskedTheme, media } from '@/styles/MaskedThemes/MaskedThemes'
import styled, { css } from 'styled-components'

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
  overflow-x: auto;
  padding: ${maskedTheme.spacing.sm} ${maskedTheme.spacing.xs};
  scroll-behavior: smooth;

  scrollbar-width: thin;
  scrollbar-color: ${maskedTheme.colors.baseBlue.base} transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${maskedTheme.colors.baseBlue.base};
    border-radius: 999px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${maskedTheme.colors.baseBlue.light40};
  }
`

export const DayItem = styled.li<{ $isActive?: boolean }>`
  position: relative;
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
  background-color: ${({ $isActive }) => ($isActive ? maskedTheme.colors.baseBlue.base : maskedTheme.colors.baseBlue.light30)};
  transition: ${transitions.default};
  cursor: pointer;

  &:hover {
    scale: 1.02;
    box-shadow: ${maskedTheme.boxShadow.lg};
  }

  h3,
  h2 {
    color: ${({ $isActive }) => ($isActive ? maskedTheme.colors.baseBlue.light40 : maskedTheme.colors.baseBlue.base)};
  }
`

export const TimeContainer = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.md};
  list-style: none;
  align-items: start;

  ${media.mobile} {
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
    gap: ${maskedTheme.spacing.sm};
  }
`

export const TimeItem = styled.li<{
  $isActive?: boolean
  $isOccupied?: boolean
  $isLast?: boolean
}>`
  width: 100%;
  height: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: ${maskedTheme.radius.md};
  padding: ${maskedTheme.spacing.sm};
  position: relative;
  transition: ${transitions.default};

  border: 1px solid ${maskedTheme.colors.baseBlue.base};
  background-color: ${maskedTheme.colors.baseBlue.light30};
  cursor: pointer;

  &:hover {
    scale: 1.02;
    box-shadow: ${maskedTheme.boxShadow.lg};
  }

  /* ── Selecionado ── */
  ${({ $isActive }) =>
    $isActive &&
    css`
      border-color: ${maskedTheme.colors.baseBlue.light40};
      background-color: ${maskedTheme.colors.baseBlue.base};

      h3,
      small,
      span:not([aria-hidden]) {
        color: ${maskedTheme.colors.baseBlue.light40} !important;
      }
    `}

  /* ── Ocupado ── */
  ${({ $isOccupied }) =>
    $isOccupied &&
    css`
      border-color: ${maskedTheme.colors.baseBlue.light20};
      background-color: ${maskedTheme.colors.baseBlue.light20};
      cursor: not-allowed;
      opacity: 0.55;

      &:hover {
        scale: 1;
        box-shadow: none;
      }

      h3 {
        text-decoration: line-through;
        color: ${maskedTheme.colors.baseBlue.dark30};
      }
      small {
        color: ${maskedTheme.colors.baseBlue.dark20};
      }
    `}

  /* ── Último disponível ── */
  ${({ $isLast }) =>
    $isLast &&
    css`
      border: 3px solid ${maskedTheme.colors.baseYellow.dark08};
      background-color: ${maskedTheme.colors.baseYellow.light08};

      h3 {
        color: ${maskedTheme.colors.baseYellow.dark20};
      }
    `}
`

export const SlotStartTime = styled.h3`
  margin: 0;
  font-size: ${maskedTheme.fontSize.lg};
  font-weight: 700;
  color: ${maskedTheme.colors.baseBlue.base};
  line-height: 1;
`

export const SlotEndTime = styled.span`
  font-size: ${maskedTheme.fontSize.xs};
  font-weight: 500;
  color: ${maskedTheme.colors.baseBlue.base};
  opacity: 0.75;
  line-height: 1;
`

export const SlotLabel = styled.small`
  font-size: ${maskedTheme.fontSize.xs};
  color: ${maskedTheme.colors.baseBlue.dark20};
  line-height: 1;
  margin-top: 2px;
`

export const LockIcon = styled.span`
  position: absolute;
  top: 5px;
  right: 6px;
  font-size: 12px;
  opacity: 0.45;
`

export const TodayDot = styled.span<{ $isActive?: boolean }>`
  position: absolute;
  top: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $isActive }) => ($isActive ? maskedTheme.colors.baseBlue.light40 : maskedTheme.colors.baseBlue.base)};
`

export const ServiceBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${maskedTheme.spacing.sm};
  background-color: ${maskedTheme.colors.baseBlue.light30};
  border-radius: ${maskedTheme.radius.md};
  padding: ${maskedTheme.spacing.xs} ${maskedTheme.spacing.md};
  font-size: 13px;
  color: ${maskedTheme.colors.baseBlue.base};
`

export const DurationTag = styled.span`
  background-color: ${maskedTheme.colors.baseBlue.base};
  color: ${maskedTheme.colors.baseBlue.light40};
  border-radius: ${maskedTheme.radius.md};
  padding: ${maskedTheme.spacing.xs} ${maskedTheme.spacing.md};
  font-size: ${maskedTheme.fontSize.xs};
  font-weight: 500;
`

export const AvailabilitySummary = styled.p`
  font-size: ${maskedTheme.fontSize.xs};
  color: ${maskedTheme.colors.baseBlue.dark20};
  margin: 0;
`
