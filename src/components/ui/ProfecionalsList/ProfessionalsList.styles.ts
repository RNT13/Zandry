import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
import styled from 'styled-components'

export const ProfessionalsListContainer = styled.div``

export const ProfessionalsListContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${maskedTheme.spacing.md};
  padding: ${maskedTheme.spacing.sm};
`
