'use client'

import { useAuth } from '@/hooks/api/useAuth'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { CompanyReadRead } from '@/redux/slices/api/generatedApi'
import { setCompanyRef } from '@/redux/slices/bookingSlice'
import { MinorTextH4, Row, TitleH2, TitleH3 } from '@/styles/globalStyles'
import { MAnimation } from '@/styles/MaskedAnimations/MAnimation'
import { FormattedDay, getFormattedHours, getOpeningHoursSummary } from '@/utils/businessHoursUtils'
import { getInitials } from '@/utils/initials'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { BsChatRightText } from 'react-icons/bs'
import { FaMapMarkedAlt, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { MdContactPhone, MdStoreMallDirectory } from 'react-icons/md'
import { MButton } from '../MaskedButton/MaskedButton'
import {
  AbsoluteDiv,
  ButtonDiv,
  CompanyAvatar,
  CompanyBanner,
  CompanyContainer,
  CompanyContent,
  CompanyInfo,
  CompanyInfoDiv,
  CompanyTag,
  CompanyTime,
  LoginButtonDiv,
} from './Company.styles'

interface CompanyProps {
  company: CompanyReadRead
}

export default function Company({ company }: CompanyProps) {
  const { push } = useRouter()
  const dispatch = useAppDispatch()
  const auth = useAuth()

  const companyName = company.name ?? 'Empresa'
  const companySlug = company.slug ?? ''
  const companyDescription = company.description ?? 'Descrição não informada.'
  const companyAddress = company.address ?? 'Endereço não informado.'
  const companyZipCode = company.cep ?? ''
  const companyCity = company.city ?? ''
  const companyState = company.state ?? ''
  const companyNumber = company.number ?? ''
  const companyPhone = company.phone ?? 'Telefone não informado'
  const companyLogo = company.logo ?? ''
  const companyBanner = company.banner ?? ''
  const companyCategory = company.category ?? ''
  const companyEmail = company.email ?? 'E-mail não informado'
  const companyRating = company.rating ?? 'Ainda não avaliado'

  const hours = getOpeningHoursSummary(company.business_hours ?? [])
  const allHours = getFormattedHours(company.business_hours ?? [])

  const handleNext = () => {
    if (!companySlug) return

    dispatch(
      setCompanyRef({
        id: company.id,
        slug: companySlug,
        company_name: companyName,
      })
    )

    push(`/${companySlug}/servicos`)
  }

  const handleLogin = () => {
    push('/login?returnTo=%2Fdashboard')
  }

  const handleManage = () => {
    push(`/${companySlug}/dashboard`)
  }

  return (
    <CompanyContainer>
      <MAnimation variant="revealFadeInRight" trigger="mount">
        {auth.isAuthenticated ? (
          <LoginButtonDiv>
            <MButton
              $variant="link"
              size="sm"
              leftIcon={<MdStoreMallDirectory />}
              onClick={handleManage}
            >
              Painel da empresa
            </MButton>
          </LoginButtonDiv>
        ) : (
          <LoginButtonDiv>
            <MButton
              $variant="link"
              size="sm"
              leftIcon={<MdStoreMallDirectory />}
              onClick={handleLogin}
            >
              Fazer login na sua empresa
            </MButton>
          </LoginButtonDiv>
        )}
      </MAnimation>

      <CompanyContent>
        <MAnimation variant="revealFadeInUp" trigger="mount">
          <CompanyBanner style={companyBanner ? { backgroundImage: `url(${companyBanner})` } : {}} />
        </MAnimation>

        <AbsoluteDiv>
          <MAnimation variant="revealFadeInUp" trigger="mount">
            <CompanyAvatar>
              {companyLogo ? (
                <Image src={companyLogo} alt={companyName} width={100} height={100} loading="eager" />
              ) : (
                <div>{getInitials(companyName)}</div>
              )}
            </CompanyAvatar>
          </MAnimation>

          <CompanyInfo>
            <MAnimation variant="revealFadeInLeft" trigger="mount" delay={0.1}>
              <TitleH2>{companyName}</TitleH2>
            </MAnimation>

            <MAnimation variant="revealFadeInLeft" trigger="mount" delay={0.2}>
              <Row>
                <CompanyTag>
                  {companyCategory ? <TitleH3>{companyCategory}</TitleH3> : null}
                  {companyRating ? <TitleH3>{companyRating}</TitleH3> : null}
                </CompanyTag>
              </Row>
            </MAnimation>

            <ButtonDiv>
              <MAnimation variant="revealZoomFromDeep" trigger="mount">
                <MButton $variant="default" size="lg" fullWidth>
                  Contato
                </MButton>
              </MAnimation>

              <MAnimation variant="revealZoomFromDeep" trigger="mount">
                <MButton
                  $variant="default"
                  size="lg"
                  fullWidth
                  onClick={handleNext}
                  state={!companySlug ? 'disabled' : 'default'}
                >
                  Serviços
                </MButton>
              </MAnimation>
            </ButtonDiv>

            <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.3}>
              <CompanyTime>
                <div>
                  <span className={hours.isOpenToday ? 'openDot' : 'closedDot'} />
                  <TitleH2>{hours.todayLabel}</TitleH2>
                </div>
                <span className={hours.isOpenToday ? 'openTag' : 'closedTag'}>
                  {hours.isOpenToday ? `Aberto · ${hours.start} até ${hours.end}` : 'Fechado hoje'}
                </span>
              </CompanyTime>
            </MAnimation>

            <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.4}>
              <CompanyInfoDiv>
                <TitleH2>
                  <FaRegClock /> Horários
                </TitleH2>

                {allHours.map((day: FormattedDay) => (
                  <Row key={day.key}>
                    <MinorTextH4>{day.label}:</MinorTextH4>
                    <MinorTextH4>{day.is_open ? `${day.start} – ${day.end}` : 'Fechado'}</MinorTextH4>
                  </Row>
                ))}
              </CompanyInfoDiv>
            </MAnimation>

            <MAnimation variant="revealFadeInLeft" trigger="mount" delay={0.5}>
              <CompanyInfoDiv>
                <TitleH2>
                  <MdContactPhone /> Contato
                </TitleH2>
                <Row>
                  <MinorTextH4>E-mail:</MinorTextH4>
                  <MinorTextH4>{companyEmail}</MinorTextH4>
                </Row>
                <Row>
                  <MinorTextH4>Whatsapp:</MinorTextH4>
                  <MinorTextH4>{companyPhone}</MinorTextH4>
                </Row>
              </CompanyInfoDiv>
            </MAnimation>

            <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.6}>
              <CompanyInfoDiv>
                <TitleH2>
                  <FaMapMarkerAlt /> Endereço
                </TitleH2>
                <Row>
                  <MinorTextH4>Endereço:</MinorTextH4>
                  <MinorTextH4>
                    {companyAddress} - {companyNumber}
                  </MinorTextH4>
                </Row>
                <Row>
                  <MinorTextH4>CEP:</MinorTextH4>
                  <MinorTextH4>{companyZipCode}</MinorTextH4>
                </Row>
                <Row>
                  <MinorTextH4>Cidade/Estado</MinorTextH4>
                  <MinorTextH4>
                    {companyCity} - {companyState}
                  </MinorTextH4>
                </Row>

                <MButton $variant="link" leftIcon={<FaMapMarkedAlt />}>
                  Ver no mapa
                </MButton>
              </CompanyInfoDiv>
            </MAnimation>

            <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.7}>
              <CompanyInfoDiv>
                <TitleH2>
                  <BsChatRightText /> Sobre nós
                </TitleH2>
                <MinorTextH4>{companyDescription}</MinorTextH4>

                {company.advantage1 && (
                  <MinorTextH4>
                    <GoDotFill />
                    {company.advantage1}
                  </MinorTextH4>
                )}
                {company.advantage2 && (
                  <MinorTextH4>
                    <GoDotFill />
                    {company.advantage2}
                  </MinorTextH4>
                )}
                {company.advantage3 && (
                  <MinorTextH4>
                    <GoDotFill />
                    {company.advantage3}
                  </MinorTextH4>
                )}
              </CompanyInfoDiv>
            </MAnimation>
          </CompanyInfo>
        </AbsoluteDiv>
      </CompanyContent>
    </CompanyContainer>
  )
}
