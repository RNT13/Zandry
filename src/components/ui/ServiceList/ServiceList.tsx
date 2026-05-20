'use client'

import { useParams, useRouter } from 'next/navigation'
import { IoIosArrowBack } from 'react-icons/io'

import { useAppDispatch } from '@/hooks/useAppDispatch'
import { setService } from '@/redux/slices/bookingSlice'

import { Row, TitleH2, TitleH3 } from '@/styles/globalStyles'
import { MAnimation } from '@/styles/MaskedAnimations/MAnimation'
import { MButton } from '../MaskedButton/MaskedButton'
import ServiceCard from '../ServiceCard/ServiceCard'
import { ServiceListContainer, ServiceListContent } from './ServiceList.styles'

import Loading from '@/app/loading'
import { usePublicServices } from '@/hooks/api/usePublicServices'
import { PublicServiceRead } from '@/redux/slices/api/generatedApi'

export default function ServiceList() {
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  const params = useParams()
  const slugParam = params.slug
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam

  const canFetch = Boolean(slug)

  const { services, isLoading, isError, refetch } = usePublicServices(slug)

  const handleBack = () => {
    push(`/${slug}`)
  }

  const handleNext = (service: PublicServiceRead) => {
    dispatch(setService(service))
    push(`/${slug}/servicos/profissional`)
  }

  if (!canFetch) {
    return (
      <ServiceListContainer>
        <ServiceListContent>
          <TitleH3>Slug da empresa não encontrado.</TitleH3>
          <Loading />
        </ServiceListContent>
      </ServiceListContainer>
    )
  }

  if (isLoading) {
    return (
      <ServiceListContainer>
        <ServiceListContent>
          <TitleH3>Carregando serviços...</TitleH3>
          <Loading />
        </ServiceListContent>
      </ServiceListContainer>
    )
  }

  if (isError) {
    return (
      <ServiceListContainer>
        <ServiceListContent>
          <TitleH3>Não foi possível carregar os serviços.</TitleH3>
          <MButton $variant="default" onClick={() => refetch()}>
            Tentar novamente
          </MButton>
        </ServiceListContent>
      </ServiceListContainer>
    )
  }

  if (!services.length) {
    return (
      <ServiceListContainer>
        <ServiceListContent>
          <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.2}>
            <Row>
              <MButton
                $variant="default"
                shapes="circle"
                leftIcon={<IoIosArrowBack />}
                onClick={handleBack}
              />
              <TitleH2>Selecione o serviço</TitleH2>
            </Row>
          </MAnimation>

          <TitleH3>Nenhum serviço disponível no momento.</TitleH3>
        </ServiceListContent>
      </ServiceListContainer>
    )
  }

  return (
    <ServiceListContainer>
      <ServiceListContent>
        <MAnimation variant="revealFadeInRight" trigger="mount" delay={0.2}>
          <Row>
            <MButton
              $variant="default"
              shapes="circle"
              leftIcon={<IoIosArrowBack />}
              onClick={handleBack}
            />
            <TitleH2>Selecione o serviço</TitleH2>
          </Row>
        </MAnimation>

        {services.map((service, index) => (
          <MAnimation
            key={service.uid ?? service.uid}
            variant="revealFadeInUp"
            trigger="mount"
            delay={index * 0.1}
          >
            <ServiceCard
              id={service.uid}
              name={service.name}
              description={service.description ?? ''}
              price={service.price}
              duration={service.duration}
              onClick={() => handleNext(service)}
            />
          </MAnimation>
        ))}
      </ServiceListContent>
    </ServiceListContainer>
  )
}
