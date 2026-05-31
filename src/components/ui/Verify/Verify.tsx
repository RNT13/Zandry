'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa'
import { IoIosArrowBack } from 'react-icons/io'

import { MButton } from '@/components/ui/MaskedButton/MaskedButton'
import { useVerifyBooking } from '@/hooks/api/useVerifyBooking'
import { MinorTextH4, TitleH2, TitleH3 } from '@/styles/globalStyles'
import { MAnimation } from '@/styles/MaskedAnimations/MAnimation'
import { SvgDiv, VerifyContainer, VerifyContent } from './Verify.styles'

type VerifyStatus = 'loading' | 'success' | 'error' | 'missing-token'

export default function VerifyAppointment() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const { verifyBooking, isLoading } = useVerifyBooking()

  const [status, setStatus] = useState<VerifyStatus>('loading')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const verifiedTokenRef = useRef<string | null>(null)

  const hasToken = useMemo(() => Boolean(token), [token])

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      if (!token) {
        setStatus('missing-token')
        return
      }

      if (verifiedTokenRef.current === token) {
        return
      }

      verifiedTokenRef.current = token

      try {
        setStatus('loading')
        setErrorMessage('')

        await verifyBooking(token)

        if (!cancelled) {
          setStatus('success')
        }
      } catch {
        if (!cancelled) {
          setStatus('error')
          setErrorMessage(
            'Não foi possível confirmar seu agendamento. O link pode estar inválido, expirado ou já ter sido usado.'
          )
        }
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [token, verifyBooking])

  const handleBackHome = () => {
    router.push('/')
  }

  if (!hasToken || status === 'missing-token') {
    return (
      <VerifyContainer>
        <VerifyContent>
          <MAnimation variant="revealPopElastic" trigger="mount" center>
            <SvgDiv $color="missing-token">
              <FaRegTimesCircle />
            </SvgDiv>
          </MAnimation>

          <TitleH2>Link inválido</TitleH2>

          <MinorTextH4>O link de confirmação não possui token.</MinorTextH4>

          <MButton $variant="default" fullWidth leftIcon={<IoIosArrowBack />} onClick={handleBackHome}>
            Voltar para início
          </MButton>
        </VerifyContent>
      </VerifyContainer>
    )
  }

  if (status === 'loading' || isLoading) {
    return (
      <VerifyContainer>
        <VerifyContent>
          <TitleH2>Confirmando agendamento...</TitleH2>
          <MinorTextH4>Aguarde enquanto validamos seu link de confirmação.</MinorTextH4>
        </VerifyContent>
      </VerifyContainer>
    )
  }

  if (status === 'error') {
    return (
      <VerifyContainer>
        <VerifyContent>
          <MAnimation variant="revealPopElastic" trigger="mount" center>
            <SvgDiv $color="error">
              <FaRegTimesCircle />
            </SvgDiv>
          </MAnimation>

          <TitleH2>Não foi possível confirmar</TitleH2>
          <TitleH3>{errorMessage}</TitleH3>

          <MButton $variant="default" fullWidth leftIcon={<IoIosArrowBack />} onClick={handleBackHome}>
            Voltar para início
          </MButton>
        </VerifyContent>
      </VerifyContainer>
    )
  }

  return (
    <VerifyContainer>
      <VerifyContent>
        <MAnimation variant="revealPopElastic" trigger="mount" center>
          <SvgDiv $color="success">
            <FaRegCheckCircle />
          </SvgDiv>
        </MAnimation>

        <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.1} center>
          <TitleH2>Agendamento confirmado!</TitleH2>
        </MAnimation>

        <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.2} center>
          <TitleH3>Seu horário foi confirmado com sucesso.</TitleH3>
        </MAnimation>

        <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.3} center>
          <MinorTextH4>Você já pode fechar esta página ou voltar para o início.</MinorTextH4>
        </MAnimation>

        <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.4} center>
          <MButton $variant="default" fullWidth onClick={handleBackHome}>
            Voltar para início
          </MButton>
        </MAnimation>
      </VerifyContent>
    </VerifyContainer>
  )
}
