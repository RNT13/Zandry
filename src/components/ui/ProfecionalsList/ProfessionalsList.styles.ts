import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const ProfessionalsListContainer = styled.div``

export const ProfessionalsListContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.sm};
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
