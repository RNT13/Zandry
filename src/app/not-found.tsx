
'use client'

import { maskedTheme, media } from '@/styles/MaskedThemes/MaskedThemes'
import Image from 'next/image'
// 🚫 NOT FOUND PÚBLICO - Página 404 para rotas públicas
// ⚠️ ARQUIVO DELETÁVEL - Pode ser removido ao criar sua própria página 404

import Link from 'next/link'
import styled from 'styled-components'

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  padding: 20px;

  h1 {
    font-size: 4rem;
    color: ${maskedTheme.colors.baseBlue.base};
    margin-bottom: 20px;
  }

  h2 {
    font-size: 2rem;
    color: ${maskedTheme.colors.baseBlue.base};
    margin-bottom: 20px;
  }

  p {
    color: ${maskedTheme.colors.baseBlue.base};
    margin-bottom: 30px;
    max-width: 500px;
  }

  ${media.mobile} {
    padding: 0px;
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 20px;

  ${media.mobile} {
    height: 250px;
  }
`

const BackButton = styled(Link)`
  background-color: ${maskedTheme.colors.baseBlue.base};
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${maskedTheme.colors.baseBlue.dark};
  }
`

export default function NotFound() {
  return (
    <NotFoundContainer>
      <ImageContainer>
        <Image src="/not-fond.png" alt="404" fill />
      </ImageContainer>
      <h2>Página não encontrada</h2>
      <p>A página que você está procurando não existe ou foi movida.</p>
      <BackButton href="/login">Voltar ao início</BackButton>
    </NotFoundContainer>
  )
}
