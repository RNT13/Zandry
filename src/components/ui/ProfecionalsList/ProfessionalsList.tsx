'use client'

import { useParams, useRouter } from 'next/navigation'
import { IoIosArrowBack } from 'react-icons/io'

import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch'

import { selectBookingService, setProfessional } from '@/redux/slices/bookingSlice'

import { Row, TitleH2, TitleH3 } from '@/styles/globalStyles'
import { MAnimation } from '@/styles/MaskedAnimations/MAnimation'
import { MButton } from '../MaskedButton/MaskedButton'
import ProfessionalsCard from '../ProfessionalsCard/ProfessionalsCard'
import {
  DurationTag,
  ProfessionalsListContainer,
  ProfessionalsListContent,
  ServiceBadge
} from './ProfessionalsList.styles'

import { usePublicProfessionals } from '@/hooks/api/usePublicProfessionals'
import { PublicProfessionalBriefRead } from '@/redux/slices/api/generatedApi'

export default function ProfessionalsList() {
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  const params = useParams()
  const slugParam = params.slug
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam

  const selectedService = useAppSelector(selectBookingService)

  const { professionals, isLoading, isError, refetch } = usePublicProfessionals(slug, selectedService?.uid)

  const handleBack = () => {
    push(`/${slug}/servicos`)
  }

  const handleNext = (professional: PublicProfessionalBriefRead) => {
    dispatch(setProfessional(professional))
    push(`/${slug}/servicos/profissional/horario`)
  }

  if (!slug) {
    return (
      <ProfessionalsListContainer>
        <ProfessionalsListContent>
          <TitleH3>Slug da empresa não encontrado.</TitleH3>
        </ProfessionalsListContent>
      </ProfessionalsListContainer>
    )
  }

  if (!selectedService) {
    return (
      <ProfessionalsListContainer>
        <ProfessionalsListContent>
          <TitleH3>Selecione um serviço antes de escolher o profissional.</TitleH3>
          <MButton $variant="default" onClick={() => push(`/${slug}/servicos`)}>
            Ir para serviços
          </MButton>
        </ProfessionalsListContent>
      </ProfessionalsListContainer>
    )
  }

  if (isLoading) {
    return (
      <ProfessionalsListContainer>
        <ProfessionalsListContent>
          <TitleH3>Carregando profissionais...</TitleH3>
        </ProfessionalsListContent>
      </ProfessionalsListContainer>
    )
  }

  if (isError) {
    return (
      <ProfessionalsListContainer>
        <ProfessionalsListContent>
          <TitleH3>Não foi possível carregar os profissionais.</TitleH3>
          <MButton $variant="default" onClick={() => refetch()}>
            Tentar novamente
          </MButton>
        </ProfessionalsListContent>
      </ProfessionalsListContainer>
    )
  }

  return (
    <ProfessionalsListContainer>
      <ProfessionalsListContent>
        <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.2}>
          <Row>
            <MButton
              $variant="default"
              shapes="circle"
              leftIcon={<IoIosArrowBack />}
              onClick={handleBack}
            />
            <TitleH2>Selecione os profissionais</TitleH2>
          </Row>
        </MAnimation>

        {selectedService && (
          <>
            <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.15}>
              <ServiceBadge>
                <span>{selectedService.name}</span>
                {selectedService.duration && (
                  <DurationTag>{selectedService.duration} min</DurationTag>
                )}
              </ServiceBadge>
            </MAnimation>
          </>
        )}

        {!professionals.length ? (
          <TitleH3>Nenhum profissional disponível para este serviço.</TitleH3>
        ) : (
          professionals.map((professional, index) => (
            <MAnimation
              key={professional.uid ?? professional.uid}
              variant="revealFadeInUp"
              trigger="mount"
              delay={index * 0.1}
            >
              <ProfessionalsCard
                id={professional.uid}
                full_name={professional.full_name}
                position={professional.position}
                rating={professional.rating}
                onClick={() => handleNext(professional)}
              />
            </MAnimation>
          ))
        )}
      </ProfessionalsListContent>
    </ProfessionalsListContainer>
  )
}
