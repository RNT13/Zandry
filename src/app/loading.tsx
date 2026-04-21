
'use client'

import { maskedTheme } from '@/styles/MaskedThemes/MaskedThemes'
// ⏳ LOADING PÚBLICO - Componente de loading para páginas públicas
// ⚠️ ARQUIVO DELETÁVEL - Pode ser removido ao criar seu próprio loading

import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`

const Spinner = styled.div`
  border: 4px solid ${maskedTheme.colors.baseBlack.light02};
  border-top: 4px solid ${maskedTheme.colors.baseBlue.base};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
`

export default function Loading() {
  return (
    <LoadingContainer>
      <Spinner />
    </LoadingContainer>
  )
}
