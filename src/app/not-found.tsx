
'use client'

import { MButton } from '@/components/ui/MaskedButton/MaskedButton'
import { maskedTheme, media } from '@/styles/MaskedThemes/MaskedThemes'
import Image from 'next/image'
// 🚫 NOT FOUND PÚBLICO - Página 404 para rotas públicas
// ⚠️ ARQUIVO DELETÁVEL - Pode ser removido ao criar sua própria página 404

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



export default function NotFound() {
  return (
    <NotFoundContainer>
      <ImageContainer>
        <Image src="/not-found.png" alt="404" fill loading="eager" priority />
      </ImageContainer>
      <h2>Página não encontrada</h2>
      <p>A página que você está procurando não existe ou foi movida.</p>
      <MButton
        $variant="default"
        href='/login'
      >
        Voltar ao início
      </MButton>
    </NotFoundContainer>
  )
}
