'use client'

import { useParams, useRouter } from 'next/navigation'
import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaRegThumbsUp } from 'react-icons/fa'
import { IoIosArrowBack, IoIosCalendar } from 'react-icons/io'
import { useSelector } from 'react-redux'

import { usePublicCompany } from '@/hooks/api/usePublicCompany'
import {
  selectBookingConfirmation,
  selectBookingProfessional,
  selectBookingService,
  selectBookingSlot,
  selectBookingUser
} from '@/redux/slices/bookingSlice'
import { MinorTextH4, TitleH2, TitleH3 } from '@/styles/globalStyles'
import { MAnimation } from '@/styles/MaskedAnimations/MAnimation'
import { addMinutes } from '@/utils/businessHoursUtils'
import { MButton } from '../MaskedButton/MaskedButton'
import {
  ConfirmationTotal,
  ConfirmedColumn,
  ConfirmedContainer,
  ConfirmedContent,
  ConfirmedDetails,
  ConfirmedDiv,
  ConfirmedDivHeader,
  ConfirmedDivItem,
  ConfirmedHeader,
  ConfirmedRow,
  ConfirmedServices,
  SvgDiv
} from './Confirmed.styles'

export default function Confirmed() {
  const { push } = useRouter()
  const params = useParams()
  const slugParam = params.slug
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam

  const service = useSelector(selectBookingService)
  const professional = useSelector(selectBookingProfessional)
  const user = useSelector(selectBookingUser)
  const slot = useSelector(selectBookingSlot)
  const confirmation = useSelector(selectBookingConfirmation)

  const { company: companyData } = usePublicCompany(slug)

  if (!confirmation) {
    return (
      <ConfirmedContainer>
        <ConfirmedContent>
          <TitleH2>Nenhuma solicitação encontrada</TitleH2>
          <MinorTextH4>Refaça o agendamento para ver os detalhes.</MinorTextH4>

          <MButton
            $variant="outline"
            leftIcon={<IoIosArrowBack />}
            onClick={() => push(slug ? `/${slug}` : '/')}
            fullWidth
          >
            Voltar
          </MButton>
        </ConfirmedContent>
      </ConfirmedContainer>
    )
  }

  const dateBase = confirmation.date ?? slot?.date
  const timeStart = confirmation.time ?? slot?.time ?? '--:--'

  const companyName = confirmation.company ?? companyData?.name ?? '--'
  const companyZip = confirmation.company_zip_code ?? companyData?.cep ?? '--'
  const companyAddress = confirmation.company_address ?? companyData?.address ?? '--'
  const companyNumber = confirmation.company_number ?? companyData?.number ?? '--'

  const serviceName = confirmation.service ?? service?.name ?? '--'
  const professionalName = confirmation.professional ?? professional?.full_name ?? 'Profissional disponível'

  const userName = confirmation.user_name ?? user?.user_name ?? '--'
  const userPhone = confirmation.user_phone ?? user?.user_phone ?? '--'
  const userEmail = confirmation.user_email ?? user?.user_email ?? ''

  const serviceDuration = confirmation.service_duration ?? service?.duration ?? null

  const dateLabel = dateBase
    ? new Date(`${dateBase}T00:00:00`).toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    : '--'

  const timeEnd = serviceDuration != null ? addMinutes(timeStart, Number(serviceDuration)) : null
  const timeLabel = timeEnd ? `${timeStart} até ${timeEnd}` : timeStart

  const rawPrice = confirmation.service_price ?? service?.price ?? null
  const priceLabel = rawPrice != null ? `R$ ${Number(rawPrice).toFixed(2).replace('.', ',')}` : '--'

  return (
    <ConfirmedContainer>
      <ConfirmedContent>
        <ConfirmedHeader>
          <MAnimation variant="revealPopElastic" trigger="mount" delay={0.2} center>
            <SvgDiv>
              <FaRegThumbsUp />
            </SvgDiv>
          </MAnimation>

          <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.3} center>
            <TitleH2>Agendamento solicitado!</TitleH2>
          </MAnimation>

          <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.4} center>
            <ConfirmedColumn>
              {userEmail ? (
                <>
                  <TitleH3>Enviamos um e-mail para {userEmail}</TitleH3>
                  <TitleH3>com o link de confirmação.</TitleH3>
                </>
              ) : (
                <>
                  <TitleH3>Seu agendamento foi solicitado.</TitleH3>
                  <TitleH3>Verifique seu e-mail para confirmar.</TitleH3>
                </>
              )}

              <MinorTextH4>
                O horário ficará aguardando confirmação. Caso não encontre o e-mail, verifique também sua caixa de spam.
              </MinorTextH4>
            </ConfirmedColumn>
          </MAnimation>
        </ConfirmedHeader>

        <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.5}>
          <ConfirmedDetails>
            <TitleH3>Detalhes do agendamento</TitleH3>

            <ConfirmedDiv>
              <ConfirmedDivHeader>
                <IoIosCalendar />
              </ConfirmedDivHeader>
              <ConfirmedDivItem>
                <TitleH3>Data e hora</TitleH3>
                <MinorTextH4>{dateLabel}</MinorTextH4>
                <MinorTextH4>{timeLabel}</MinorTextH4>
              </ConfirmedDivItem>
            </ConfirmedDiv>

            <ConfirmedDiv>
              <ConfirmedDivHeader>
                <FaMapMarkerAlt />
              </ConfirmedDivHeader>
              <ConfirmedDivItem>
                <TitleH3>Local</TitleH3>
                <MinorTextH4>{companyName}</MinorTextH4>
                <MinorTextH4>{companyZip}</MinorTextH4>
                <MinorTextH4>
                  {companyAddress} - {companyNumber}
                </MinorTextH4>
              </ConfirmedDivItem>
            </ConfirmedDiv>

            <ConfirmedDiv>
              <ConfirmedDivHeader>
                <FaPhoneAlt />
              </ConfirmedDivHeader>
              <ConfirmedDivItem>
                <TitleH3>Seus dados</TitleH3>
                <MinorTextH4>{userName}</MinorTextH4>
                <MinorTextH4>{userPhone}</MinorTextH4>
                {userEmail && <MinorTextH4>{userEmail}</MinorTextH4>}
              </ConfirmedDivItem>
            </ConfirmedDiv>

            <ConfirmedServices>
              <ConfirmedRow>
                <TitleH3>Serviço</TitleH3>
                <MinorTextH4>{serviceName}</MinorTextH4>
              </ConfirmedRow>

              <ConfirmedRow>
                <TitleH3>Profissional</TitleH3>
                <MinorTextH4>{professionalName}</MinorTextH4>
              </ConfirmedRow>

              <ConfirmedRow>
                <TitleH3>Duração</TitleH3>
                <MinorTextH4>{serviceDuration != null ? `${serviceDuration} min` : '--'}</MinorTextH4>
              </ConfirmedRow>
            </ConfirmedServices>

            <ConfirmationTotal>
              <ConfirmedRow>
                <TitleH3>Total</TitleH3>
                <MinorTextH4>{priceLabel}</MinorTextH4>
              </ConfirmedRow>
            </ConfirmationTotal>
          </ConfirmedDetails>
        </MAnimation>

        <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.6} center>
          <MButton $variant="default" leftIcon={<FaCalendarAlt />} fullWidth>
            Adicionar ao calendário
          </MButton>
        </MAnimation>

        <MAnimation variant="revealFadeInUp" trigger="mount" delay={0.7} center>
          <MButton
            $variant="outline"
            leftIcon={<IoIosArrowBack />}
            onClick={() => push(slug ? `/${slug}` : '/')}
            fullWidth
          >
            Voltar
          </MButton>
        </MAnimation>
      </ConfirmedContent>
    </ConfirmedContainer>
  )
}
